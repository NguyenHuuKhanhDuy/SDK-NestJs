// migration-runner.ts
import { AppPathHelper } from '@common/helper';
import { ConfigEnvironmentService } from '@src/configs';
import { connectionSource } from '@src/configs/typeorm.config';
import * as fs from 'fs';
import * as path from 'path';
import pino from 'pino';

const migrationOrder = ['sequences', 'scripts', 'functions', 'alter', 'seed'];

// ✅ Tạo logger Pino độc lập (không cần Nest context)
const logger = pino({
  level: 'info',
  transport: ConfigEnvironmentService.isProduction()
    ? undefined
    : { target: 'pino-pretty', options: { colorize: true } },
});

async function runMigrations() {
  logger.info('Migration script started');

  await connectionSource.initialize();
  logger.info('Database connected');

  const queryRunner = connectionSource.createQueryRunner();

  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS migration_scripts_history (
             id SERIAL PRIMARY KEY,
             script_name TEXT UNIQUE,
             executed_at TIMESTAMP DEFAULT now()
      )
  `);

  try {
    for (const folder of migrationOrder) {
      const folderPath = path.join(AppPathHelper.migrationsDir, folder);
      if (!fs.existsSync(folderPath)) {
        logger.warn(`Folder not found: ${folderPath}`);
        continue;
      }

      const files = fs
        .readdirSync(folderPath)
        .filter((f) => f.endsWith('.sql'));
      files.sort();

      for (const file of files) {
        const alreadyRun = await queryRunner.query(
          `SELECT 1 FROM migration_scripts_history WHERE script_name = $1`,
          [file],
        );

        if (alreadyRun.length > 0) {
          logger.warn(`Skip (already run): ${file}`);
          continue;
        }

        logger.info(`Running: ${file}`);
        let sql = fs.readFileSync(path.join(folderPath, file), 'utf8');
        sql = sql.replace(/^\uFEFF/, '');

        await queryRunner.startTransaction();
        try {
          await queryRunner.query(sql);
          await queryRunner.query(
            `INSERT INTO migration_scripts_history (script_name) VALUES ($1)`,
            [file],
          );
          await queryRunner.commitTransaction();
          logger.info(`Done: ${file}`);
        } catch (err) {
          await queryRunner.rollbackTransaction();
          logger.error({ err }, `Error in file ${file}, rolled back changes`);
          throw err;
        }
      }
    }

    logger.info('All migrations executed.');
  } catch (err) {
    logger.error({ err }, 'Migration failed');
    process.exit(1);
  } finally {
    await queryRunner.release();
    await connectionSource.destroy();
  }
}

runMigrations();
