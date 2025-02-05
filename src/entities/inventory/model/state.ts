import { defineStore } from 'pinia'
import type { IInventory } from './types'
import { computed, ref, watch } from 'vue'

type TransformData = { position: number; inventory: IInventory | null }[]

export const useInventoriesStore = defineStore('inventories', () => {
  const inventories = ref<IInventory[]>([
    {
      id: 1,
      background: '#7faa65',
      background_shadow: 'rgba(184, 217, 152, 0.349)',
      position: 2,
      count: 5,
    },
    {
      id: 2,
      background: '#AA9765',
      background_shadow: ' rgba(217, 187, 152, 0.35)',
      position: 5,
      count: 6,
    },
    {
      id: 3,
      background: '#656CAA',
      background_shadow: 'rgba(116, 129, 237, 0.35)',
      position: 8,
      count: 9,
    },
  ])

  const inventoriesInLocalStorage = localStorage.getItem('inventories')
  if (inventoriesInLocalStorage) {
    inventories.value = JSON.parse(inventoriesInLocalStorage)
  }

  const transformInventories = computed(() => {
    const transformData: TransformData = []
    for (let pos = 1; pos <= 25; pos++) {
      const inventory = inventories.value.find((i) => i.position === pos)
      transformData.push(
        inventory ? { position: pos, inventory } : { position: pos, inventory: null },
      )
    }
    return transformData
  })

  function moveInventory(from: number, to: number) {
    const curInventory = inventories.value.find((i) => i.position === from)
    const curIdx = inventories.value.findIndex((i) => i.position === from)
    const existDataTo = inventories.value.find((i) => i.position === to)
    if (curIdx !== -1 && curInventory && !existDataTo) {
      inventories.value[curIdx] = { ...curInventory, position: to }
    }
  }

  function updateInventory(id: number, count: number) {
    const curInventory = inventories.value.find((i) => i.id === id)
    const curIdx = inventories.value.findIndex((i) => i.id === id)
    console.log(curInventory, curIdx)

    if (curIdx !== -1 && curInventory) {
      if (curInventory.count >= count) {
        inventories.value[curIdx] = {
          ...curInventory,
          count: curInventory.count - count,
        }
      } else {
        alert('Невозможно удалить больше предметов, чем имеется в наличии.')
      }
    }
  }

  watch(
    () => inventories,
    (state) => {
      localStorage.setItem('inventories', JSON.stringify(state.value))
    },
    { deep: true },
  )

  return { transformInventories, moveInventory, updateInventory }
})
