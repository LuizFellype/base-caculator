<template>
  <h2>OPERADORES LÓGICOS</h2>
  <form @change="handleSelection" class="operators-block card">
    <div class="d-flex f-dir-col justify-between">
      <div v-for="(operator) in operators" :key="operator.id">
        <input type="radio" :id="operator.id" v-model="selectedOperator" :value="operator.id">
        <label :for="operator.id">{{ operator.label }}</label><br>
      </div>
    </div>

    <div class="d-flex f-dir-col justify-center align-center">
      <div class="d-flex justify-between align-center w-213 ">
        <div class="d-flex p-15">
          <template v-for="(value, i) in values" :key="i">
            <input type="radio" :id="`value1-${value.id}`" v-model="value1" :value="value.id">
            <label :for="value.id">{{ value.label }}</label><br>
          </template>
        </div>

        <h3>{{selectedOperator}}</h3>
        
        <div class="d-flex p-15">
          <template v-for="(value, i) in values" :key="i">
            <input type="radio" :id="`value2-${value.id}`" v-model="value2" :value="value.id">
            <label :for="value.id">{{ value.label }}</label><br>
          </template>
        </div>
      </div>
      <h3>{{result}}</h3>
    </div>
  </form>
</template>

<script>
const operators = {
  '^':'^',
  'v': 'v',
  '#':'#',
  '->':'->',
  '<->':'<->',
}
export default {
  name: 'Operadores',
  data() {
    return {
      operators: [
        { id: operators['^'], label: '^ (E)' },
        { id: operators['v'], label: 'v (OU inclusivo)' },
        { id: operators['#'], label: '# (OU exclusivo)' },
        { id: operators['->'], label: '-> (Condicional)' },
        { id: operators['<->'], label: '<-> (Bicondicional)' },
      ],
      selectedOperator: '^',

      values: [
        { id: 1, label: 'V' },
        { id: 0, label: 'F' },
      ],
      value1: 0,
      value2: 1,
      result: 'Falso',
    }
  },
  methods: {
    handleSelection() {
      // const { id } = ev.target
      const { value1, value2, selectedOperator } = this
      const checkByOp = {
       [operators['^']]: () => !!(value1 && value2), 
       [operators['v']]:  () => !!(value1 || value2),
       [operators['#']]: () => (value1 && value2) || (!value1 && !value2) ? false : true, 
       [operators['->']]: () => !(value1 && !value2), 
       [operators['<->']]: () => !!(value1 ? value2 : !value2), 
      }
      const result = checkByOp[selectedOperator]()
      this.result = result ? 'Verdade' : 'Falso' 
    
    }
  }
}
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
