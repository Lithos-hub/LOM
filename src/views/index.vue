<template>
  <section class="start__container fixed__centered">
    <h1 id="start__message--primary"></h1>
    <h5 id="start__message--secondary"></h5>
    <h2 class="fadeIn--fast" v-if="x === NUM_STAGES">
      (Press any key to continue)
    </h2>
  </section>
  <p class="fadeIn--slow" v-if="SHOW_SKIPPING_MESSAGE">
    Press any key to skip this secuence
  </p>
</template>

<script setup>
// UTILS
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import router from "../router";
import { useTestStore } from "../stores/Test";

// USES
const route = useRoute();
const testStore = useTestStore();

// REFS
const i = ref(0);
const x = ref(0);
const SKIP_SCREEN_COUNTER = ref(0);
const SHOW_SKIPPING_MESSAGE = ref(false);
const NUM_STAGES = ref(14);

// COMPUTED
const NUM_OF_TRIES = computed(() => testStore.numOfTries);

// METHODS
const getStageMessage = (stage) => {
  const stages = {
    ["MESSAGE_STAGE1"]: "█",
    ["MESSAGE_STAGE2"]: " ",
    ["MESSAGE_STAGE3"]: "█",
    ["MESSAGE_STAGE4"]: " ",
    ["MESSAGE_STAGE5"]: "█",
    ["MESSAGE_STAGE6"]:
      "█ █ █ █ █ █ S T A R T I N G _ S Y S T E M S █ █ █ █ █ █",
    ["MESSAGE_STAGE7"]: "Loading human understanding libraries...",
    ["MESSAGE_STAGE8"]: "Subject No. 7,567,234",
    ["MESSAGE_STAGE9"]: `Number of tries: ${NUM_OF_TRIES.value}`,
    ["MESSAGE_STAGE10"]: "Loading language processing libraries...",
    ["MESSAGE_STAGE11"]: "Load completed.",
    ["MESSAGE_STAGE12"]: "Hello, human.",
    ["MESSAGE_STAGE13"]: "Now it is your opportunity to have a second chance.",
    ["MESSAGE_STAGE14"]: "Pass the 10 questions to save your race.",
  };
  return stages[stage];
};

const typeMessage = () => {
  // Typing speed
  const SPEED = 70;

  // We'll generate two messages depending on the stage
  const MSG_HTML_PRIMARY = document.querySelector("#start__message--primary");
  const MSG_HTML_SECONDARY = document.querySelector(
    "#start__message--secondary"
  );

  // Logic to type the messages
  if (x.value < NUM_STAGES.value && MSG_HTML_PRIMARY && MSG_HTML_SECONDARY) {
    let stage = `MESSAGE_STAGE${x.value + 1}`
    let message = getStageMessage(stage) + " ".repeat(40);
    if (i.value < message.length) {
      if (x.value < 11) {
        MSG_HTML_SECONDARY.innerHTML += message.at(i.value);
      } else {
        // "Hello, human." message after loading messages
        MSG_HTML_PRIMARY.innerHTML += message.at(i.value);
      }
      i.value += 1;
      // Here, I wanted to speed up on MESSAGE_STAGE1
      setTimeout(typeMessage, x.value <= 5 ? SPEED / 3 : SPEED);
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
  window.addEventListener("keydown", () => {
    if (route.path === "/") {
      if (SKIP_SCREEN_COUNTER.value === 0 && x.value < NUM_STAGES.value) {
        SHOW_SKIPPING_MESSAGE.value = true;
        setTimeout(() => {
          SKIP_SCREEN_COUNTER.value += 1;
        }, 1000);
      } else {
        router.push("/test");
      }
    }
  });
  // If the user is using a mobile device:
  window.addEventListener("click", () => {
    if (window.innerWidth < 700 && route.path === "/") {
      if (SKIP_SCREEN_COUNTER.value === 0 && x.value < NUM_STAGES.value) {
        SHOW_SKIPPING_MESSAGE.value = true;
        setTimeout(() => {
          SKIP_SCREEN_COUNTER.value += 1;
        }, 1000);
      } else {
        router.push("/test");
      }
    }
  })
};

// LIFECYCLE
onMounted(() => {
  typeMessage();
  listenPressAnyKey();
});
</script>

<style lang="scss" scoped>
@import "../scss/app";
.start__container {
  width: 100vw;
  height: auto;
}

#start__message--primary {
  text-shadow: 0px 0px 2px white, 0px 0px 10px red, 0px 0px 20px magenta;
}

h2 {
  text-shadow: 0px 0px 2px white, 0px 0px 10px cyan, 0px 0px 20px blue;
}

p {
  position: fixed;
  top: 90vh;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 0px 0px 2px white, 0px 0px 10px cyan;
}
</style>
