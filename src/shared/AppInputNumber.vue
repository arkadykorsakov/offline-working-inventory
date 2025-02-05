<script setup lang="ts">
interface IProps {
  min?: number | string
  max?: number | string
  placeholder?: string
}
const { min, max, placeholder } = defineProps<IProps>()

const model = defineModel()
</script>

<template>
  <input type="number" :min="min" :max="max" :placeholder="placeholder" v-model="model" />
</template>

<style lang="scss" scoped>
input {
  background: $secondary-background;
  border: $base-border;
  padding: 11px 12px;
  font-size: 14px;
  color: $base-text;
  font-weight: 500;
  opacity: 40%;
  width: 100%;
}

input[type='number'] {
  -moz-appearance: textfield;
  -webkit-appearance: textfield;
  appearance: textfield;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  display: none;
}
</style>
