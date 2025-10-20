import { EnvKey } from '@common/constant';
import { ConfigEnvironmentService } from '@src/configs/config-environment.base.service';
import * as CryptoJS from 'crypto-js';

const CRYPTO_KEY_SIZE = 128 / 8;

export class CryptoJsHelper {
  private static readonly CLIENT_SECRET_KEY =
    ConfigEnvironmentService.getIns().get(EnvKey.App.ClientSecretKey) ?? '';
  private static readonly SECRET_KEY_REVERSE =
    CryptoJsHelper.CLIENT_SECRET_KEY.split('').reverse().join('');

  private static getKeyAndIv() {
    if (!this.CLIENT_SECRET_KEY) {
      throw new Error('CLIENT_SECRET_KEY is not defined');
    }
    return {
      key: CryptoJS.enc.Utf8.parse(this.CLIENT_SECRET_KEY),
      iv: CryptoJS.enc.Utf8.parse(this.SECRET_KEY_REVERSE),
    };
  }

  static encrypt(value: string): string {
    const { key, iv } = this.getKeyAndIv();
    return CryptoJS.AES.encrypt(value, key, {
      keySize: CRYPTO_KEY_SIZE,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }).toString();
  }

  static decrypt(value: string): string {
    const { key, iv } = this.getKeyAndIv();
    const decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: CRYPTO_KEY_SIZE,
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted);
  }
}
