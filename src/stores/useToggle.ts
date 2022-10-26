import { defineStore } from 'pinia'

export const useToggle = defineStore('toggleStore', {
    state: () => {
        return { toggle: false }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        changeToggle() {
            this.toggle = !this.toggle
        },
    },
})