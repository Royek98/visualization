<template>
  <div id="container">
    <input type="file" accept="application/json" ref="inputFile" @change="handleFileUpload($event)">
    <i  @click="clearInput">
      <oh-vue-icon name="gi-cancel" scale="1.3"></oh-vue-icon>
    </i>
  </div>
</template>

<script setup lang="ts">
import {OhVueIcon, addIcons} from "oh-vue-icons"
import {GiCancel} from "oh-vue-icons/icons"
import {ref} from "vue";
import {useScene} from "@/stores/useScene"
import {BoxGeometry, Color, EdgesGeometry, LineSegments, MeshBasicMaterial} from "three";

const sceneStore = useScene()

addIcons(GiCancel)

const inputFile = ref();

function handleFileUpload(event: any) {
  clearScene()

  let reader = new FileReader()
  reader.readAsText(event.target.files[0])
  reader.onload = function() {
    let result: string = reader.result?.toString()!
    sceneStore.cubeList = JSON.parse(result)
    sceneStore.cubeList.forEach(cube => {
      if (sceneStore.viewType == 'wireframe') {
        sceneStore.drawWireframeCube(cube,  generateRandomColor())
      } else {
        sceneStore.drawSolidCube(cube,  generateRandomColor())
      }
    });
  };
}

function clearInput() {
  inputFile.value.value = null
  clearScene()
}

function clearScene() {
  sceneStore.cubeList = []
  sceneStore.scene.clear()
  sceneStore.drawAxes()
}


function generateRandomColor(): MeshBasicMaterial {
  let colorMaterial = new MeshBasicMaterial()
  colorMaterial.color.r = Math.random()
  colorMaterial.color.g = Math.random()
  colorMaterial.color.b = Math.random()
  return colorMaterial
}

</script>

<style scoped>

#container {
 padding-bottom: .2em;
}

</style>