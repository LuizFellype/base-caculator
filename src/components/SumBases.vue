<template>
  <h2 class='neucha'>SOMAR</h2>
  <div class="scale">
    <div class="sum-wrappers card shake">
      <div class="d-flex justify-center">
        <select class="input" name="bases" id="bases" v-model="base">
          <option value="2">Binario</option>
          <option value="8">Octal</option>
          <option value="10">Decimal</option>
          <option value="16">Hexa</option>
        </select>
      </div>

      <form class="pt-10 d-flex justify-center" @change="handleBaseSum">
        <h3 class="m-reset as-end pr-10">+</h3>
        <div class="d-flex f-dir-col">
          <input class="input mt-10 mb-10" type="text" v-model="n1" />
          <input class="input" type="text" v-model="n2" />
        </div>
      </form>
      <div v-if="sumData.result" class="mt-10 result">
        <div class="d-flex justify-around align-center">
          <h3 class="m-reset">{{ sumData.calc }}</h3>
          <h3 class="m-reset">=</h3>
          <h3 class="m-reset result">{{ sumData.result }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { sumBase } from '../helpers/sum.js'

export default {
  name: "SumBases",
  data() {
    return {
      base: "2",
      n1: "",
      n2: "",
      sumData: {},
    };
  },
  watch: {
    base() {
      this.n1 = "";
      this.n2 = "";
    },
  },
  methods: {
    handleBaseSum(ev) {
      ev.preventDefault();
      if (!this.n1 || !this.n2) return;

      const sum = sumBase(this.base);
      const result = sum(this.n1, this.n2);

      this.sumData = { calc: `${this.n1} + ${this.n2}`, result };
      this.n1 = "";
      this.n2 = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
