<template>
  <article class="card">
    <slot />
  </article>
</template>

<style lang="scss" scoped>
.card {
  background-color: $base-background;
  border: $base-border;
  border-radius: 12px;
  padding: 18px;
}
</style>
