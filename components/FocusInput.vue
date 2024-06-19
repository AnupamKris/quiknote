<template>
  <UInput
    v-model="inputValue"
    ref="inp"
    @blur="blur"
    variant="none"
    :padded="false"
  />
</template>

<script setup>
const inputValue = defineModel();
const emit = defineEmits(["blur"]);
const inp = ref(null);

const props = defineProps({
  placeholder: {
    type: String,
    default: "",
  },
});

const blur = () => {
  console.log("input blurred");
  emit("blur");
};

onMounted(() => {
  console.log("Focusing", inp.value);
  inp.value.focus();
});
</script>

<style lang="scss" scoped></style>
