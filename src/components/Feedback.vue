<template>
  <section class="feedback__wrapper">
    <div id="feedback" :class="color">
      <h3>{{ message }}</h3>
      <div v-if="color === 'error'">
        <h4>The correct answer was: <br> {{ correctAnswer }}</h4>
      </div>
    </div>
  </section>
</template>

<script setup>
// UTILS
import { onMounted } from "vue";

// PROPS
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
});

const { color, message } = props;

// LIFECYCLE
onMounted(() => {
  const cardWrapper = document.querySelector(".card--wrapper");
  const card = document.querySelector(".card");

  cardWrapper.classList.remove(`wrapper--neutral`);
  card.classList.remove(`card--neutral`);
  cardWrapper.classList.add(`wrapper--${color}`);
  card.classList.add(`card--${color}`);
});
</script>

<style lang="scss" scoped>
@import "../scss/variables";
@import "../scss/app";

.feedback__wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 65vw;
}

#feedback {
  padding-block: 3vh;
  padding-inline: 3vw;
  font-size: 2rem;
  border-radius: $mainRadius;
  border: 2px solid white;
  font-weight: bold;
  color: white;
}
.success {
  background: $mainDark;
  box-shadow: 0px 0px 2px white, 0px 0px 30px green;
  text-shadow: 0px 0px 10px green;
}
.error {
  background: $mainDark;
  box-shadow: 0px 0px 2px white, 0px 0px 30px red;
  text-shadow: 0px 0px 10px red;
}
</style>
