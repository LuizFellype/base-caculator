<template>
  <h2>PADRÃO BITS -> FLUTUANTE</h2>
  <form @change="handleEnter" class="card">
      <div class="d-flex f-dir-col">

        <div class="inline-between">
            <label for="base8">Ponto de flutuante de:</label>
            <input class='input' type="number" v-model="base8" id="base8">
        </div>

        <div class="pt-10 inline-between">
            <label for="result">Flutuante:</label>
            <input class='input' type="text" v-model="result" id="result" disabled>
        </div>

    </div>
  </form>
</template>

<script>
import { floatinPoint } from "../helpers/floatinPoint";
export default {
    name: 'FloatinPoint',
    data() {
        return {
            result: '',
            base8: '',
        }
    },
    methods: {
        handleEnter() {
            // if (!this.excess || !this.numberToFind) return
            
            const { bin } = floatinPoint(this.base8)
            this.result = bin
            // this.resultBase = baseOf
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
