import {defineStore} from 'pinia'
import {Scene, AxesHelper, MeshBasicMaterial, BoxGeometry, Mesh, EdgesGeometry, LineSegments, Color} from "three"
import type {Cube} from '@/models/Cube'

export const useScene = defineStore('sceneStore', {
    state: () => {
        return {scene: new Scene(), cubeList: [] as Cube[], viewType: 'wireframe', focusedCube: null}
    },

    getters: {
      getCurrentScene(): string[] {
          return this.scene.children.map(obj => obj.name).filter(obj => obj != '')
      }
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
            return Object.assign({}, found)
        },

        drawSolidCube(found: Cube, colorMaterial: MeshBasicMaterial) {
            const targetCopyCenter = Object.assign({}, found.center)

            const boxGeometry = new BoxGeometry(found.width, found.depth, found.height)
            const solid = new Mesh(boxGeometry, colorMaterial)

            solid.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z)
            solid.rotation.set(0, 0, -found.rotation)
            solid.material.transparent = true
            solid.material.opacity = 0.7
            solid.name = found.id
            this.scene.add(solid)
        },

        drawWireframeCube(found: Cube, colorMaterial: MeshBasicMaterial) {
            const targetCopyCenter = Object.assign({}, found.center)
            const boxGeometry = new BoxGeometry(found.width, found.depth, found.height)
            const edges = new EdgesGeometry(boxGeometry)
            const wireframe = new LineSegments(edges, colorMaterial)

            wireframe.position.set(targetCopyCenter.x, targetCopyCenter.y, targetCopyCenter.z)
            wireframe.rotation.set(0, 0, -found.rotation)
            wireframe.name = found.id
            this.scene.add(wireframe)
        },

        drawCollisions(id: string, collisionType: string) {
            switch (collisionType) {
                case "Conflict": {
                    const color = this.setColor(new Color(1,0,0))
                    this.drawScene(id, color)
                    break
                }
                case "IsWithin": {
                    const color = this.setColor(new Color(0,0,1))
                    this.drawScene(id, color)
                    break
                }
                case "Contain": {
                    const color = this.setColor(new Color(1,1,0))
                    this.drawScene(id, color)
                    break
                }
                case "Equal": {
                    const color = this.setColor(new Color(0.6,0,1))
                    this.drawScene(id, color)
                    break
                }
                case "Okay": {
                    const color = this.setColor(new Color(0,0.8,0))
                    this.drawScene(id, color)
                    break
                }
            }
        },

        setColor(color: Color): MeshBasicMaterial {
            let colorMaterial = new MeshBasicMaterial()
            colorMaterial.color.r = color.r
            colorMaterial.color.g = color.g
            colorMaterial.color.b = color.b
            return colorMaterial
        },

        sceneRemove(id: string) {
            this.scene.remove.apply(this.scene, this.scene.children.filter(child => child.name === id))
        },

        selectedCubeColor(id: string): Color {
            // @ts-ignore
            return this.scene.children.find(child => child.name === id)?.material.color
        },

        changeCubeColor(id: string, color: Color) {
            const found = this.scene.children.find(child => child.name === id)
            if (found != undefined) {
                // @ts-ignore
                found.material.color.r = color.r
                // @ts-ignore
                found.material.color.g = color.g
                // @ts-ignore
                found.material.color.b = color.b
            }
        }
    },
})