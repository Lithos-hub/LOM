<template>
    <div class="card fixed__centered">
        <div class="card__title">
            <h2>{{ test.question }}</h2>
        </div>
        <div class="card__body">
            <ul>
                <li v-for="answer in test.answers">{{ answer }}</li>
            </ul>
        </div>
        <div class="card__actions">
            <button @click="submitAnswer">Submit answer</button>
        </div>
    </div>
</template>

<script setup>
import { useTestStore } from '../stores/Test';
const props = defineProps({
    test: {
        type: Object,
        required: true
    },
})

const { test } = props;

const emit = defineEmits(['submitAnswer']);

const submitAnswer = () => {
    emit('submitAnswer')
}
</script>

<style lang="scss" scoped>
@import '../scss/app.scss';
</style>