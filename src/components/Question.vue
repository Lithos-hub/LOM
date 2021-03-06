<template>
  <div class="expand">
    <div class="wrapper--neutral card--wrapper fixed__midBottom">
      <section class="card--neutral card">
        <div class="card__inner--wrapper">
          <header :class="isChecking ? 'no-opacity' : ''" class="card__title">
            <h3 class="fadeIn--slow">{{ test.question }}</h3>
          </header>
          <div :class="isChecking ? 'no-opacity' : ''" class="card__body">
            <ul v-if="test.answers && test.answers.length">
              <li v-for="answer in test.answers" @click="testStore.setSelectedAnswer(answer)">
                {{ answer }}
              </li>
            </ul>
            <input
              v-else
              v-model="inputAnswer"
              placeholder="Write your answer"
              @input="testStore.setSelectedAnswer(inputAnswer)"
              @change="submitAnswer"
            />
          </div>
          <footer class="card__actions">
            <button
              :class="
                !selectedAnswer || isChecking
                  ? 'card__disabledButton'
                  : 'card__submitButton'
              "
              :disabled="!selectedAnswer || isChecking"
              @click="submitAnswer"
            >
              Submit answer
            </button>
          </footer>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
// VUEX & UTILS
import { useTestStore } from "../stores/Test";
import { onMounted, computed, ref, watch } from "vue";

// PROPS & EMITS
const props = defineProps({
  test: {
    type: Object,
    required: true,
  },
  isChecking: {
    type: Boolean,
    required: true,
  },
});

const { test, isChecking } = props;

const emit = defineEmits(["submitAnswer"]);
const submitAnswer = () => emit("submitAnswer");

// USES
const testStore = useTestStore();

// REFS
const inputAnswer = ref("");

// COMPUTED
const selectedAnswer = computed(() => testStore.selectedAnswer);

// METHODS
const listenSelectAnswer = () => {
  const list = [...document.querySelectorAll("li")];
  let counter = 0;
  if (list.length) {
    list.at(0).style.background = "#304f6020";
    list.forEach((item) => {
      item.addEventListener("click", ({ target }) => {
        list.map((li) => li.classList.remove("selected__item"));
        target.classList.toggle("selected__item");
      });
    });
    window.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp" && counter > 0 && counter <= list.length) {
        counter -= 1;
      }
      if (e.code === "ArrowDown" && counter >= 0 && counter < list.length - 1) {
        counter += 1;
      }
      if (e.code === "ArrowDown" || e.code === "ArrowUp") {
        list.map((li) => (li.style.background = "none"));
        const hoverItemList = list.at(counter);
        hoverItemList.style.background = "#304f6020";
      }
      if (e.code === "Space") {
        list.at(counter).click();
        list.map((li) => li.classList.remove("selected__item"));
        const selectedListItem = list.at(counter);
        selectedListItem.classList.add("selected__item");
      }
      if (e.code === "Enter" && selectedAnswer.value) {
        submitAnswer();
        counter = 0;
      }
    });
  }
};

// WATCHERS
watch(() => isChecking, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    listenSelectAnswer();
  }
});

// LIFECYCLE
onMounted(() => setTimeout(() => listenSelectAnswer(), 500));
</script>

<style lang="scss" scoped>
@import "../scss/app";
@import "../scss/variables";

.wrapper--neutral {
  filter: drop-shadow(0px 5px 8px #00d0ff);
}

.card--neutral {
  border-inline: 5px solid #ffffff;
  border-top: 5px solid #b9c0ca;
  box-shadow: inset 0px 0px 10px cyan;
}
.card--wrapper {
  transition: $transitionMid;
  height: auto;
  width: 85vw;
  animation: expand 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.card {
  position: relative;
  transition: $transitionMid;
  padding-block: 25px;
  background: linear-gradient(
    120deg,
    $mainDark 40%,
    #303030 10%,
    $mainDark 50%
  );
  background-size: 150% 200%;
  background-position: 0px 0px;
  width: 100%;
  border-radius: $mainRadius;
  clip-path: polygon(
    50% 0%,
    95% 0,
    100% 35%,
    100% 70%,
    95% 90%,
    50% 100%,
    5% 90%,
    0% 70%,
    0% 35%,
    5% 0
  );
}

.card__inner--wrapper {
  position: relative;
}

.card__title {
  font-size: 1.5em;
  border-radius: $mainRadius 25px 0px 0px;
  margin-inline: 5vw;
}

.card__body {
  margin: 0 auto;
  min-height: 52vh;
  ul {
    list-style: none;
    padding: 0;
  }

  li {
    transition: all 0.1s ease-out;
    cursor: pointer;
    height: auto;
    padding-block: 25px;
    letter-spacing: 2px;
    margin: 0 auto;
    padding: 0 auto;

    &:hover {
      background: #304f6020;
    }
  }
  input {
    transition: $transitionMid;
    margin-block: 25px;
    background: #304f6020;
    color: cyan;
    caret-color: cyan;
    padding-block: 10px;
    padding-inline: 10px;
    width: 75vw;
    border-radius: $mainRadius;
    border: 2px solid white;
    font-size: 2em;
    text-align: center;

    &:focus {
      outline: 2px solid cyan;
      box-shadow: 0px 0px 2px white, 0px 0px 10px blue;
    }
  }
}

.selected__item {
  animation: pulse 1s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite
    alternate-reverse;
}

.card__actions {
  position: relative;
  width: 100%;
}

.card__actions button {
  position: absolute;
  bottom: -2em;
  left: 0;
  width: 100%;
  padding-block: 30px;
  border-radius: $mainRadius;
}

.card__submitButton {
  cursor: pointer;
  transition: $transitionMid;
  border: 1px solid cyan;
  background: #0e2321;
  color: cyan;

  &:hover {
    border: 1px solid white;
    background: #303030;
    color: white;
    transform: scale(1.1);
  }
}

.card__disabledButton {
  border: 1px solid gray;
  background: #ffffff26;
  color: gray;
}

@keyframes pulse {
  from {
    box-shadow: inset 0px 0px 5px white, 0px 0px 10px cyan;
    background: #00ffff48;
    color: cyan;
  }
  to {
    box-shadow: inset 0px 0px 8px white, 0px 0px 20px rgb(94, 94, 218);
    background: #2f363648;
    color: white;
  }
}

@keyframes expand {
  from {
    width: 0vw;
  }
  to {
    width: 85vw;
  }
}
</style>
