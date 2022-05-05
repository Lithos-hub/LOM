<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup></script>

<style lang="scss">
@import "./scss/variables";

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  text-shadow: 0px 0px 2px white, 0px 0px 10px green;
  margin-top: 60px;
}

html,
body {
  background: $mainDark;
}
</style>
