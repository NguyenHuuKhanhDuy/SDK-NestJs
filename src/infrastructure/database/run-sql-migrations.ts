import { connectionSource } from '@src/configs/typeorm.config';
import * as fs from 'fs';
import * as path from 'path';

const migrationOrder = ['sequences', 'scripts', 'functions', 'alter', 'seed'];

async function runMigrations() {
  await connectionSource.initialize();
  const queryRunner = connectionSource.createQueryRunner();

  // Create migration history table if not exists
  await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS migration_scripts_history (
         id SERIAL PRIMARY KEY,
         script_name TEXT UNIQUE,
         executed_at TIMESTAMP DEFAULT now()
      )
  `);

  try {
    for (const folder of migrationOrder) {
      const folderPath = path.join(process.cwd(), 'src', 'migrations', folder);
      if (!fs.existsSync(folderPath)) {
        console.log(`❌ Folder not found: ${folderPath}`);
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
          console.log(`🟡 Skip (already run): ${file}`);
          continue;
        }

        console.log(`🚀 Running: ${file}`);

        let sql = fs.readFileSync(path.join(folderPath, file), 'utf8');
        sql = sql.replace(/^\uFEFF/, '');

        // Bắt đầu transaction cho file
        await queryRunner.startTransaction();
        try {
          await queryRunner.query(sql);
          await queryRunner.query(
            `INSERT INTO migration_scripts_history (script_name) VALUES ($1)`,
            [file],
          );
          await queryRunner.commitTransaction();
          console.log(`✅ Done: ${file}`);
        } catch (err) {
          await queryRunner.rollbackTransaction();
          console.error(`❌ Error in file ${file}, rolled back changes.`, err);
          throw err;
        }
      }
    }

    console.log('✅ All migrations executed.');
  } catch (err) {
    console.error('❌ Migration failed', err);
    process.exit(1);
  } finally {
    await queryRunner.release();
    await connectionSource.destroy();
  }
}

runMigrations();
