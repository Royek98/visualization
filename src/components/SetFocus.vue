<template>
  <filter-list :cubes-list="obj.cubesList" @selected="emitted" :checker="checker"></filter-list>
</template>

<script setup lang="ts">
import FilterList from '@/bases/FilterList.vue'
import {useScene} from "@/stores/useScene"
import {reactive, ref, watch} from 'vue'
import {Color} from 'three'

const sceneStore = useScene()

interface CubeSimplified {
  id: string,
  name: string
}

let obj = reactive({cubesList: [] as CubeSimplified[]})

watch(() => sceneStore.cubeList, (neV, preV) => {
  obj.cubesList = []
  neV.forEach(cube => obj.cubesList.push({id: cube.id, name: cube.name}))
})

let selected = ref()
function emitted(event: string) {
  selected.value = event
}

watch(() => selected.value, (newVal, preVal) => {
  sceneStore.focusedCube = newVal
  sceneStore.scene.clear()
  sceneStore.drawAxes()

  if (newVal != null) {
    sceneStore.drawScene(newVal, sceneStore.setColor(new Color(1,1,1)))
  } else {
    sceneStore.cubeList.forEach(cube => {
      sceneStore.drawScene(cube.id, sceneStore.setColor(new Color(Math.random(), Math.random(), Math.random())))
    })
  }
})

const checker = false

</script>