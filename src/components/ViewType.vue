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
import {MeshBasicMaterial, BoxGeometry, Mesh, EdgesGeometry, LineSegments} from 'three'
import type {Cube} from '@/models/Cube'

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
      saveSceneState()
      sceneStore.scene.clear()
      sceneStore.drawAxes()
      viewType(newPicked)
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

function viewType(pickedType: string) {
  switch (pickedType) {
    case 'wireframe': {
      savedScene.forEach(cube => {
        const found = findCube(cube.name)
        const colorMaterial = setColor(cube.color)
        drawWireframeCube(found, colorMaterial)
      })
      break
    }
    case 'solid': {
      savedScene.forEach(cube => {
        const found = findCube(cube.name)
        const colorMaterial = setColor(cube.color)
        drawSolidCube(found, colorMaterial)
      })
      break
    }
    default: {
      console.error("View Type \" " + pickedType + " \" not found!")
      break
    }
  }
}

function findCube(name: string): Cube {
  // towrzę kopie, aby pozbyć się proxy
  const found = sceneStore.cubeList.find(cube => cube.id === name)
  return Object.assign({}, found);
}

function setColor(color: Color): MeshBasicMaterial {
  let colorMaterial = new MeshBasicMaterial()
  colorMaterial.color.r = color.r
  colorMaterial.color.g = color.g
  colorMaterial.color.b = color.b
  return colorMaterial
}

function drawSolidCube(found: Cube, colorMaterial: MeshBasicMaterial) {
  const targetCopyCenter = Object.assign({}, found.center)

  const boxGeometry = new BoxGeometry(found.width, found.depth, found.height);
  const solid = new Mesh(boxGeometry, colorMaterial);

  solid.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z);
  solid.rotation.set(0, 0, -found.rotation);
  solid.material.transparent = true;
  solid.material.opacity = 0.3;
  solid.name = found.id
  sceneStore.scene.add(solid);
}

function drawWireframeCube(found: any, colorMaterial: MeshBasicMaterial) {
  const targetCopyCenter = Object.assign({}, found.center)

  const boxGeometry = new BoxGeometry(found.width, found.depth, found.height)
  const edges = new EdgesGeometry(boxGeometry)
  const wireframe = new LineSegments(edges, colorMaterial)

  wireframe.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z)
  wireframe.rotation.set(0, 0, -found.rotation)
  wireframe.name = found.id
  sceneStore.scene.add(wireframe)
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