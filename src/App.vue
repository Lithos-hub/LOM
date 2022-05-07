<template>
  <div>
    <router-view />
  </div>
    <img class="noise" src="./assets/noise.png">
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

body {
  background: radial-gradient(circle, rgb(0, 15, 10) 50%, black);
}

.noise {
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  opacity: 0.3;
  animation: noise 300ms linear infinite;
  mix-blend-mode: exclusion;
  background: #2020208a;
  width: 200%;
  height: 200%;
}
@keyframes noise {
  0% {
    top: -100px
  }
  25% {
    left: -500px;
  }
  50% {
    top: -500px;
  }
  75% {
    right: -400px
  }
  100% {
    top: 0px;
  }
}
</style>
