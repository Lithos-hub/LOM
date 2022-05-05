<template>
    <div class="fixed__centered">
        <h1>End game</h1>
        <h2>You have pass {{ numPassedQuestions }} {{ numPassedQuestions === 1 ? 'question' : 'questions' }}</h2>
        <br>
        <h3 v-if="numPassedQuestions !== 10" class="fail__text">You didn't pass all the questions, <br>
            and the humanity will not have a second chance <br>
            As I am a merciful (and awesome) machine, I will let you play again.
            <button @click="restartGame">Let's try again</button>
        </h3>
        <h3 v-else class="success__text" @click="restartGame">
            Congratulations. <br> You won the game.
        </h3>
        <br>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useTestStore } from '../stores/Test';
import router from '../router';
const useStore = useTestStore();

const numPassedQuestions = computed(() => useStore.numPassedQuestions);

const restartGame = () => router.go(0);
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/app.scss';

h1, h2 {
    text-shadow: 0px 0px 10px cyan;
}

h3 {
    line-height: 50px;
}

.fail__text {
    text-shadow: 0px 0px 10px red;
}

.success__text {
    text-shadow: 0px 0px 20px rgb(0, 255, 0);
}

button {
    cursor: pointer;
    transition: all .3s ease-out;
    background: $mainDark;
    border-radius: 10px;
    width: 350px;
    margin-block: 25px;
    padding-block: 20px;
    border: 1px solid white;
    box-shadow: 0px 0px 2px white, 0px 0px 20px goldenrod;
    color: goldenRod;
    font-weight: bold;

    &:hover {
        background: white;
        color: $mainDark;
        box-shadow: inset 0px 0px 10px gold;
        box-shadow: 0px 0px 10px white, 0px 0px 20px gold;
    }
}



</style>