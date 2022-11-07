<template>
  <filter-list :cubes-list="obj.cubesList" @selected="selected"></filter-list>
</template>

<script setup lang="ts">
import FilterList from '../bases/FilterList.vue'
import {useScene} from "@/stores/useScene"
import {useMenu} from "@/stores/useMenu"
import {reactive, watch} from "vue";

const sceneStore = useScene()
const menuStore = useMenu()

interface CubeSimplified {
  id: string,
  name: string
}

let obj = reactive({cubesList: [] as CubeSimplified[]})

watch(()=> sceneStore.getCurrentScene, (newV, preV) => {
  obj.cubesList = []
  newV.forEach(val => {
    const name = sceneStore.findCube(val).name
    obj.cubesList.push({'id': val, 'name': name})
  })
})

function selected(event: string) {
  menuStore.showDetails = event
}

</script>

<style scoped>

</style>