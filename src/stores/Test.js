import { defineStore } from "pinia";
import { Test } from "../api/Test";

export const useTestStore = defineStore("useTest", {
  state: () => ({
    testArray: Test,
    testCounter: 1,
    selectedAnswer: "",
    numPassedQuestions: 0
  }),
  actions: {
    incrementTestCounter() {
      this.testCounter += 1;
    },
    incrementPassedQuestions() {
      this.numPassedQuestions += 1;
    }
  },
});
