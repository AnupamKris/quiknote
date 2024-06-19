<template>
  <div class="superInput">
    <p
      @click="showInput"
      v-if="!inputVisible"
      :class="{ strikeThrough }"
      :style="{ fontSize: fontSize + 'px' }"
    >
      {{ inputValue ? inputValue : "Enter Something" }}
    </p>
    <UInput
      class="input"
      v-else
      v-model="inputValue"
      :placeholder
      variant="none"
      :padded="false"
      :autofocus="true"
      @blur="hideInput"
      :style="{ fontSize: fontSize + 'px' }"
    />
  </div>
</template>

<script setup>
const inputVisible = ref(false);
const inputValue = defineModel();

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
  strikeThrough: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: String,
    default: "14",
  },
});

const showInput = () => {
  inputVisible.value = true;
};

const hideInput = () => {
  inputVisible.value = false;
};
</script>

<style lang="scss" scoped>
.superInput {
  min-height: 20px;
  p,
  .input {
    min-height: 100%;
    padding: 0 10px;

    display: flex;
    align-items: center;

    // font-size: 14px;
    height: 20px;
  }

  .strikeThrough {
    text-decoration: line-through;
  }
}
</style>
