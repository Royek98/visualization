import { defineStore } from 'pinia'

export const useToggle = defineStore('toggleStore', {
    state: () => {
        return { toggle: false }
    },
    actions: {
        changeToggle() {
            this.toggle = !this.toggle
        },
    },
})