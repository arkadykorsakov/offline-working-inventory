<script setup lang="ts">
interface IProps {
  type?: 'button' | 'submit'
  color?: 'danger' | 'default'
  size?: 'sm' | 'md'
}
const { color = 'default', type = 'button', size = 'sm' } = defineProps<IProps>()
</script>

<template>
  <button :type="type" :class="[color, size]">
    <slot />
  </button>
</template>

<style scoped lang="scss">
button {
  border-radius: $base-rounded;
  width: 100%;
  font-size: 14px;
  transition: all 0.3s ease;
}
button.sm {
  padding: 8px;
}
button.md {
  padding: 11px;
}
button.default {
  background: $white;
  color: $black;
}
button.danger {
  background: $danger;
  color: $white;
}
@media (any-hover: hover) {
  button.default:hover {
    opacity: 0.8;
  }
  button.danger:hover {
    background: $danger-hover;
  }
}
</style>
