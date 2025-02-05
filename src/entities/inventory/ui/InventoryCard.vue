<script setup lang="ts">
import AppDivider from '@/shared/AppDivider.vue'
import AppButton from '@/shared/AppButton.vue'
import AppSkeleton from '@/shared/AppSkeleton.vue'
import DeleteInventory from '@/features/inventory/ui/DeleteInventory.vue'
import InventoryFigure from './InventoryFigure.vue'
import TransitionSlideFade from '@/shared/TransitionSlideFade.vue'
import { ref } from 'vue'
import type { IInventory } from '../model/types'

interface IProps {
  inventory: IInventory
}

defineProps<IProps>()

const isShow = ref(false)
</script>

<template>
  <article class="inventory-card">
    <InventoryFigure
      :background="inventory.background"
      :background-shadow="inventory.background_shadow"
      :size="115.56"
    />
    <AppDivider class="inventory-card__hr_first" />
    <div class="inventory-card__content">
      <AppSkeleton :height="30" />
      <div class="inventory-card__description">
        <AppSkeleton />
        <AppSkeleton />
        <AppSkeleton />
        <AppSkeleton :width="180" />
        <AppSkeleton :width="80" />
      </div>
    </div>
    <AppDivider class="inventory-card__hr_second" />
    <AppButton color="danger" size="md" @click="isShow = true" v-if="inventory.count > 0">
      Удалить
    </AppButton>
    <TransitionSlideFade direction="vertical">
      <DeleteInventory
        class="inventory-card__form"
        v-if="isShow"
        @close="isShow = false"
        :max="inventory.count"
        :id="inventory.id"
      />
    </TransitionSlideFade>
  </article>
</template>

<style scoped lang="scss">
.inventory-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__content {
    width: 100%;
    padding: 0 4.5px;
  }

  &__description {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    margin-top: 24px;
  }

  &__hr_first {
    margin: 30px 0 16px;
  }

  &__hr_second {
    margin: 24px 0 18px 0;
  }

  &__form {
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
</style>
