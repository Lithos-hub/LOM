<template>
  <Progress />
  <Feedback
    :key="COMPONENT_KEY"
    v-if="isShowingFeedback"
    :color="feedbackObject.color"
    :message="feedbackObject.message"
    :correct-answer="test.correctAnswer"
  />
  <Question
    v-if="answeredQuestions <= numOfQuestions"
    :key="COMPONENT_KEY"
    :test="test"
    @submit-answer="submit"
    :is-checking="isChecking"
  />
  <Endgame v-else />
  <router-link to="/tutorial">
    <button class="about__button">Tutorial</button>
  </router-link>
</template>

<script setup>
// VUEX && UTILS
import { useTestStore } from "../stores/Test";
import { computed, ref } from "vue";

// COMPONENTS
import Question from "../components/Question.vue";
import Feedback from "../components/Feedback.vue";
import Endgame from "../components/Endgame.vue";
import Progress from "../components/Progress.vue";

// USES
const testStore = useTestStore();

// REFS
const COMPONENT_KEY = ref(0); // => To force update the component
const isShowingFeedback = ref(false);
const feedbackObject = ref({
  color: "success",
  message: "Testing feedback message",
});
const isChecking = ref(false);

// COMPUTED
const test = computed(() => testStore.testArray.at(testStore.testCounter - 1));
const correctAnswer = computed(() => test.value.correctAnswer);
const selectedAnswer = computed(() => testStore.selectedAnswer);
const numOfQuestions = computed(() => testStore.testArray.length);
const answeredQuestions = computed(() => testStore.testCounter);

// METHODS
const goToNextQuestion = () => {
  testStore.selectedAnswer = "";
  testStore.incrementTestCounter();
  COMPONENT_KEY.value += 1;
};

const showFeedback = (color, message) => {
  feedbackObject.value.color = color;
  feedbackObject.value.message = message;
  isShowingFeedback.value = true;
  COMPONENT_KEY.value += 1;

  setTimeout(() => {
    isShowingFeedback.value = false;
  }, 3000);
};

const submit = () => {
  isChecking.value = true;
  // ** Here we have to check the answer ** \\
  // If the answer is correct, the user must receive a positive feedback 👍
  // Otherwise, the feedback must be negative 👎 (and mankind will be condemned! 😱 )
  if (correctAnswer.value) {
    if (
      selectedAnswer.value.toLowerCase() === correctAnswer.value.toLowerCase()
    ) {
      showFeedback(
        "success",
        `Congratulations, human. You have passed this question. Let's continue.`
      );
      testStore.incrementPassedQuestions();
    } else {
      showFeedback("error", "You have failed, human. Try the following question.");
    }
  } else {
    showFeedback(
      "success",
      `Good... the game has finished. Let's see the results.`
    );
    testStore.incrementPassedQuestions();
  }
  setTimeout(() => {
    goToNextQuestion();
    isChecking.value = false;
  }, 3000);
};
</script>


<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/app';

.about__button {
  transition: $transitionMid;
  cursor: pointer;
  width: auto;
  padding-inline: 2vw;
  height: 35px;
  position: fixed;
  bottom: 1vh;
  right: 1vw;
  background: none;
  color: white;
  border: none;
  border-block: 1px solid #00d0ff;
  border-inline: 1px solid transparent;


  &:hover {
    background: #404040;
    border-radius: $mainRadius;
    border: 1px solid white;
  }
}
</style>