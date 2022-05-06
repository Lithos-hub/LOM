import { defineStore } from "pinia";
import { Test } from "../api/Test";

export const useTestStore = defineStore("useTest", {
  state: () => ({
    testArray: Test,
    testCounter: 1,
    selectedAnswer: "",
    numPassedQuestions: 0,
    numOfTries: parseInt(localStorage.getItem("numOfTries")) || 0,
  }),
  actions: {
    setSelectedAnswer(answer) {
      this.selectedAnswer = answer;
    },
    incrementTestCounter() {
      this.testCounter += 1;
    },
    incrementPassedQuestions() {
      this.numPassedQuestions += 1;
    },
    incrementNumOfTries() {
      this.numOfTries += 1;
      localStorage.setItem("numOfTries", this.numOfTries);
    }
  },
});
