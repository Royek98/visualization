<template>
  <label class="noSelect" :class="menuStore.getCheckedByName(props.value) ? 'active' : ''">{{ value }}
    <input @input="check" type="checkbox" :value="value">
  </label>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'
import {useMenu} from "@/stores/useMenu"

const menuStore = useMenu()

const props = defineProps({
  value: {type: String, required: true}
})

function check() {
  menuStore.changeChecked(props.value)
}

</script>

<style scoped>

label {
  display: block;
  padding: .5em .1em .5em .1em;
  width: 8em;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: .2em;
  border-radius: 5px;
}

label:hover {
  cursor: pointer;
  background-color: #1d1d1d;
}

input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.active {
  background-color: #4772b3;
}

.active:hover {
  background-color: #3F649D;
}

</style>