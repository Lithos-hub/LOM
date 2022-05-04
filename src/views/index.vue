<template>
    <div class="start__container">
        <h1 id="start__message"></h1>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

let i = ref(0);

const typeMessage = () => {
    const MSG_HTML = document.querySelector('#start__message');
    const message = `· · · Hi, human. Now, it's your opportunity to save your world. Are you ready? (Press any key to start)`;

    
    if (i.value < message.length) {
        MSG_HTML.innerHTML += message.at(i.value)
        i.value += 1;
        console.log(message.at(i.value))
        setTimeout(typeMessage, 100)
    }
}

onMounted(() => typeMessage());

</script>

<style lang="scss" scoped>

.start__container {
    width: 450px;
    height: auto;
}
</style>