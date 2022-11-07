<template>
  <p v-if="show">Set focus first</p>
  <div v-else>
    <check-box v-for="ct in collisionTypes" :key="ct" :value="ct"></check-box>
  </div>
</template>

<script setup lang="ts">
import {useScene} from "@/stores/useScene"
import {useMenu} from "@/stores/useMenu"
import {ref, watch} from "vue"
import type {Cube, Validated} from "@/models/Cube"
import CheckBox from '@/bases/CheckBox.vue'

const sceneStore = useScene()
const menuStore = useMenu()

const collisionTypes = menuStore.collisionCheckboxes.map(obj => obj.name)

let show = ref(true)
let collisions: Validated[] = []

watch(() => sceneStore.focusedCube, (newV, preV) => {

  show.value = newV == null
  collisions = !show.value ? findCubeCollisions(newV) : []
  menuStore.collisionCheckboxes.forEach(obj => obj.checked = false)

})

function findCubeCollisions(id: string | null): Validated[] {
  const found = sceneStore.cubeList.find(cube => cube.id == id) as Cube
  return found.validated
}

watch(() => menuStore.getCheckedName, (newV, preV) => {
  // to co obecnie zostało kliknięte
  let difference = newV
      .filter(x => !preV.includes(x))
      .concat(preV.filter(x => !newV.includes(x))).toString();

  if (newV.length > preV.length) {
    collisions.forEach(collision => {
      if (collision.collisionType === difference) {
        sceneStore.drawCollisions(collision.id, difference)
      }
    })
  } else {
    collisions.forEach(collision => {
      if (collision.collisionType === difference) {
        sceneStore.sceneRemove(collision.id)
      }
    })
  }
})

</script>

<style scoped>

</style>