<template>
  <h2>OPERADORES LÓGICOS</h2>
  <div class="scale">
    <form @change="handleSelection" class="operators-block card shake">
      <div class="d-flex f-dir-col justify-between">
        <div v-for="operator in operators" :key="operator.id">
          <input
            type="radio"
            :id="operator.id"
            v-model="selectedOperator"
            :value="operator.id"
          />
          <label :for="operator.id">{{ operator.label }}</label
          ><br />
        </div>
      </div>

      <div class="d-flex f-dir-col justify-center align-center">
        <div class="d-flex justify-between align-center w-213">
          <div class="d-flex p-15">
            <template v-for="(value, i) in values" :key="i">
              <input
                type="radio"
                :id="`value1-${value.id}`"
                v-model="value1"
                :value="value.id"
              />
              <label :for="value.id">{{ value.label }}</label
              ><br />
            </template>
          </div>

          <h3>{{ selectedOperator }}</h3>

          <div class="d-flex p-15">
            <template v-for="(value, i) in values" :key="i">
              <input
                type="radio"
                :id="`value2-${value.id}`"
                v-model="value2"
                :value="value.id"
              />
              <label :for="value.id">{{ value.label }}</label
              ><br />
            </template>
          </div>
        </div>

        <h3 class="result">{{ result }}</h3>
      </div>
    </form>
  </div>
</template>

<script>
import { operatorsLabeled, operatePortLogic } from '../helpers/operators'

export default {
  name: "Operadores",
  data() {
    return {
      operators: operatorsLabeled,
      selectedOperator: "^",

      values: [
        { id: 1, label: "V" },
        { id: 0, label: "F" },
      ],
      value1: 0,
      value2: 1,
      result: "Falso",
    };
  },
  methods: {
    handleSelection() {
      // const { id } = ev.target
      const { value1, value2, selectedOperator } = this;
      const result = operatePortLogic(value1, selectedOperator, value2);

      this.result = result ? "Verdade" : "Falso";
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.operators-block {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  text-align: initial;
  width: 373px;
}
.w-213 {
  width: 213px;
}
</style>
