import * as path from 'path';

export class AppPathHelper {
  static baseDir = path.resolve(__dirname, '../../');
  static migrationsDir = path.join(AppPathHelper.baseDir, 'migrations');
  static i18nDir = path.join(AppPathHelper.baseDir, 'core/services/i18n/');

  static join(...paths: string[]) {
    return path.join(AppPathHelper.baseDir, ...paths);
  }
}
