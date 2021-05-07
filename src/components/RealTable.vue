<template>
  <h2>TABELA VERDADE</h2>
  <div class="scale">
    <form @submit.prevent="handleEnter" class="card shake">
      <div class="inline-between">
        <span for="premises">Premissas simples:</span>
        <input
          placeholder="ex.: ab"
          class="input"
          v-model="premises"
          id="premises"
        />
      </div>

      <div v-if="!!Object.keys(allResults).length">
        <div class="d-flex justify-between pt-10">
          <div class="d-flex f-dir-col justify-between">
            <div
              v-for="existentHeader in Object.keys(allResults)"
              class="d-flex justify-start"
              :key="existentHeader"
            >
              <input
                type="radio"
                :id="existentHeader + 'v1'"
                v-model="value1"
                :value="existentHeader"
              />
              <span :for="existentHeader">{{ existentHeader }}</span
              ><br />
            </div>
          </div>

          <div class="d-flex f-dir-col justify-between ml-20">
            <div
              v-for="operator in operatorsLabeled"
              class="d-flex justify-start"
              :key="operator.id"
            >
              <input
                type="radio"
                :id="operator.id + 'realTable'"
                v-model="selectedOperator"
                :value="operator.id"
              />
              <span :for="operator.id">{{ operator.label }}</span
              ><br />
            </div>
          </div>

          <div class="d-flex f-dir-col justify-between">
            <div
              v-for="existentHeader in Object.keys(allResults)"
              class="d-flex justify-start"
              :key="existentHeader"
            >
              <input
                type="radio"
                :id="existentHeader + 'v2'"
                v-model="value2"
                :value="existentHeader"
              />
              <span :for="existentHeader">{{ existentHeader }}</span
              ><br />
            </div>
          </div>
        </div>

        <div class="my-10 d-flex justify-end">
          <button
            type="button"
            @click="handleAddEquation"
            :disabled="!value1 || !value2"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div class="d-flex">
        <div
          v-for="(values, premise) in allResults"
          :key="premise"
          class="px-10"
        >
          <div class="d-flex f-dir-col">
            <span class="border-bottom p-5">{{ premise }}</span>
            <span v-for="(value, idx) in values" :key="premise + idx">{{
              value ? "V" : "F"
            }}</span>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {
  calcRealtTable,
  getPremiseRealTableByNumber,
} from "../helpers/calcRealTable";
import { operatorsLabeled } from "../helpers/operators";

export default {
  name: "ExcessOf",
  data() {
    return {
      premises: "",
      premisesResult: {},
      equations: [],
      equationsResult: {},
      operatorsLabeled,

      value1: "",
      value2: "",
      selectedOperator: "^",
    };
  },
  computed: {
    allResults() {
      return {
        ...this.premisesResult,
        ...this.equationsResult,
      };
    },
  },
  methods: {
    handleEnter() {
      const spltedPremises = this.premises.split("");
      if (!spltedPremises.length) return;

      this.premisesResult = getPremiseRealTableByNumber(spltedPremises);
    },
    handleAddEquation() {
      const { value1, selectedOperator, value2, equationsResult, premisesResult } = this;

      this.equationsResult = {
        ...equationsResult,
        ...calcRealtTable(premisesResult)([
          { p1: value1, operator: selectedOperator, p2: value2 },
        ]),
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
</style>
