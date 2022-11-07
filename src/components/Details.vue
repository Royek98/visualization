<template>
  <div v-if="show">
    {{ obj.cubeDetails.id }}
    {{ obj.cubeDetails.name }}
  </div>
  <div v-else> Select object from Scene</div>
</template>

<script setup lang="ts">
import {useScene} from "@/stores/useScene"
import {useMenu} from "@/stores/useMenu"
import {reactive, ref, watch} from "vue";
import type {Cube} from "@/models/Cube";

const menuStore = useMenu()
const sceneStore = useScene()

let obj = reactive({cubeDetails: {} as Cube})
let show = ref(false)

watch(() => menuStore.showDetails, (newV, preV) => {
  obj.cubeDetails = sceneStore.findCube(newV)
  show.value = newV != null
})

</script>

<style scoped>

</style>