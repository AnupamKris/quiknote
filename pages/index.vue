<template>
  <UContainer class="p-5 flex gap-2">
    <UButton variant="ghost" class="p-2" @click="addList"
      ><IListTodo class="h-5 w-5"
    /></UButton>
    <UButton variant="ghost" class="p-2" @click="addNote"
      ><INotebook class="h-5 w-5"
    /></UButton>
    <UButton @click="settingsModal = true" class="ml-auto p-2" variant="ghost">
      <ICog class="w-5 h-5" />
    </UButton>
    <UButton @click="closeWindow" class="p-2" variant="ghost" color="red">
      <IPower class="w-5 h-5" />
    </UButton>
  </UContainer>
  <div class="wrapper">
    <UContainer class="masonry">
      <template v-for="(item, index) in list" :key="index">
        <QuikList
          v-if="item.type == 'list'"
          :listItem="item"
          @delete="deleteItem(index)"
          class="drag-item"
        />
        <QuikNote
          v-if="item.type == 'note'"
          :listItem="item"
          @delete="deleteItem(index)"
          class="drag-item"
        />
      </template>

      <UModal v-model="settingsModal" @close="settingsModal = false" class="">
        <UCard class="asd">
          <template #header> Settings </template>
          <template v-if="config.size">
            <div class="flex w-full gap-3">
              <div class="flex flex-col w-full">
                <p class="text-xs">Height</p>
                <UInput v-model="config.size.height" />
              </div>
              <div class="flex flex-col w-full">
                <p class="text-xs">Width</p>
                <UInput v-model="config.size.width" />
              </div>
            </div>
          </template>
          <div class="buttons flex flex-col gap-3 mt-3">
            <UButton @click="setSize">Set Size</UButton>
            <div class="dual">
              <UButton class="" @click="enable">Enable Autostart</UButton>
              <UButton class="" @click="disable">Disable Autostart</UButton>
            </div>
          </div>
        </UCard>
      </UModal>
    </UContainer>
  </div>
</template>

<script setup>
import { PhysicalSize, appWindow } from "@tauri-apps/api/window";
import { appDataDir } from "@tauri-apps/api/path";
import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";

const settingsModal = ref(false);

const drag = ref(false);
const config = useConfig();
const list = useFile("list.json", []);

const addList = () => {
  console.log(list.value);
  list.value.push({
    type: "list",
    title: "List",
    list: [],
  });
};

const addNote = () => {
  console.log(list.value);
  list.value.push({
    type: "note",
    title: "Note",
    content: "",
  });
};

const deleteItem = (index) => {
  list.value.splice(index, 1);
};

const setSize = async () => {
  appWindow.setSize(
    new PhysicalSize(
      parseInt(config.value.size.width),
      parseInt(config.value.size.height)
    )
  );
};

const closeWindow = () => {
  appWindow.close();
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.li {
  margin-bottom: 10px;
  .dull {
    color: rgb(var(--color-gray-500));
  }
}

button {
  display: flex;
  justify-content: center;
  align-items: center;
}
.dual {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    width: calc(50% - 5px);
  }
}
.wrapper {
  height: calc(100% - 80px);
  overflow: auto;
  padding: 10px 0;
}
.masonry {
  columns: 18rem;
  gap: 1rem;
  counter-reset: grid;
  padding-top: 5px;

  .drag-item + .drag-item {
    margin-top: 1rem;
  }

  .drag-item {
    break-inside: avoid;
    aspect-ratio: 4 / 3;
    // padding: 1rem;
  }
}
</style>
