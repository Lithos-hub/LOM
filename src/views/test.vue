<template>
  <Progress />
  <Feedback
    :key="componentKey"
    v-if="isShowingFeedback"
    :color="feedbackObject.color"
    :message="feedbackObject.message"
  />
  <Question
    v-if="answeredQuestions <= numOfQuestions"
    :key="componentKey"
    :test="test"
    @submit-answer="submit"
    :is-checking="isChecking"
  />
  <Endgame v-else />
  <router-link to="/about">
    <button class="about__button">About</button>
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

// STORE USES
const testStore = useTestStore();

let componentKey = ref(0); // => To force update the component
const test = computed(() => testStore.testArray.at(testStore.testCounter - 1));
const correctAnswer = computed(() => test.value.correctAnswer);
const selectedAnswer = computed(() => testStore.selectedAnswer);
const numOfQuestions = computed(() => testStore.testArray.length);
const answeredQuestions = computed(() => testStore.testCounter);

const isShowingFeedback = ref(false);
const feedbackObject = ref({
  color: "success",
  message: "Testing feedback message",
});
const isChecking = ref(false);

const goToNextQuestion = () => {
  testStore.selectedAnswer = "";
  testStore.incrementTestCounter();
  componentKey.value += 1;
};

const showFeedback = (color, message) => {
  feedbackObject.value.color = color;
  feedbackObject.value.message = message;
  isShowingFeedback.value = true;
  componentKey.value += 1;

  setTimeout(() => {
    isShowingFeedback.value = false;
  }, 3000);
};

const submit = () => {
  isChecking.value = true;
  console.log("Checking answer...");
  console.log("My answer ==> ", selectedAnswer.value);
  console.log("Correct ==> ", correctAnswer.value);
  // ** Here we have to check the answer ** \\
  // If the answer is correct, the user must receive a positive feedback 👍
  // Otherwise, the feedback must be negative 👎 (and mankind will be condemned! 😱 )
  if (correctAnswer.value) {
    if (
      selectedAnswer.value.toLowerCase() === correctAnswer.value.toLowerCase()
    ) {
      showFeedback(
        "success",
        `Congratulations, human. You have pass this question. Let's continue.`
      );
      testStore.incrementPassedQuestions();
    } else {
      showFeedback("error", "You failed, human. Try the following question.");
    }
  } else {
    showFeedback(
      "success",
      `Good. The humanity will have a second chance, but... we both know that we will meet again.`
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

.about__button {
  transition: all .3s ease-out;
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
    border-radius: 25px;
    border: 1px solid white;
  }
}
</style>