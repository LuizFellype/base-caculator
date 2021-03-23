<template>
  <div class="two-blocks-wrapper d-flex justify-around f-wrap">
    <form class="convert-block" @change="handleConvertSubmit($event)">
      <h2>CONVERTER</h2>
      <div class="d-flex justify-between">
        <label for="2">Binário</label>
        <input type="number" v-model="binary" id="2">
      </div>
      <div class="d-flex justify-between">
        <label for="8">Octadecimal</label>
        <input type="number" v-model="octal" id="8">
      </div>
      <div class="d-flex justify-between">
        <label for="10">Decimal</label>
        <input type="number" v-model="dec" id="10">
      </div>
      <div class="d-flex justify-between">
        <label for="16">Hexadecimal</label>
        <input type="text" v-model="hexa" id="16">
      </div>
    </form>

    <div class="sum-wrapper">
      <h2>SOMAR</h2>
      <select name="bases" id="bases" v-model="base">
        <option value="2">Binario</option>
        <option value="8">Octal</option>
        <option value="10">Decimal</option>
        <option value="16">Hexa</option>
      </select>

      <form class="sum-fields d-flex justify-center" @change="handleBaseSum"> 
        <h3>+</h3>
        <div class="d-flex f-dir-col">
          <input type="text" v-model="n1">
          <input type="text" v-model="n2" >
        </div>
        
      </form>
      <span>{{ sumResult }}</span>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import bases from 'base-converter'
import { sumBase } from './helpers/sum.js'

export default {
  name: 'App',
  data() {
    return {
      binary: '',
      octal: '',
      dec: '',
      hexa: '',

      base: '2',
      n1: '',
      n2: '',
      sumResult: '',
    }
  },
  watch: {
    base() {
      this.n1 = ''
      this.n2 = ''
    }
  },
  methods: {
    handleConvertSubmit(ev) {
      ev.preventDefault()
      const { id, value } = ev.target
      const convertByBase = {
        2: () => {
          const dec = bases.binToDec(value)
          const octal = bases.decToOct(dec)
          const hexa = bases.decToHex(dec)

          this.octal = octal
          this.dec = dec
          this.hexa = hexa
        },
        8: () => {
          const dec = bases.octToDec(value)
          const bin = bases.decToBin(dec)
          const hexa = bases.decToHex(dec)

          this.binary = bin
          this.dec = dec
          this.hexa = hexa
        },
        10: () => {
          const bin = bases.decToBin(Number(value))
          const octal = bases.decToOct(Number(value))
          const hexa = bases.decToHex(Number(value))
          
          this.binary = bin 
          this.octal = octal
          this.hexa = hexa
        },
        16: () => {
          const dec = bases.hexToDec(value)
          const octal = bases.decToOct(dec)
          const bin = bases.decToBin(dec)
        
          this.binary = bin
          this.octal = octal
          this.dec = dec
        },
      }
      
      convertByBase[id]()
    },

    handleBaseSum(ev) {
      ev.preventDefault()
      if (!this.n1 || !this.n2) return
      
      const sum = sumBase(this.base)
      const sumResult = sum(this.n1, this.n2)
      
      this.sumResult = `${this.n1} + ${this.n2} = ${sumResult}`
      this.n1 = ''
      this.n2 = ''
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.two-blocks-wrapper {
  max-width: 1100px;
  margin: auto;
}
.sum-fields {
  padding-top: 10px;
}

.d-flex {
  display: flex;
}
.f-dir-col {
  flex-direction: column;
}
.f-wrap {
  flex-wrap: wrap;
}

.justify-around {
  justify-content: space-around;
}
.justify-between {
  justify-content: space-between;
}
.justify-center {
  justify-content: center;
}
</style>
