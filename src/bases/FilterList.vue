<template>
  <div>
    <div id="searchBar">
      <input type="text" placeholder="Search cubes..." v-model="searchInput" @input="search" @focusout="loseFocus">
      <i @click="clearInput"><oh-vue-icon name="bi-x-lg" animation="wrench" hover></oh-vue-icon></i>
    </div>
    <ol id="cubesValidation" @click="changeShow">
      <li v-for="cube in cubesList" :key="cube.id" @click="clicked(cube.id)" :class="clickedId === cube.id ? cube.id + ' selectedItem' : cube.id + ''">{{ cube.name }}</li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref, watch, defineEmits} from 'vue'
import {OhVueIcon, addIcons} from "oh-vue-icons"
import { BiXLg } from "oh-vue-icons/icons"

addIcons(BiXLg)

const props = defineProps({
  cubesList: {type: Array, required: true}
})

const emit = defineEmits({
  selected: String
})

let show = true

function changeShow() {
  const li = document.querySelectorAll("li")
  if (show) {
    li.forEach(element => element.style.display = "block")
  } else {
    li.forEach(element => {
      if (!element.classList.contains("selectedItem")) {
        element.style.display = "none"
      }
    })
  }
  show = !show
}
let clickedId = ref("none")
function clicked(event: string) {
  clickedId.value = event
  emit("selected", clickedId.value)
}

let searchInput = ref('')
function search() {
  let filter = searchInput.value.toUpperCase()
  let blocks: any = document.getElementsByTagName("li") as HTMLCollectionOf<HTMLElement>
  for (let i = 0; i < blocks.length; i++) {
    let content = blocks[i].textContent.toUpperCase()
    if (content.indexOf(filter) > -1) {
      blocks[i].style.display = "block"
    } else {
      blocks[i].style.display = "none"
    }
  }
}

function loseFocus() {
  if (searchInput.value === '') {
    const li = document.querySelectorAll("li")
    li.forEach(element => {
      if (!element.classList.contains("selectedItem")) {
        element.style.display = "none"
      } else {
        element.style.display = "block"
      }
    })
  }
}

function clearInput() {
  searchInput.value = ''
  loseFocus()
}

watch(() => clickedId.value, (newVal, preVal) => {
  // console.log(newVal + " " + preVal)
})

</script>

<style scoped>

#searchBar {
  display: flex;
  align-items: center;
  padding: 0 1em 0 1em;
}

input {
  padding: 5px;
}

i {
  padding-left: .5em;
}

i:hover {
  cursor: pointer;
}

ol {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  max-height: 218px;
  overflow-y: auto;
  width: 14em;
}

ol li {
  display: none;
  word-wrap: break-word;
  padding: 5px;
}

ol li:first-child {
  display: block;
}

li:hover {
  cursor: pointer;
  background-color: #1d1d1d;
}

.selectedItem {
  order: -1;
}
</style>