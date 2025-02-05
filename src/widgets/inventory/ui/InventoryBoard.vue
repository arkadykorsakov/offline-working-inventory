<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import AppCard from '@/shared/AppCard.vue'
import AppSlideOver from '@/shared/AppSlideOver.vue'
import type { IInventory } from '@/entities/inventory/model/types'
import InventoryItem from '@/entities/inventory/ui/InventoryItem.vue'
import InventoryCard from '@/entities/inventory/ui/InventoryCard.vue'
import { useInventoriesStore } from '@/entities/inventory/model/state'
import { storeToRefs } from 'pinia'

const inventoriesStore = useInventoriesStore()
const { transformInventories } = storeToRefs(inventoriesStore)

const activeInventory = ref<IInventory | null>(null)

// Drag & drop
const from = ref<number | null>(null)
const isHidden = ref(false)
const isDragging = ref(false)

function startDrag(position: number) {
  from.value = position
  isDragging.value = true
  setTimeout(() => (isHidden.value = true), 0)
}

function endDrag() {
  isDragging.value = false
  isHidden.value = false
}

function onDrop(to: number) {
  if (from.value && from.value !== to) {
    inventoriesStore.moveInventory(+from.value, to)
  }
  from.value = null
}

// Touches
const wrapperRef = useTemplateRef('wrapper')
const ceilRefs = useTemplateRef('ceils')
const itemAppend = ref<HTMLElement | null>(null)
const startOffsetLeft = ref<null | number>(null)
const startOffsetTop = ref<null | number>(null)

function touchMove(event: TouchEvent, position: number) {
  isDragging.value = true
  from.value = position
  event.preventDefault()
  const touch = event.targetTouches[0]
  const elTouching = event.currentTarget as HTMLElement
  const wrapper = wrapperRef?.value?.$el
  if (wrapper && ceilRefs.value) {
    if (!startOffsetLeft.value && !startOffsetTop.value) {
      startOffsetLeft.value = elTouching.offsetLeft
      startOffsetTop.value = elTouching.offsetTop
    }
    elTouching.style.width = elTouching.offsetWidth + 'px'
    elTouching.style.height = elTouching.offsetHeight + 'px'
    elTouching.style.position = 'absolute'
    elTouching.style.top = `${touch.pageY - wrapper.offsetTop - elTouching.offsetWidth / 2}px`
    console.log(wrapper.offsetLeft)
    elTouching.style.left = `${
      touch.pageX -
      wrapper.getBoundingClientRect().left +
      wrapper.scrollLeft -
      elTouching.offsetWidth / 2
    }px`
    ceilRefs.value.map((item) => {
      if (
        elTouching.getBoundingClientRect().top + elTouching.offsetWidth / 2 <
          item.getBoundingClientRect().bottom &&
        elTouching.getBoundingClientRect().right - elTouching.offsetWidth / 2 >
          item.getBoundingClientRect().left &&
        elTouching.getBoundingClientRect().bottom - elTouching.offsetWidth / 2 >
          item.getBoundingClientRect().top &&
        elTouching.getBoundingClientRect().left + elTouching.offsetWidth / 2 <
          item.getBoundingClientRect().right
      ) {
        item.classList.add('active')
        itemAppend.value = item
      } else {
        item.classList.remove('active')
      }
    })
  }
}

function touchEnd(event: TouchEvent) {
  if (itemAppend.value) {
    const el = event.currentTarget as HTMLElement
    if (itemAppend.value.classList.contains('active') && !itemAppend.value.children.length) {
      itemAppend.value.append(el)
      el.style.top = `${itemAppend.value.offsetTop}px`
      el.style.left = `${itemAppend.value.offsetLeft}px`
      const to = itemAppend.value.dataset.position
      if (from.value && to && from.value !== +to) {
        inventoriesStore.moveInventory(+from.value, +to)
      }
    } else {
      el.style.left = `${startOffsetLeft.value}px`
      el.style.top = `${startOffsetTop.value}px`
    }
    startOffsetLeft.value = null
    startOffsetTop.value = null
    isDragging.value = false
    from.value = null
  }
}
</script>

<template>
  <AppCard class="inventory-board" ref="wrapper">
    <div
      class="inventory-board__ceil"
      v-for="c in transformInventories"
      :key="c.position"
      @dragover.prevent
      @dragenter.prevent
      @drop="onDrop(c.position)"
      ref="ceils"
      :data-position="c.position"
    >
      <template v-if="c.inventory">
        <InventoryItem
          @click="activeInventory = c.inventory"
          draggable="true"
          @dragstart="startDrag(c.position)"
          @dragend="endDrag"
          :inventory="c.inventory"
          class="inventory-board__item"
          :class="{
            hidden: isHidden && from === c.position,
            drag: isDragging && from === c.position,
          }"
          @touchmove="touchMove($event, c.position)"
          @touchend="touchEnd"
        />
      </template>
    </div>
    <AppSlideOver
      class="inventory-board__slide-over"
      :is-show="Boolean(activeInventory)"
      @close="activeInventory = null"
    >
      <InventoryCard
        v-if="activeInventory"
        class="inventory-board__card"
        :inventory="activeInventory"
      />
    </AppSlideOver>
  </AppCard>
</template>

<style scoped lang="scss">
.inventory-board {
  min-width: 500px;
  width: 100%;
  height: 500px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  padding: 0;
  position: relative;
  overflow: hidden;
  background: $secondary-background;

  &__ceil {
    border-right: $base-border;
    border-bottom: $base-border;

    &:nth-child(5n) {
      border-right: 0;
    }
    &:nth-child(5) {
      border-right: 0;
    }
    &:nth-last-child(-n + 5) {
      border-bottom: 0;
    }
  }

  &__slide-over {
    position: absolute;
  }

  &__card {
    margin-top: 37.44px;
  }

  &__item {
    &.drag {
      border: $base-border;
      border-radius: $base-rounded;
      z-index: 20;
      background: $secondary-background;
    }

    &.hidden {
      display: none;
    }
  }

  @media (max-width: 767.98px) {
    &__slide-over {
      right: auto;
      left: 0;
      border-left: none;
      border-right: $base-border;
      transform: translate(0);
    }
  }
}
</style>
