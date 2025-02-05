<script setup lang="ts">
import InventoryFigure from './InventoryFigure.vue'
import type { IInventory } from '../model/types'

interface IProps {
  inventory: IInventory
}

defineProps<IProps>()
</script>

<template>
  <div class="inventory-item" draggable>
    <div class="inventory-item__wrapper">
      <InventoryFigure
        :background="inventory.background"
        :background-shadow="inventory.background_shadow"
      />
      <div class="inventory-item__qty">{{ inventory.count }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.inventory-item {
  width: 100%;
  height: 100%;
  cursor: pointer;

  &__wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  &__qty {
    position: absolute;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-top: $base-border;
    border-left: $base-border;
    padding: 2px 4px;
    border-radius: 6px 0 0 0;
    min-width: 16px;
    height: 16px;
    font-size: 10px;
    color: rgba(255, 255, 255, 0.4);
  }
}
</style>
