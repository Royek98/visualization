<template>
  <filter-list :cubes-list="obj.cubesList" @selected="emitted"></filter-list>
</template>

<script setup lang="ts">
import type {Cube} from '@/models/Cube'
import FilterList from '@/bases/FilterList.vue'
import {useScene} from "@/stores/useScene"
import {onMounted, reactive, ref, watch} from 'vue'
import {Color, MeshBasicMaterial} from 'three'

const sceneStore = useScene()

interface CubeSimplified {
  id: string,
  name: string
}

let obj = reactive({cubesList: [] as CubeSimplified[]})

onMounted(()=> {
  sceneStore.cubeList.forEach(cube => obj.cubesList.push({id: cube.id, name: cube.name}))
})

let selected = ref('none')
function emitted(event: string) {
  selected.value = event
}

watch(() => selected.value, (newVal, preVal) => {
  if (newVal != null) {
    sceneStore.scene.clear()
    sceneStore.drawAxes()
    sceneStore.drawScene(newVal, setColor(new Color(1,1,1)))
  } else {
    sceneStore.scene.clear()
    sceneStore.drawAxes()
    sceneStore.cubeList.forEach(cube => {
      sceneStore.drawScene(cube.id, setColor(new Color(Math.random(), Math.random(), Math.random())))
    })
  }
})

function findCube(id: string): Cube {
  return sceneStore.cubeList.find(cube => cube.id === id) as Cube
}

function setColor(color: Color): MeshBasicMaterial {
  let colorMaterial = new MeshBasicMaterial()
  colorMaterial.color.r = color.r
  colorMaterial.color.g = color.g
  colorMaterial.color.b = color.b
  return colorMaterial
}

</script>

<style scoped>

</style>