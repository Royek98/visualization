<template>
  <div id="container">
    <div class="header">{{header}}</div>
    <div class="item">
      {{item}}
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from 'vue'

const props = defineProps(['header', 'item'])

</script>

<style scoped>

#container {
  padding-bottom: 0.4em;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
}

.header {
  padding: 5px;
  background-color: #37598B;
  border-radius: 5px 5px 0 0;
}

.item {
  padding: 5px;
}

</style>