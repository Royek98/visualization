<template>
  <filter-list :cubes-list="obj.cubesList" @selected="emitted"></filter-list>
</template>

<script setup lang="ts">
import type {Cube} from '@/models/Cube'
import FilterList from '@/bases/FilterList.vue'
import {useScene} from "@/stores/useScene"
import {onMounted, reactive, ref, watch} from 'vue'

const sceneStore = useScene()

interface CubeSimplified {
  id: string,
  name: string
}

let obj = reactive({cubesList: [] as CubeSimplified[]})
obj.cubesList.push({id: 'none', name: 'None'})

onMounted(()=> {
  sceneStore.cubeList.forEach(cube => obj.cubesList.push({id: cube.id, name: cube.name}))
})

let selected = ref('none')
function emitted(event: string) {
  selected.value = event
}


watch(() => selected.value, (newVal, preVal) => {
  if (newVal !== 'none') {
    const found = findCube(newVal)

  }
})

function findCube(id: string): Cube {
  return sceneStore.cubeList.find(cube => cube.id === id) as Cube
}

</script>

<style scoped>

</style>