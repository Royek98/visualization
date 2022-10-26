import { defineStore } from 'pinia'
import {Scene, AxesHelper} from "three";
import type {Cube} from '@/models/Cube'

export const useScene = defineStore('sceneStore', {
    state: () => {
        return { scene: new Scene(), cubeList: [] as Cube[]}
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        drawAxes() {
            const axesHelper = new AxesHelper(10000000)
            this.scene.add(axesHelper)
        }
    },
})