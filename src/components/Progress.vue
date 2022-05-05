<template>
  <div class="progressBar"></div>
  <h5>Progress: {{ `${answeredQuestions} / ${numOfQuestions}` }}</h5>
</template>

<script setup>
import { computed } from "vue";
import { useTestStore } from "../stores/Test";

const testStore = useTestStore();

const numOfQuestions = computed(() => testStore.testArray.length);
const answeredQuestions = computed(() => testStore.testCounter <= numOfQuestions.value ? testStore.testCounter : numOfQuestions.value);
const progressWidth = computed(
  () => (100 / numOfQuestions.value) * (answeredQuestions.value) + "%"
);

</script>

<style lang="scss" scoped>

.progressBar {
  transition: all 1s cubic-bezier(0.215, 0.610, 0.355, 1);
  position: fixed;
  top: 0;
  left: 0;
  min-width: v-bind(progressWidth);
  width: v-bind(progressWidth);
  height: 10px;
  background: white;
  animation: neon 30ms cubic-bezier(0.075, 0.82, 0.165, 1) alternate-reverse infinite;
  border-radius: 0px 10px 10px 0px;
}

@keyframes neon {
  0% {
    box-shadow: 0px 0px 5px white, 0px 0px 20px rgb(141, 187, 255);
    }
  25% {
    box-shadow: 0px 0px 2px white, 0px 0px 5px rgb(0, 102, 128);
  }
  50% {
    box-shadow: 0px 0px 7px white, 0px 0px 22px rgb(50, 44, 231);
  }
  75% {
    box-shadow: 0px 0px 3px white, 0px 0px 16px rgb(0, 115, 128);
  }
  100% {
    box-shadow: 0px 0px 6px white, 0px 0px 14px rgb(47, 0, 255);
  }
}

</style>
