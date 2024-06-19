import {
  createDir,
  exists,
  readTextFile,
  writeTextFile,
} from "@tauri-apps/api/fs";
import { appConfigDir, sep } from "@tauri-apps/api/path";

const defaultConfig = {
  size: {
    height: 800,
    width: 800,
  },
  autoStart: false,
};

export const useConfig = () => {
  onMounted(async () => {
    appData.value = await appConfigDir();

    if (!(await exists(`${appData.value}`))) {
      console.log("Creating Dirs");
      await createDir(appData.value);
    }
    if (!(await exists(`${appData.value}config.json`))) {
      await writeTextFile(
        `${appData.value}config.json`,
        JSON.stringify(defaultConfig)
      );
    } else {
      config.value = JSON.parse(
        await readTextFile(`${appData.value}config.json`)
      );
    }
  });
  const config = ref(defaultConfig);
  const appData = ref("");

  watch(
    config,
    async () => {
      console.log("Writing Config");
      await writeTextFile(
        `${appData.value}config.json`,
        JSON.stringify(config.value)
      );
    },
    { deep: true }
  );

  return config;
};
