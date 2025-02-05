<script setup lang="ts">
import { useInventoriesStore } from '@/entities/inventory/model/state'
import AppButton from '@/shared/AppButton.vue'
import AppInputNumber from '@/shared/AppInputNumber.vue'
import { ref } from 'vue'
interface IProps {
  max: number
  id: number
}
const props = defineProps<IProps>()
const emit = defineEmits(['close'])

const { updateInventory } = useInventoriesStore()

const count = ref<number | null>(null)

const onSubmit = () => {
  if (count.value) updateInventory(props.id, count.value)
  count.value = null
  emit('close')
}
</script>

<template>
  <form class="delete-inventory" @submit.prevent="onSubmit">
    <AppInputNumber
      class="delete-inventory__qty"
      type="number"
      :min="0"
      :max="max"
      placeholder="Введите количество"
      v-model="count"
    />
    <div class="delete-inventory__btns">
      <AppButton @click="emit('close')">Отменить</AppButton>
      <AppButton type="submit" color="danger">Удалить</AppButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.delete-inventory {
  width: 100%;
  background: $secondary-background;
  border-top: $base-border;
  padding: 20px 21px;

  &__qty {
    margin-bottom: 20px;
  }

  &__btns {
    display: flex;
    gap: 10px;
  }
}
</style>
