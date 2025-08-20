import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export class SecurityHelper {
  /**
   * Password hashing function
   * @param password The password to be hashed
   * @returns The hashed password string
   */
  static async hash(password: string): Promise<string> {
    const GEN_SALT = 10;
    const salt = await bcrypt.genSalt(Number(GEN_SALT));

    return await bcrypt.hash(password, salt);
  }

  /**
   * Function to verify password with hash
   * @param password The user-entered password
   * @param hashedPassword The hashed password stored in the database
   * @returns True if the password is correct, False if incorrect
   */
  static async verify(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  static generateSecurityStamp(): string {
    return Buffer.from(randomUUID().replace(/-/g, ''), 'hex')
      .toString('hex')
      .toUpperCase();
  }

  static generateStrongPassword(length: number = 10): string {
    if (length < 8) {
      throw new Error('Password length must be at least 8 characters.');
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+[]{};:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    for (let i = 4; i < length; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }

    return password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');
  }
}
