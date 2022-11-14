<template>
  <div>
    <v-select class="style-chooser" v-model="selectedInput" label="name" :reduce="cube => cube.id" :options="cubesList"></v-select>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch} from 'vue'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import {useScene} from "@/stores/useScene"

const sceneStore = useScene()

const props = defineProps({
  cubesList: {type: Array, required: true},
  checker: {type: Boolean, required: false}
})

const emit = defineEmits({
  selected: String
})

let selectedInput: any = ref()
watch(() => selectedInput.value, (newV, preV) => {
  emit("selected", newV)
})

watch(() => sceneStore.getCurrentScene, (newV, preV) => {
  if (!props.checker) {
    return
  }

  if (newV.find(obj => obj == selectedInput.value) == undefined) {
    selectedInput.value = null
  }
})

</script>

<style scoped>
div {
  width: 95%;
  margin-left: 2.5%;
  padding-bottom: .2em;
}

>>> {
  --vs-controls-color: #ffffff;
  --vs-border-color: #ffffff;

  --vs-dropdown-bg: #3d3d3d;
  --vs-dropdown-color: #ffffff;
  --vs-dropdown-option-color: #ffffff;

  --vs-selected-bg: #1d1d1d;
  --vs-selected-color: #ffffff;

  --vs-search-input-color: #ffffff;

  --vs-dropdown-option--active-bg: #1d1d1d;
  --vs-dropdown-option--active-color: #eeeeee;
}

</style>