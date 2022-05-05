<template>
  <div class="index start__container fixed__centered">
    <h1 id="start__message--primary"></h1>
    <h5 id="start__message--secondary"></h5>
    <h2 class="fadeIn--fast" v-if="x === STAGES.length">
      (Press any key to continue)
    </h2>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import router from "../router";

let i = ref(0);
let x = ref(0);

const route = useRoute();

// Stages array
const STAGES = reactive([
  "MESSAGE_STAGE1",
  "MESSAGE_STAGE2",
  "MESSAGE_STAGE3",
  "MESSAGE_STAGE4",
  "MESSAGE_STAGE5",
  "MESSAGE_STAGE6",
  "MESSAGE_STAGE7",
  "MESSAGE_STAGE8",
  "MESSAGE_STAGE9",
  "MESSAGE_STAGE10",
  "MESSAGE_STAGE11",
  "MESSAGE_STAGE12",
]);

const getStageMessage = (stage) => {
  const stages = {
    ["MESSAGE_STAGE1"]: "█",
    ["MESSAGE_STAGE2"]: "█",
    ["MESSAGE_STAGE3"]: "█",
    ["MESSAGE_STAGE4"]: "█ █ █ █ █ █ S T A R T I N G _ S Y S T E M S █ █ █ █ █ █",
    ["MESSAGE_STAGE5"]: "Loading libraries of human understanding...",
    ["MESSAGE_STAGE6"]: "Subject No. 7,567,234",
    ["MESSAGE_STAGE7"]: "Number of tries: 0",
    ["MESSAGE_STAGE8"]: "Loading language processing libraries...",
    ["MESSAGE_STAGE9"]: "Load complete.",
    ["MESSAGE_STAGE10"]: "Hello, human.",
    ["MESSAGE_STAGE11"]: "Now it is your opportunity to have a second chance.",
    ["MESSAGE_STAGE12"]: "Pass the 10 questions to save your race.",
  };
  return stages[stage];
};

const typeMessage = () => {
  // Typing speed
  let speed = 100;

  // We'll generate two messages depending on the stage
  const MSG_HTML_PRIMARY = document.querySelector("#start__message--primary");
  const MSG_HTML_SECONDARY = document.querySelector(
    "#start__message--secondary"
  );

  // Logic to type the messages
  if (x.value < STAGES.length) {
    let stage = STAGES.at(x.value);
    let message = getStageMessage(stage) + " ".repeat(20);
    if (i.value < message.length) {
      if (x.value < 9) {
        MSG_HTML_SECONDARY.innerHTML += message.at(i.value);
      } else {
        // "Hello, human." message after loading messages
        MSG_HTML_PRIMARY.innerHTML += message.at(i.value);
      }
      i.value += 1;
      // Here, I wanted to speed up on MESSAGE_STAGE1
      setTimeout(typeMessage, x.value === 3 ? speed / 3 : speed);
    }
    // Finally, we clean the HTML and show the next message
    if (i.value === message.length) {
      MSG_HTML_PRIMARY.innerHTML = "";
      MSG_HTML_SECONDARY.innerHTML = "";
      i.value = 0;
      x.value += 1;
    }
  }
};

const listenPressAnyKey = () => {
  const index = document.querySelector('.index');
  index.addEventListener("keydown", (e) => {
    console.log("Pushing to the Test view...");
    router.push("/test");
    e.stopImmediatePropagation();
    e.stopPropagation();
  });
}

watch(() => x.value, (newVal) => {
  if (newVal === STAGES.length - 1) {
    console.log('End of start messages')
    listenPressAnyKey();
  }
});

onMounted(() => {
  typeMessage();
});
</script>

<style lang="scss" scoped>
@import "../scss/app";
.start__container {
  width: 450px;
  height: auto;
}
</style>
