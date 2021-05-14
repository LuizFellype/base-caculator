<template>
  <h2>APÊNDICE C</h2>
  <div class="scale">
    <form class="card shake" @submit.prevent="handleEnter">
      <div class="d-flex align-center">
        <label for="apCCommand">Apêndice C</label>
        <input class="input" type="text" v-model="apCCommand" id="apCCommand" />
      </div>

      <div v-if="commandTranslation">
        <h3 class="result">
          {{ commandTranslation }}
        </h3>
      </div>
    </form>
  </div>
</template>

<script>
import { translateApC } from "../helpers/apendiceC.js";

export default {
  name: "ConvertBases",
  data() {
    return {
      apCCommand: "",
      commandTranslation: "",
    };
  },
  methods: {
    handleEnter() {
      if (!this.apCCommand || this.apCCommand.length != 4) return;
      const commandTranslated = translateApC(this.apCCommand.toUpperCase());

      this.commandTranslation = commandTranslated;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
