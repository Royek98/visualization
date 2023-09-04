<template>
  <div id="three-container"></div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue'
import {
  PerspectiveCamera, WebGLRenderer,
  BoxGeometry, MeshBasicMaterial, Color,
  Vector3, EdgesGeometry, LineSegments, Raycaster, Vector2
} from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import {useScene} from "@/stores/useScene"
//import type {Cube} from '@/models/Cube'

const sceneStore = useScene();

// const cubes: Cube[] = cubesJSON as Cube[]
// sceneStore.cubeList = cubes

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

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.update()

  const animate = () => {
    requestAnimationFrame(animate)

    controls.update()

    renderer.render(sceneStore.scene.clone(), camera)
  }

  // const raycaster = new Raycaster()
  // const pointer = new Vector2()
  //
  // container.addEventListener('mousedown', onDocumentMouseDown)
  //
  // function onDocumentMouseDown(event: any) {
  //   event.preventDefault();
  //   if (event.which !== 1) {
  //     return
  //   }
  //
  //   pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1
  //   pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1
  //
  //   raycaster.setFromCamera( pointer, camera );
  //   const intersects = raycaster.intersectObjects( sceneStore.scene.children )
  // }

  animate()

})
</script>
