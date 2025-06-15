
/**
 * Handles localStorage memory for Script Mitra generated scripts.
 */

const SCRIPT_STORAGE_KEY = "mitra_script_data";
const EXPIRY_MINUTES = 45; // Duration in minutes

export function loadScriptMemory() {
  try {
    const dataRaw = localStorage.getItem(SCRIPT_STORAGE_KEY);
    if (dataRaw) {
      const { script, formData, savedAt } = JSON.parse(dataRaw);
      if (
        typeof savedAt === "number" &&
        Date.now() - savedAt < EXPIRY_MINUTES * 60 * 1000 &&
        script
      ) {
        return { script, formData };
      }
    }
  } catch {}
  return null;
}

export function saveScriptMemory(scriptStr, formDataObj) {
  try {
    localStorage.setItem(
      SCRIPT_STORAGE_KEY,
      JSON.stringify({
        script: scriptStr,
        formData: formDataObj,
        savedAt: Date.now(),
      })
    );
  } catch {}
}

export function clearScriptMemory() {
  localStorage.removeItem(SCRIPT_STORAGE_KEY);
}

