import { del, get, set } from "idb-keyval";

export const indexedDBStorage = {
  getItem: async (name: string) => {
    const value = await get(name);
    return value ?? null;
  },

  setItem: async (name: string, value: any) => {
    await set(name, value);
  },

  removeItem: async (name: string) => {
    await del(name);
  },
};