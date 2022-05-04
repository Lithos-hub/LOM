import { defineStore } from "pinia";
import { Test } from "../api/Test";

export const useTestStore = defineStore("useTest", {
  state: () => ({
    testArray: Test,
    testCounter: 0,
  }),
  methods: {
    incrementTestCounter() {
      this.testCounter++;
    },
  },
});
