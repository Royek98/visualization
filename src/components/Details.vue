<template>
  <div v-show="show">
    <details-one header="Id" :item="obj.cubeDetails.id"></details-one>
    <details-one header="Name" :item="obj.cubeDetails.name"></details-one>
    <details-one header="Rotation" :item="obj.cubeDetails.rotation + ' rad'"></details-one>
    <details-x-y-z header="Base Point" :items="obj.basePoint"></details-x-y-z>
    <details-x-y-z header="Dimensions" :items="obj.dimensions"></details-x-y-z>
  </div>
  <div v-show="!show"> Select object from Scene</div>
</template>

<script setup lang="ts">
import {useScene} from "@/stores/useScene"
import {useMenu} from "@/stores/useMenu"
import {reactive, ref, watch} from "vue";
import type {Cube} from "@/models/Cube";
import DetailsXYZ from '@/bases/DetailsXYZ.vue'
import DetailsOne from '@/bases/DetailsOne.vue'

const menuStore = useMenu()
const sceneStore = useScene()

let obj = reactive({
  cubeDetails: {} as Cube,
  basePoint: {},
  dimensions: {}
})
let show = ref(false)

watch(() => menuStore.showDetails, (newV, preV) => {
  obj.cubeDetails = sceneStore.findCube(newV)
  show.value = (newV != null && newV != '')

  obj.basePoint = {
    'firstDesc': 'X',
    'firstValue': obj.cubeDetails.x,
    'secondDesc': 'Y',
    'secondValue': obj.cubeDetails.y,
    'thirdDesc': 'Z',
    'thirdValue': obj.cubeDetails.z,
  }

  obj.dimensions = {
    'firstDesc': 'Width',
    'firstValue': obj.cubeDetails.width,
    'secondDesc': 'Height',
    'secondValue': obj.cubeDetails.height,
    'thirdDesc': 'Depth',
    'thirdValue': obj.cubeDetails.depth,
  }
})

</script>

<style scoped>

</style>