<template>
  <section class="feedback__wrapper">
    <div id="feedback" :class="color">{{ message }}</div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';


const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
});

const { color, message } = props;

onMounted(() => {
    const cardWrapper = document.querySelector(".card--wrapper");
    const card = document.querySelector(".card");

    cardWrapper.classList.remove(`wrapper--neutral`);
    card.classList.remove(`card--neutral`);
    cardWrapper.classList.add(`wrapper--${color}`);
    card.classList.add(`card--${color}`);
})
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
  width: 65%;
}

#feedback {
  padding-block: 5vh;
  font-size: 2rem;
  border-radius: 25px;
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
