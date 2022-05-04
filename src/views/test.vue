<template>
  <div class="progressBar"></div>
  <h1>Test</h1>
  <Question :key="componentKey" :test="test" @submit-answer="submit" />
</template>

<script setup>
// VUEX && UTILS
import { useTestStore } from "../stores/Test";
import { computed, onMounted, ref } from "vue";

// COMPONENTS
import Question from "../components/Question.vue";

let componentKey = ref(0);
const testStore = useTestStore();
const test = computed(() => testStore.testArray.at(testStore.testCounter));
const testLength = computed(() => testStore.testArray.length);
const progressWidth = computed(() => (100 / testLength) * testStore.testCounter + '%');

const submit = () => {
  testStore.testCounter += 1;
  componentKey.value += 1;
};
</script>

<style lang="scss" scoped>
.progressBar--wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: v-bind(progressWidth);
  height: 10px;
  background: white;
  box-shadow: 0px 0px 5px white, 0px 0px 20px green;
}
</style>
