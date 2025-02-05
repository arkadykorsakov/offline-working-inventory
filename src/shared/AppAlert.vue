<script setup lang="ts">
import AppCard from './AppCard.vue'
import XIcon from './icons/XIcon.vue'
</script>

<template>
  <AppCard class="alert">
    <button type="button" class="alert__close">
      <XIcon />
    </button>
    <slot />
  </AppCard>
</template>

<style scoped lang="scss">
.alert {
  position: relative;
  padding-right: 68px;
  min-height: 72px;
  &__close {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 12px;
    height: 12px;
  }
}
</style>
