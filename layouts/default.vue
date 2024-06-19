<template>
  <div class="backdrop">
    <div class="main bg-gray-900" :class="{ active: windowOpen }">
      <slot />
    </div>
  </div>
</template>

<script setup>
import {
  isRegistered,
  register,
  unregisterAll,
} from "@tauri-apps/api/globalShortcut";
import { invoke } from "@tauri-apps/api/tauri";
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";

const windowOpen = ref(true);
const closeTimeout = ref(null);
const toast = useToast();

const config = useConfig();

const showWindow = async () => {
  clearTimeout(closeTimeout.value);
  windowOpen.value = true;
  await invoke("show_window", { window: appWindow });
};

const handleWindowShow = () => {
  clearTimeout(closeTimeout.value);
  // move_window(Position.BottomRight);
  windowOpen.value = true;
};

const toggleWindow = async () => {
  if (windowOpen.value) {
    hideWindow();
  } else {
    await showWindow();
  }
};

const hideWindow = async () => {
  windowOpen.value = false;
  setTimeout(() => {
    appWindow.hide();
  }, 300);
  console.log("Got BLUR");
};

onMounted(async () => {
  await appWindow.listen("show-window", handleWindowShow);
  await appWindow.listen("tauri://blur", hideWindow);
  let registered = await isRegistered("CommandOrControl+Shift+X");
  if (!registered) {
    await register("CommandOrControl+Shift+X", toggleWindow);
    // toast.add({"Registered the shortcuts"});
  }
  setTimeout(() => {
    if (config.value.size) {
      console.log("Setting window size", config.value.size);
      appWindow.setSize(
        new PhysicalSize(
          parseInt(config.value.size.width),
          parseInt(config.value.size.height)
        )
      );
    }
  }, 200);
});
</script>

<style lang="scss" scoped>
.backdrop {
  height: 100vh;
  width: 100%;

  position: relative;
  // background-color: rgba(0, 0, 0, 0.5);

  overflow: hidden;

  .main {
    position: absolute;
    top: 10px;
    left: -100vw;

    width: calc(100% - 10px);
    height: calc(100% - 10px);

    // background: #222222;
    border-radius: 10px;
    border: 1px solid #333333;

    transition: all 0.2s ease-in-out;
  }

  .active {
    left: 10px;
  }
}
</style>
