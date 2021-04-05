<template>
  <h2>CONVERTER</h2>
  <div class="scale">
    <form class="card shake" @change="handleConvertSubmit($event)">
      <div class="inline-between">
        <label for="2">Binário</label>
        <input class="input" type="number" v-model="binary" id="2" />
      </div>
      <div class="pt-10 inline-between">
        <label for="8">Octadecimal</label>
        <input class="input" type="number" v-model="octal" id="8" />
      </div>
      <div class="pt-10 inline-between">
        <label for="10">Decimal</label>
        <input class="input" type="text" v-model="dec" id="10" />
      </div>
      <div class="pt-10 inline-between">
        <label for="16">Hexadecimal</label>
        <input class="input" type="text" v-model="hexa" id="16" />
      </div>
      <div class="pt-10 inline-between">
        <label for="floatBin">Binário flutuante</label>
        <input class="input" type="number" v-model="floatBin" id="floatBin" />
      </div>
    </form>
  </div>
</template>

<script>
import bases from "base-converter";
import { binToDec } from "../helpers/floatinPoint.js";

export default {
  name: "ConvertBases",
  data() {
    return {
      binary: "",
      octal: "",
      dec: "",
      hexa: "",
      floatBin: "",
    };
  },
  methods: {
    handleConvertSubmit(ev) {
      ev.preventDefault();
      const { id, value } = ev.target;
      if (id === "floatBin") {
        const decFrac = binToDec(value);
        // this.floatResult = decFrac
        this.dec = decFrac;
        return;
      }
      const convertByBase = {
        2: () => {
          const dec = bases.binToDec(value);
          const octal = bases.decToOct(dec);
          const hexa = bases.decToHex(dec);

          this.octal = octal;
          this.dec = dec;
          this.hexa = hexa;
        },
        8: () => {
          const dec = bases.octToDec(value);
          const bin = bases.decToBin(dec);
          const hexa = bases.decToHex(dec);

          this.binary = bin;
          this.dec = dec;
          this.hexa = hexa;
        },
        10: () => {
          const bin = bases.decToBin(Number(value));
          const octal = bases.decToOct(Number(value));
          const hexa = bases.decToHex(Number(value));

          this.binary = bin;
          this.octal = octal;
          this.hexa = hexa;
        },
        16: () => {
          const dec = bases.hexToDec(value);
          const octal = bases.decToOct(dec);
          const bin = bases.decToBin(dec);

          this.binary = bin;
          this.octal = octal;
          this.dec = dec;
        },
      };

      convertByBase[id]();
      this.floatBin = "";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
