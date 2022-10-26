<template>
    <div class="fillBar" @click="toggleStore.changeToggle"></div>
    <div class="container">
      <div class="properties noSelect" @click="toggleStore.changeToggle">PROPERTIES</div>
    </div>
</template>

<script setup lang="ts">
import {useToggle} from '@/stores/useToggle'

const toggleStore = useToggle()

</script>

<style scoped>

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
}

.properties {
  writing-mode: vertical-rl;
  letter-spacing: .5em;
  padding: 15px 5px 15px 20px;
  background-color: #1d1d1d;
  border-radius: 0 10px 10px 0;
  font-family: 'Staatliches', cursive;
  font-size: 21px;
}

.properties {
  cursor: pointer;
}


.fillBar:hover {
  cursor: pointer;
}

.fillBar:after {
  content: "..";
  visibility: hidden;
}

.fillBar {
  background-color: #1d1d1d;
  height: 100vh;
}

</style>