<script setup>
import { useDragAndDrop } from "vue-fluid-dnd";

const props = defineProps({
  listItem: {
    type: Object,
    default: () => ({
      title: "Title",
      list: [],
    }),
  },
});

const list = toRef(props.listItem, "list");

const { parent } = useDragAndDrop(list, {
  handlerSelector: ".handle",
});

const triggerClick = () => {
  console.log("click");
};

const addItem = () => {
  console.log("adding");
  list.value.push({
    value: false,
    label: "",
  });
};

const emit = defineEmits(["delete"]);

const removeItem = (index) => {
  list.value.splice(index, 1);
};
</script>
<template>
  <UCard
    class="w-[300px]"
    :ui="{
      header: { padding: 'p-3 px-2 sm:px-2' },
      body: { padding: 'p-3 px-2 sm:px-2' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <SuperInput
          v-model="listItem.title"
          placeholder="Title"
          fontSize="18"
          class="my-2"
        />
        <div class="flex gap-2 mr-2">
          <UButton variant="ghost" size="xs" class="p-1" @click="addItem">
            <IPlus class="h-5 w-5 p-0" />
          </UButton>
          <UButton
            variant="ghost"
            size="xs"
            class="p-1"
            @click="emit('delete')"
          >
            <IX class="h-5 w-5 p-0" />
          </UButton>
        </div>
      </div>
    </template>
    <div ref="parent" class="ul">
      <div class="li flex" v-for="(item, index) in list" :index="index">
        <div class="handle">
          <IGripVertical class="h-5 w-5 p-0 dull" />
        </div>
        <div class="clickable w-full">
          <UCheckbox
            v-model="item.value"
            :class="{ dull: item.value }"
            class="pointer-pointer"
          />

          <SuperInput
            v-model="item.label"
            :placeholder="`List Item ${index + 1}`"
            :strikeThrough="item.value"
            :class="{ dull: item.value }"
            class="w-full"
          />
          <UButton
            variant="ghost"
            size="xs"
            class="p-1 del mr-3"
            @click="removeItem(index)"
          >
            <IX class="h-5 w-5 p-0" />
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>
<style lang="scss" scoped>
.li {
  margin-bottom: 10px;

  &:hover {
    .handle {
      opacity: 1;
    }

    .del {
      opacity: 1;

      &:hover {
        background: rgb(var(--color-gray-800));
      }
    }
  }
  .dull {
    color: rgb(var(--color-gray-500));
  }

  .handle {
    height: 20px;
    font-size: 12px;
    opacity: 0;
  }

  .del {
    position: absolute;
    right: -15px;

    color: rgb(var(--color-gray-600));
    opacity: 0;
  }
}
</style>

<style lang="scss">
.li {
  height: 100%;
  display: flex;
  align-items: center;
  .clickable {
    cursor: pointer;

    padding-left: 5px;

    display: flex;
    height: 100%;

    position: relative;

    display: flex;
    justify-content: center;
    align-items: center;
    // * {
    //   pointer-events: all !important;
    // }
  }
}
</style>
