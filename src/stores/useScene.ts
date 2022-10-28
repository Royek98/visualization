import {defineStore} from 'pinia'
import {Scene, AxesHelper, MeshBasicMaterial, BoxGeometry, Mesh, EdgesGeometry, LineSegments, Color} from "three";
import type {Cube} from '@/models/Cube'

export const useScene = defineStore('sceneStore', {
    state: () => {
        return {scene: new Scene(), cubeList: [] as Cube[], viewType: 'wireframe'}
    },
    actions: {
        drawAxes() {
            const axesHelper = new AxesHelper(10000000)
            this.scene.add(axesHelper)
        },

        drawScene(cubeToFind: string, colorMaterial: MeshBasicMaterial) {
            switch (this.viewType) {
                case 'wireframe': {
                    const found = this.findCube(cubeToFind)
                    this.drawWireframeCube(found, colorMaterial)
                    break
                }
                case 'solid': {
                    const found = this.findCube(cubeToFind)
                    this.drawSolidCube(found, colorMaterial)
                    break
                }
                default: {
                    console.error("View Type \" " + this.viewType + " \" not found!")
                    break
                }
            }
        },

        findCube(id: string): Cube {
            // towrzę kopie, aby pozbyć się proxy
            const found = this.cubeList.find(cube => cube.id === id) as Cube
            return Object.assign({}, found);
        },

        drawSolidCube(found: Cube, colorMaterial: MeshBasicMaterial) {
            const targetCopyCenter = Object.assign({}, found.center)

            const boxGeometry = new BoxGeometry(found.width, found.depth, found.height);
            const solid = new Mesh(boxGeometry, colorMaterial);

            solid.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z);
            solid.rotation.set(0, 0, -found.rotation);
            solid.material.transparent = true;
            solid.material.opacity = 0.3;
            solid.name = found.id
            this.scene.add(solid);
        },

        drawWireframeCube(found: any, colorMaterial: MeshBasicMaterial) {
            const targetCopyCenter = Object.assign({}, found.center)

            const boxGeometry = new BoxGeometry(found.width, found.depth, found.height)
            const edges = new EdgesGeometry(boxGeometry)
            const wireframe = new LineSegments(edges, colorMaterial)

            wireframe.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z)
            wireframe.rotation.set(0, 0, -found.rotation)
            wireframe.name = found.id
            this.scene.add(wireframe)
        }
    },
})