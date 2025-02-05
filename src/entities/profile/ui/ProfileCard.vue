<script setup lang="ts">
import AppCard from '@/shared/AppCard.vue'
import AppSkeleton from '@/shared/AppSkeleton.vue'
</script>

<template>
  <AppCard class="profile-card">
    <img src="@/assets/img/img.png" alt="Картинка" />
    <div class="profile-card__content">
      <AppSkeleton :height="26" />
      <div class="profile-card__description">
        <AppSkeleton :width="155" />
        <AppSkeleton />
        <AppSkeleton :width="170" />
        <AppSkeleton :width="160" />
        <AppSkeleton :width="140" />
      </div>
      <AppSkeleton :width="80" />
    </div>
  </AppCard>
</template>

<style scoped lang="scss">
.profile-card {
  padding: 18px 14px 24px;
  background: $secondary-background;

  & img {
    display: block;
    max-width: 100%;
    width: 100%;
    height: 240px;
    object-fit: cover;
    border-radius: $base-rounded;
    //  filter: blur(12px);
  }

  &__content {
    margin-top: 20px;
    padding: 0 9px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  &__description {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
  }
}
</style>
