import { instanceToPlain, plainToInstance } from 'class-transformer';

type KeyOf<T> = keyof T;
export class JsonHelper {
  /**
   * Deserialize a JSON string into a class instance
   * @param jsonString The JSON string to deserialize
   * @param classType The class to transform into
   * @returns An instance of the provided class type
   */
  static deserialize<T>(classType: new () => T, jsonString: string): T {
    try {
      const plainObject = JSON.parse(jsonString);
      return plainToInstance(classType, plainObject);
    } catch (error) {
      throw new Error(`Invalid JSON format: ${error.message}`);
    }
  }

  static toInstance<T>(cls: new () => T, plainObject: Partial<T>): T {
    return plainToInstance(cls, plainObject);
  }

  /**
   * Serialize a class instance to a JSON string
   * @param object The class instance to serialize
   * @returns A JSON string representation
   */
  static serialize<T>(object: T): string {
    return JSON.stringify(instanceToPlain(object));
  }

  static reorderKeysAsc<T extends Record<string, any>>(obj: T): T {
    const orderedEntries = Object.keys(obj)
      .sort((a, b) => a.localeCompare(b))
      .map((key) => [key, obj[key]] as [string, any]);

    return Object.fromEntries(orderedEntries) as T;
  }

  static groupBy<T, K extends KeyOf<T>>(
    items: T[],
    keys: K[],
  ): Record<string, T[]> {
    return items.reduce(
      (acc, item) => {
        const groupKey = keys.map((k) => String(item[k])).join('_');

        if (!acc[groupKey]) {
          acc[groupKey] = [];
        }
        acc[groupKey].push(item);

        return acc;
      },
      {} as Record<string, T[]>,
    );
  }
}
