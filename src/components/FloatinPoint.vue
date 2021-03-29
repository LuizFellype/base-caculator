<template>
  <h2>PONTO FLUTUANTE -> BIN</h2>
  <form @change="handleEnter" class="card">
      <div class="d-flex f-dir-col">

        <div class="inline-between">
            <label for="base8">Ponto de flutuante de:</label>
            <input class='input' type="number" v-model="base8" id="base8">
        </div>

        <div class="pt-10 inline-between">
            <label for="result">Flutuante:</label>
            <input class='input' type="text" v-model="result" id="result" >
        </div>
        
        <div class="pt-10 inline-center" v-if="resultFrac">
            <h3 class='result'>{{resultFrac}}</h3>
        </div>
    </div>
  </form>
</template>

<script>
import { floatinPoint, binToDec, binToFloatinPoint } from "../helpers/floatinPoint"

export default {
    name: 'FloatinPoint',
    data() {
        return {
            result: '',
            base8: '',
            resultFrac: '',
        }
    },
    methods: {
        handleEnter(e) {
            // 00111100
            const { id } = e.target
            console.log('e', e)
            if (id === 'result') {
                if (this.result) {
                const resultFrac = binToDec(this.result)
                const base8 = binToFloatinPoint(this.result)
                this.base8 = base8
                this.resultFrac = resultFrac
                return
                }
            }

            const shouldReturn = !this.base8 || this.base8?.length !== 8
            console.log({shouldReturn})
            if (shouldReturn) return 
            const { bin, isPositive } = floatinPoint(this.base8)
            this.result = bin
            
            const resultFrac = binToDec(bin)
            
            this.resultFrac =  `${isPositive ? '' : '-'}${resultFrac}`
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
