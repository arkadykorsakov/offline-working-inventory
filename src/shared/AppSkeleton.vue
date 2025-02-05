<script lang="ts" setup>
import { computed } from 'vue'

interface IProps {
  width?: number | string
  height?: number | string
}

const { width = '100%', height = 10 } = defineProps<IProps>()

const widthPX = computed(() => (typeof width === 'number' ? width + 'px' : width))
const heightPX = computed(() => (typeof height === 'number' ? height + 'px' : width))
</script>

<template>
  <div class="skeleton"></div>
</template>

<style scoped lang="scss">
.skeleton {
  max-width: v-bind('widthPX');
  width: 100%;
  height: v-bind('heightPX');
  background: linear-gradient(90deg, #3c3c3c 0%, #444444 51.04%, #333333 100%);
  border-radius: $base-rounded;
}
</style>
