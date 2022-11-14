<template>
  <filter-list :cubes-list="obj.cubesList" @selected="selected" :checker="checker"></filter-list>
</template>

<script setup lang="ts">
import FilterList from '../bases/FilterList.vue'
import {useScene} from "@/stores/useScene"
import {useMenu} from "@/stores/useMenu"
import {reactive, watch} from "vue"
import type {ColorCustom} from '@/models/Color'
import {Color} from 'three'

const sceneStore = useScene()
const menuStore = useMenu()

interface CubeSimplified {
  id: string,
  name: string
}

interface CubeColor {
  id: string
  color: ColorCustom
}

let obj = reactive({cubesList: [] as CubeSimplified[]})

let savedColor: CubeColor = {
  id: '',
  color: {r: 0, g: 0, b: 0}
}

watch(()=> sceneStore.getCurrentScene, (newV, preV) => {
  obj.cubesList = []
  newV.forEach(val => {
    const name = sceneStore.findCube(val).name
    obj.cubesList.push({'id': val, 'name': name})
  })

  if (sceneStore.getCurrentScene.find(ids => ids == menuStore.showDetails) == undefined) {
    menuStore.showDetails = ''
  }
})

function selected(event: string) {
  menuStore.showDetails = event

  if (savedColor.id !== event && savedColor.id !== '') {
    sceneStore.changeCubeColor(savedColor.id, new Color(savedColor.color.r,savedColor.color.g,savedColor.color.b))
  }

  if (event != '' && event != null) {
    let found = sceneStore.selectedCubeColor(event)
    savedColor = {
      id: event,
      color: {r: found.r, g: found.g, b: found.b}
    }

    sceneStore.changeCubeColor(event, new Color(0,0,0))
  }

}

const checker = true

</script>

<style scoped>

</style>