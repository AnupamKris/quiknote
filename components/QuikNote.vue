<template>
  <UCard
    class="w-[300px]"
    :ui="{
      header: { padding: 'p-3 px-2 sm:px-2' },
      body: { padding: 'p-3 px-4 sm:px-4' },
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
    <textarea
      v-model="listItem.content"
      placeholder="Content"
      class="textarea"
    />
  </UCard>
</template>

<script setup>
const props = defineProps({
  listItem: {
    type: Object,
    default: () => ({
      title: "Title",
      content: "",
    }),
  },
});

const emit = defineEmits(["delete"]);
</script>

<style lang="scss" scoped>
.textarea {
  border: none;
  height: 100%;
  width: 100%;
  resize: vertical;
  background: transparent;
  outline: none;
}
</style>
