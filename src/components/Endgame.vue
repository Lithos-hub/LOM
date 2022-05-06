<template>
  <section class="fixed__centered">
    <h1>End game</h1>
    <h2>
      You have pass {{ numPassedQuestions }}
      {{ numPassedQuestions === 1 ? "question" : "questions" }}
    </h2>
    <br />
    <h3 v-if="numPassedQuestions !== 10" class="fail__text">
      You didn't pass all the questions, <br />
      and the humanity will not have a second chance. <br />
      As I am a merciful (and awesome) machine, I will let you play again.
    </h3>
    <h3 v-else class="success__text" @click="restartGame">
      Congratulations. You won the game. <br />
      Now, you can travel to the past and save the mankind. <br />
      The humanity will have a second chance, but... we both know that we will
      meet again.
    </h3>
    <br />
  </section>
  <button v-if="numPassedQuestions !== 10" class="fixed__nearBottom" @click="restartGame">
    Let's try again
  </button>
</template>

<script setup>
// VUEX & UTILS
import { useTestStore } from "../stores/Test";
import { computed, onMounted } from "vue";
import router from "../router";

// USES
const testStore = useTestStore();

// COMPUTED
const numPassedQuestions = computed(() => testStore.numPassedQuestions);

// METHODS
const restartGame = () => {
  router.go(0);
};

// LIFECYCLE
onMounted(() => testStore.incrementNumOfTries()); // => Wether the user loses or wins, the num of tries will increment
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/app.scss";

h1,
h2 {
  text-shadow: 0px 0px 10px cyan;
}

h3 {
  line-height: 30px;
}

.fail__text {
  text-shadow: 0px 0px 10px red;
}

.success__text {
  text-shadow: 0px 0px 20px rgb(0, 255, 0);
}

button {
  cursor: pointer;
  transition: $transitionMid;
  background: $mainDark;
  border-radius: $mainRadius;
  width: 350px;
  padding-block: 15px;
  border: 1px solid white;
  box-shadow: 0px 0px 2px white, 0px 0px 20px goldenrod;
  color: goldenRod;
  font-weight: bold;

  &:hover {
    background: white;
    color: $mainDark;
    box-shadow: inset 0px 0px 10px gold;
    box-shadow: 0px 0px 10px white, 0px 0px 20px gold;
  }
}
</style>
