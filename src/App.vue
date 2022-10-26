<template>
  <div id="menuBar">
    <menu-view></menu-view>
  </div>
  <three-view></three-view>
</template>

<script setup lang="ts">
import ThreeView from './views/ThreeView.vue'
import MenuView from './views/MenuView.vue'
</script>

<style>
  #menuBar {
    position: absolute;
    z-index: 1000;
  }

  .noSelect {
    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
    /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  }
</style>
