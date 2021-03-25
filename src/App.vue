<template>
  <div class="app-wrapper d-flex justify-around f-wrap">
    <div class="content-spaces">  
      <h2>CONVERTER</h2>
      <form class="card" @change="handleConvertSubmit($event)">
        <div class="d-flex justify-between align-center">
          <label for="2">Binário</label>
          <input class='input' type="number" v-model="binary" id="2">
        </div>
        <div class="pt-10 d-flex justify-between align-center">
          <label for="8">Octadecimal</label>
          <input class='input' type="number" v-model="octal" id="8">
        </div>
        <div class="pt-10 d-flex justify-between align-center">
          <label for="10">Decimal</label>
          <input class='input' type="number" v-model="dec" id="10">
        </div>
        <div class="pt-10 d-flex justify-between align-center">
          <label for="16">Hexadecimal</label>
          <input class='input' type="text" v-model="hexa" id="16">
        </div>
      </form>
    </div>

    <div class="content-spaces">
      <h2>SOMAR</h2>
    <div class="sum-wrappers card">
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
          <input class='input mt-10 mb-10' type="text" v-model="n1">
          <input class='input' type="text" v-model="n2" >
        </div>
        
      </form>
      <span>{{ sumResult }}</span>
    </div>
    </div>

    <div class="content-spaces">
      <Operadores />
    </div>
  </div>
</template>

<script>
import Operadores from './components/Operadores.vue'
import bases from 'base-converter'
import { sumBase } from './helpers/sum.js'

export default {
  name: 'App',
  components: {
    Operadores,
  },
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
body {
  background: #d2bf9e;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.input {
    background: 0 0;
    border: 2px solid #41403e;
    border-bottom-left-radius: 15px 255px;
    border-bottom-right-radius: 225px 15px;
    border-top-left-radius: 255px 15px;
    border-top-right-radius: 15px 225px;
    color: #41403e;
    display: block;
    font-size: 1rem;
    outline: 0;
    padding: .5rem;
    margin-left: 5px;
}
.app-wrapper {
  max-width: 1100px;
  margin: auto;
}
.pt-10 {
  padding-top: 10px;
}
.p-15 {
  padding: 15px;
}
.pr-10 {
  padding-right: 10px;
}
.mt-17 {
  margin-top: 17px;
}
.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}

.m-auto {
  margin: auto;
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
.align-center {
  align-items: center;
}
.as-end {
  align-self: flex-end;
}
.m-reset {
  margin: 0px;
} 
.content-spaces {
  margin-top: 20px;
}

.border {
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e
}
.note {
  background-color: #e6ddd0;
  padding: 1em;
  margin-bottom: 3em;
}
.full-rotate {
  margin: auto;
  /* width: 80vw; */
  /* max-width: 40em; */
  transform: rotate(-3deg);
}
.card { /* card, note, full-rotate */
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border: 2px solid #41403e;

  background-color: #e6ddd0;
  padding: 1em;
  margin-bottom: 3em;

  margin: auto;
  /* width: 80vw; */
  /* max-width: 40em; */
  transform: rotate(-3deg);
}

</style>
