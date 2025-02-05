<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import XIcon from './icons/XIcon.vue'
import TransitionSlideFade from './TransitionSlideFade.vue'

interface IProps {
  isShow: boolean
}
defineProps<IProps>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}

const closeOnEscape = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

onMounted(() => document.addEventListener('keydown', closeOnEscape))

onUnmounted(() => {
  document.removeEventListener('keydown', closeOnEscape)
})
</script>

<template>
  <TransitionSlideFade name="slide-fade">
    <div class="slide-over" v-if="isShow">
      <button type="button" class="slide-over__close" @click="close">
        <XIcon />
      </button>
      <slot />
    </div>
  </TransitionSlideFade>
</template>

<style scoped lang="scss">
.slide-over {
  background: rgba(38, 38, 38, 0.5);
  border-left: $base-border;
  width: 250px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 0;
  backdrop-filter: blur(16px);
  position: relative;
  padding: 30px 15px 15px 15px;

  &__close {
    position: absolute;
    right: 14px;
    top: 14px;
    width: 12px;
    height: 12px;
  }
}
</style>
