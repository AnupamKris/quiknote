import {
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appConfigDir, sep } from "@tauri-apps/api/path";

export const useFile = (filePath: string, defaultValue: Object) => {
  onMounted(async () => {
    appData.value = await appConfigDir();

    if (!(await exists(appData.value + filePath))) {
      console.log("Creating Dirs");
      await writeTextFile(
        appData.value + filePath,
        JSON.stringify(defaultValue)
      );
    } else {
      fileContent.value = JSON.parse(
        await readTextFile(appData.value + filePath)
      );
    }
  });
  const fileContent = ref({});
  const appData = ref("");

  watch(
    fileContent,
    async () => {
      console.log("Writing Config");
      await writeTextFile(
        appData.value + filePath,
        JSON.stringify(fileContent.value)
      );
    },
    { deep: true }
  );

  return fileContent;
};
