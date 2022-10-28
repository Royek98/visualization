<template>
  <div id="three-container"></div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {
  PerspectiveCamera, WebGLRenderer,
  BoxGeometry, MeshBasicMaterial, Color,
  Vector3, EdgesGeometry, LineSegments
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import cubesJSON from "./validated.json"
import {useScene} from "@/stores/useScene"
import type {Cube} from '@/models/Cube'

const sceneStore = useScene();
const cubes: Cube[] = cubesJSON as Cube[]
sceneStore.cubeList = cubes

onMounted(() => {
  const container: any = document.getElementById('three-container')

  sceneStore.scene.background = new Color(0x595959)

  const camera = new PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000000)
  camera.position.set(0, 0, 155929)
  camera.up = new Vector3(0, 0, 1)

  const renderer = new WebGLRenderer()
  renderer.setSize(innerWidth, innerHeight)
  container.appendChild(renderer.domElement)

  sceneStore.drawAxes()

  cubes.forEach(cube => {
    const material = new MeshBasicMaterial({color: generateRandomColor()})
    const boxGeometry = new BoxGeometry(cube.width, cube.depth, cube.height)
    const edges = new EdgesGeometry(boxGeometry)
    const wireframe = new LineSegments(edges, material)
    wireframe.position.set(cube.center.x, cube.center.y, cube.center.z)
    wireframe.rotation.set(0, 0, -cube.rotation)
    wireframe.name = cube.id
    sceneStore.scene.add(wireframe)
  });

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const animate = () => {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(sceneStore.scene.clone(), camera)
  }

  animate()

  function generateRandomColor(): Color {
    return new Color(
      Math.random(),
      Math.random(),
      Math.random()
    )
  }

})
</script>