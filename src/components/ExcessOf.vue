<template>
  <h2>PADRÃO/EXCESSO</h2>
  <div class="scale">
    <form @change="handleEnter" class="card shake">
      <div class="d-flex f-dir-col">
        <div class="inline-between">
          <label for="excessOfId">No excesso de:</label>
          <input class="input" type="number" v-model="excess" id="excessOfId" />
        </div>
        <div class="inline-between pt-10">
          <label for="numberToFindOutId">Qual o bin de:</label>
          <input
            class="input"
            type="number"
            v-model="numberToFind"
            id="numberToFindOutId"
          />
        </div>

        <div class="inline-around" v-if="result && resultBase">
          <label class="info">Resultado na base de {{ resultBase }}</label>
          <h3 class="result">{{ result }}</h3>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { excessOf } from "../helpers/excessOf";
export default {
  name: "ExcessOf",
  data() {
    return {
      excess: "",
      numberToFind: "",
      result: "",
      resultBase: "",
    };
  },
  methods: {
    handleEnter() {
      if (!this.excess || !this.numberToFind) return;

      const { baseOf, bin } = excessOf(
        Number(this.excess),
        Number(this.numberToFind)
      );
      this.result = bin;
      this.resultBase = baseOf;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
