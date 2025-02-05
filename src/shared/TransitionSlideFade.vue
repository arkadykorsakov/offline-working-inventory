<script setup lang="ts">
import { computed } from 'vue'

interface IProps {
  direction?: 'horizontal' | 'vertical'
}
const { direction = 'horizontal' } = defineProps<IProps>()

const translateDirection = computed(() =>
  direction === 'horizontal' ? 'translateX(100%)' : 'translateY(100%)',
)
</script>

<template>
  <Transition>
    <slot />
  </Transition>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: v-bind('translateDirection');
  opacity: 0;
}
</style>
