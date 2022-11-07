<template>
  <div id="container">
    <div @click="change" id="top">
      <oh-vue-icon :name="showCard ? 'fa-arrow-down' : 'fa-arrow-right'" class="iconLabel"></oh-vue-icon>
      <span class="noSelect">{{ name }}</span>
    </div>
    <Transition>
      <div id="bottom" v-show="showCard">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {useScene} from "@/stores/useScene"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { FaArrowRight, FaArrowDown } from "oh-vue-icons/icons"
addIcons(FaArrowRight, FaArrowDown)

const sceneStore = useScene()

const props = defineProps({
  name: {type: String, required: true}
})

let showCard = ref(false)

function change() {
  showCard.value = !showCard.value
}


</script>

<style scoped>
#container {
  background-color: #3d3d3d;
  margin-bottom: .5em;
  border-radius: 5px;
  min-width: 20em;
}

.iconLabel {
  padding-right: .3em;
}

#top {
  display: block;
  height: 100%;
  padding: .4em .8em .4em .8em;
}

#top:hover {
  background-color: #1d1d1d;
  border-radius: 5px 5px 0 0;
}

#top:hover {
  cursor: pointer;
}

#bottom {
  text-align: center;
  padding: .4em 0 .4em 0;
}


.v-enter-active {
  animation: bounce-in 0.4s;
}

.v-leave-active {
  animation: bounce-in 0.20s reverse;
}

@keyframes bounce-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

</style>