<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  size?: number | string
  background: string
  backgroundShadow: string
}

const { size = 48, background, backgroundShadow } = defineProps<IProps>()

const sizePX = computed(() => (typeof size === 'number' ? size + 'px' : size))
</script>

<template>
  <div class="inventory-figure"></div>
</template>

<style lang="scss" scoped>
.inventory-figure {
  height: v-bind('sizePX');
  width: v-bind('sizePX');
  background: v-bind('background');
  position: relative;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 12.5%;
    top: -12.5%;
    backdrop-filter: blur(12px);
    background: v-bind('backgroundShadow');
  }
}
</style>
