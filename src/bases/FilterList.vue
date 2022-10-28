<template>
<!--  <div>-->
<!--    <div id="searchBar">-->
<!--      <input type="text" placeholder="Search cubes..." v-model="searchInput" @input="search" @focusout="loseFocus">-->
<!--      <i @click="clearInput"><oh-vue-icon name="bi-x-lg" animation="wrench" hover></oh-vue-icon></i>-->
<!--    </div>-->
<!--    <ol id="cubesValidation" @click="changeShow">-->
<!--      <li v-for="cube in cubesList" :key="cube.id" @click="clicked(cube.id)" :class="clickedId === cube.id ? cube.id + ' selectedItem' : cube.id + ''">{{ cube.name }}</li>-->
<!--    </ol>-->
<!--  </div>-->
  <div>
    <v-select class="style-chooser" v-model="selectedInput" label="name" :reduce="cube => cube.id" :options="cubesList"></v-select>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch} from 'vue'
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

const props = defineProps({
  cubesList: {type: Array, required: true}
})

const emit = defineEmits({
  selected: String
})

let selectedInput: any = ref()
watch(() => selectedInput.value, (newV, preV) => {
  emit("selected", newV)
})

</script>

<style scoped>
div {
  width: 95%;
  margin-left: 2.5%;
  padding-bottom: .4em;
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