<template>
  <section class="tutorial">
    <h1>Tutorial and controls:</h1>
    <hr />
    <h3>
      This game consists of answering ten questions that resolve around the
      theme of artificial intelligence.
    </h3>
    <h3>
      There are three different question types:
    </h3>
      <ul class="ul--wrapper">
        <li class="d-flex options__li">
            <p>
                Four options:
            </p>
          <ul class="options__ul">
            <li v-for="i in 4">{{ i }}</li>
          </ul>
        </li>
        <li class="d-flex options__li">
            <p>
                True or False
            </p>
          <ul class="options__ul">
            <li>True</li>
            <li>False</li>
          </ul>
        </li>
        <li class="d-flex options__li">
            <p>
                Write the answer
            </p>
          <ul class="options__ul">
            <li><input value="My answer" /></li>
          </ul>
        </li>
      </ul>
    <h3>
      You can use your mouse to click on the option list and click on the Submit
      button to answer the question.
    </h3>
    <h3>
      If you prefer, you can use the arrow direction keys (▲ and ▼) to focus an
      option Space to select an option, and Enter to send the answer.
    </h3>
    <h3>The Enter key can also be used when the answer must be written.</h3>
    <button @click="comeback">Comeback</button>
  </section>
</template>

<script setup>
// UTILS
import router from "../router";
// METHODS
const comeback = () => router.go(-1);
</script>

<style lang="scss" scoped>
@import '../scss/variables';
@import '../scss/app';

h3 {
  margin-block: 2em;
}

.ul--wrapper {
  justify-content: space-around;
  margin: 0 auto;
  padding: 0;

  li {
    width: auto;
    margin-inline: 15px;
  }
}

ul {
  list-style: none;

  li {
    background: #303030;
    margin-block: 10px;
    width: 100%;
    border-radius: $mainRadius;
    padding: 10px;
    text-shadow: 0px 0px 2px white, 0px 0px 15px gold;

    p {
      margin-block: auto;
    }
  }
}

button {
  transition: $transitionMid;
  cursor: pointer;
  background: none;
  border: 2px solid cyan;
  border-radius: $mainRadius;
  width: 350px;
  padding: 20px;
  color: cyan;

  &:hover {
    background: #303030;
    color: white;
  }
}

.options__li {
  justify-content: space-around;

  p {
    min-width: 35wv;
    padding-inline: 25px;
  }
}
.options__ul {
    background: #505050;
    border-radius: $mainRadius;
    padding-inline: 0;
    width: 100%;
    margin-block: auto;

    li {
      transition: $transitionMid;

      &:hover {
        cursor: pointer;
      background: #202020;
      }
    }
}

input {
    transition: $transitionMid;
    margin-block: 10px;
    background: #304f6020;
    color: cyan;
    caret-color: cyan;
    padding-block: 15px;
    padding-inline: 10px;
    width: 80%;
    border-radius: $mainRadius;
    border: 2px solid white;
    font-size: 16px;
    text-align: center;

  &:focus {
    outline: none;
  }
}

@media only screen and (min-width: 360px) {
  .ul--wrapper {
    display: block;
  }
}

@media only screen and (min-width: 760px) {
  .ul--wrapper {
    display: flex;
  }
}

</style>
