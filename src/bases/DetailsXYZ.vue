<template>
  <div id="container">
    <div class="header">{{header}}</div>
    <div class="item">
      <div class="item-a">
        {{obj.items.firstDesc}}
      </div>
      <div class="item-b">{{obj.items.firstValue + ' mm'}}</div>
    </div>
    <div class="item">
      <div class="item-a">
        {{obj.items.secondDesc}}
      </div>
      <div class="item-b">{{obj.items.secondValue + ' mm'}}</div>
    </div>
    <div class="item">
      <div class="item-a">
        {{obj.items.thirdDesc}}
      </div>
      <div class="item-b">{{obj.items.thirdValue + ' mm'}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">

import {defineProps, reactive, watch} from 'vue'

const props = defineProps(['header', 'items'])

interface item {
  firstDesc: string,
  firstValue?: number,
  secondDesc: string,
  secondValue?: number,
  thirdDesc: string,
  thirdValue?: number
}

let obj = reactive({items: {} as item})

watch(() => props.items, (newV, preV) => {
  obj.items = newV
  if (obj.items.firstValue != undefined && obj.items.secondValue != undefined && obj.items.thirdValue != undefined) {
    obj.items.firstValue = +obj.items.firstValue.toFixed(2) // + converts to number
    obj.items.secondValue = +obj.items.secondValue.toFixed(2) // + converts to number
    obj.items.thirdValue = +obj.items.thirdValue.toFixed(2) // + converts to number
  }
})

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
  display: grid;
  grid-template-columns: 6em auto auto;
  grid-template-areas:
    "description value value";
}

.item-a {
  grid-area: description;
  padding: 5px;
}
.item-b {
  grid-area: value;
  padding: 5px;
}

</style>