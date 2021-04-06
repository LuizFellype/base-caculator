<template>
  <h2>MÍN e MÁX</h2>
  <div class="scale">
    <form @change="handleEnter($event)" class="card shake">
      <div class="d-flex f-dir-col">
        <div class="inline-between">
          <label for="excessId">Excesso de:</label>
          <input class="input" type="number" v-model="excess" id="excessId" />
        </div>
        <div class="inline-between pt-10">
          <label for="baseOfId">Base de:</label>
          <input class="input" type="number" v-model="baseOf" id="baseOfId" />
        </div>

        <div class="inline-around" v-if="result">
          <label class="info">Mínimo</label>
          <h3 class="result">{{ result.min }}</h3>
          <label class="info">Máximo</label>
          <h3 class="result">{{ result.max }}</h3>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { minMaxOfExcess, minMaxOfBase } from "../helpers/minMaxOf";

export default {
  name: "MinMaxOf",
  data() {
    return {
      excess: "",
      baseOf: "",
      result: null,
    };
  },
  methods: {
    handleEnter(ev) {
      const { id, value } = ev.target;
      if (!value) return;

      if (id === "excessId") {
        this.baseOf = "";
        this.result = minMaxOfExcess(Number(value));
      } else {
        this.excess = "";
        this.result = minMaxOfBase(Number(value));
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
