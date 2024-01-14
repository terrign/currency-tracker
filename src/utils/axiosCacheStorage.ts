import { buildStorage, StorageValue } from 'axios-cache-interceptor';
import localforage from 'localforage';

export const axiosCacheStorage = buildStorage({
  async find(key) {
    const value = (await localforage.getItem(key)) as StorageValue | undefined;

    if (!value) {
      return;
    }

    // eslint-disable-next-line consistent-return
    return value;
  },

  async set(key, value) {
    await localforage.setItem(key, value);
  },

  async remove(key) {
    await localforage.removeItem(key);
  },
});
