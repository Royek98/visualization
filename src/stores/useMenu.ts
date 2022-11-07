import {defineStore} from 'pinia'

export const useMenu = defineStore('menuStore', {
    state: () => {
        return {
            toggle: false,
            collisionCheckboxes: [
                {name: "Conflict", checked: false},
                {name: "IsWithin", checked: false},
                {name: "Contain", checked: false},
                {name: "Equal", checked: false},
                {name: "Okay", checked: false}
            ],
            showDetails: ''
        }
    },
    actions: {
        changeToggle() {
            this.toggle = !this.toggle
        },
        changeChecked(name: string) {
            const found = this.collisionCheckboxes.find(obj => obj.name === name)
            if (found !== undefined) {
                found.checked = !found.checked

            }
        },
        getCheckedByName(name: string): boolean {
            return this.collisionCheckboxes.find(obj => obj.name === name)!.checked
        }
    },
    getters: {
        getCheckedName(): string[] {
            return this.collisionCheckboxes.filter(obj => obj.checked).map(obj => obj.name)
        }
    }
})