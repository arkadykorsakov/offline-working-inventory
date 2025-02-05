<script setup lang="ts">
import AppAlert from '@/shared/AppAlert.vue'
import AppSkeleton from '@/shared/AppSkeleton.vue'
import ProfileCard from '@/entities/profile/ui/ProfileCard.vue'
import InventoryBoard from '@/widgets/inventory/ui/InventoryBoard.vue'
</script>

<template>
  <main class="app">
    <ProfileCard class="app__profile" />
    <div class="app__board">
      <InventoryBoard />
    </div>
    <AppAlert class="app__alert">
      <AppSkeleton :height="36" />
    </AppAlert>
  </main>
</template>

<style scoped lang="scss">
.app {
  padding: 32px;
  max-width: 850px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 238px) minmax(0, 500px);
  gap: 24px;

  &__board {
    overflow: auto;
  }

  &__alert {
    grid-column: span 2;
  }

  @media (max-width: 767.98px) {
    display: flex;
    flex-direction: column;
  }
}
</style>
