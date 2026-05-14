import { get, set } from "idb-keyval";

const LEGACY_KEY = "gym-storage";

export const migrateLocalStorageToIndexedDB = async () => {
  try {
    const legacyData = localStorage.getItem(LEGACY_KEY);

    if (!legacyData) return;

    const parsed = JSON.parse(legacyData);

    const existing = await get(LEGACY_KEY);

    if (existing) {
      localStorage.removeItem(LEGACY_KEY);
      return;
    }

    await set(LEGACY_KEY, parsed);

    localStorage.removeItem(LEGACY_KEY);

    console.log("✅ Gym storage migrated to IndexedDB");
  } catch (e) {
    console.error("❌ Migration failed", e);
  }
};