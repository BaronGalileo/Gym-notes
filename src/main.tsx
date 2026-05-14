import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import "./index.css";
import { migrateLocalStorageToIndexedDB } from "./shared/lib/migrateGymStorage.ts";

const start = async () => {
  await migrateLocalStorageToIndexedDB();

  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

start();
