<template>
  <label title="Wireframe">
    <input type="radio" name="viewMode" value="wireframe" checked v-model="picked">
    <i>
      <oh-vue-icon name="hi-cube" fill="#ffffff" scale="2"></oh-vue-icon>
    </i>
  </label>

  <label title="Solid">
    <input type="radio" name="viewMode" value="solid" v-model="picked">
    <i>
      <oh-vue-icon name="io-cube" scale="2"></oh-vue-icon>
    </i>
  </label>
</template>

<script setup lang="ts">
import {watch, ref} from 'vue'
import {useScene} from "@/stores/useScene"
import {OhVueIcon, addIcons} from "oh-vue-icons"
import {IoCube, HiCube} from "oh-vue-icons/icons"
import {MeshBasicMaterial} from 'three'

addIcons(IoCube, HiCube)

let picked = ref('wireframe')

const sceneStore = useScene()

interface Color {
  r: number
  g: number
  b: number
}

interface Saved {
  name: string
  color: Color
}

let savedScene: Saved[] = []

watch(
    picked,
    (newPicked, prevPicked) => {
      sceneStore.viewType = newPicked
      saveSceneState()
      sceneStore.scene.clear()
      sceneStore.drawAxes()
      viewType()
      savedScene = []
    }
)

function saveSceneState() {
  sceneStore.scene.children.forEach(child => {
    savedScene.push({
      name: child.name,
      color: {r: child.material.color.r, g: child.material.color.g, b: child.material.color.b}
    })
  })
}

function viewType() {
  savedScene.forEach(saved => {
    sceneStore.drawScene(saved.name, setColor(saved.color))
  })
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
label:nth-child(2) {
  padding-left: .5em;
}

i {
  /*padding: 13px 2px 2px 2px;*/
  padding: 1em .1em .3em .1em;
}

/* HIDE RADIO */
[type=radio] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

/* IMAGE STYLES */
[type=radio] + i {
  cursor: pointer;
}

/* CHECKED STYLES */
[type=radio]:checked + i {
  background-color: #4772b3;
  border-radius: 5px;
}
</style>