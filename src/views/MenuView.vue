<template>
  <Transition>
    <div class="menu" v-show="toggleStore.toggle">
      <div id="content">
        <content-element name="View Type">
          <view-type></view-type>
        </content-element>
        <content-element name="Set Focus">
          <set-focus></set-focus>
        </content-element>
<!--        <content-element name="Current Scene">-->
<!--        </content-element>-->
      </div>
      <menu-bar v-show="toggleStore.toggle"></menu-bar>
    </div>
  </Transition>
  <div class="menu" v-show="!toggleStore.toggle">
    <menu-bar></menu-bar>
  </div>
</template>

<script setup lang="ts">
import MenuBar from '../components/MenuBar.vue'
import ContentElement from '../bases/ContentElement.vue'
import ViewType from '../components/ViewType.vue'
import SetFocus from '../components/SetFocus.vue'

import {useToggle} from '@/stores/useToggle'

const toggleStore = useToggle()

</script>

<style scoped>
.menu {
  display: flex;
  color: white;
}

#content {
  background-color: #303030;
  padding: 10px;
  box-shadow: inset -19px 0 10px -18px #1d1d1d;
  overflow-y: auto;
  height: 100vh;
}

.v-enter-active,
.v-leave-active {
  transition: transform 0.15s ease-out;
  /*transform: translateY(200px);*/
}

.v-enter-from,
.v-leave-to {
  transform: translateX(-26em);
  /*transition: all 0.3s ease-out;*/
}


</style>