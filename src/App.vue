<template>
  <div>
    <router-view />
  </div>
</template>

<script setup>
// VUEX & UTILS
import { useTestStore } from './stores/Test';
import { onMounted } from 'vue';

// USES
const testStore = useTestStore();

// METHODS
const setNumOfTries = () => localStorage.setItem('numOfTries', testStore.numOfTries);

// LIFECYCLE
onMounted(() => setNumOfTries());
</script>

<style lang="scss">
@import "./scss/variables";

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  text-shadow: 0px 0px 2px white, 0px 0px 10px #2dcd92;
  margin-top: 60px;
}

html,
body {
  background: $mainDark;
}
</style>
