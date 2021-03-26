<template>
  <div class="app-wrapper d-flex justify-around f-wrap">
    <div class="content-spaces">  
      <h2>CONVERTER</h2>
      <form class="card" @change="handleConvertSubmit($event)">
        <div class="inline-between">
          <label for="2">Binário</label>
          <input class='input' type="number" v-model="binary" id="2">
        </div>
        <div class="pt-10 inline-between">
          <label for="8">Octadecimal</label>
          <input class='input' type="number" v-model="octal" id="8">
        </div>
        <div class="pt-10 inline-between">
          <label for="10">Decimal</label>
          <input class='input' type="number" v-model="dec" id="10">
        </div>
        <div class="pt-10 inline-between">
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
        <div v-if="sumData.result" class="mt-10  result">

          <div  class="d-flex justify-around align-center">
            <h3 class="m-reset">{{ sumData.calc }} </h3>
            <h3 class="m-reset"> = </h3>
            <h3 class="m-reset result">{{sumData.result}}</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="content-spaces">
      <Operadores />
    </div>
    
    <div class="content-spaces">
      <ExcessOf />
    </div>
  </div>
</template>

<script>
import Operadores from './components/Operadores.vue'
import bases from 'base-converter'
import { sumBase } from './helpers/sum.js'
import ExcessOf from './components/ExcessOf.vue'

export default {
  name: 'App',
  components: {
    Operadores,
    ExcessOf,
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
      sumData: {},
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
      const result = sum(this.n1, this.n2)
      
      this.sumData = { calc: `${this.n1} + ${this.n2}`, result }
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

.mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.justify-start {
  justify-content: flex-start;
}
.align-center {
  align-items: center;
}
.center {
  justify-content: center;
  align-items: center;
}
.align-start {
  align-items: flex-start;
}
.as-start {
  align-self: flex-start;
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

.inline-between { 
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.inline-around { 
  display: flex;
  justify-content: space-around;
  align-items: center;
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

.result {
  border-bottom-left-radius: 15px 255px;
  border-bottom-right-radius: 225px 15px;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  transition: all 235ms ease 0s;
  box-shadow: 15px 28px 25px -18px rgb(0 0 0 / 20%);
  transition: all 235ms ease-in-out 0s;
  align-self: center;
  border-right: 1px solid #41403e;
  border-bottom: 1px solid #41403e;
  color: #41403e;
  display: inline-block;
  font-size: 1rem;
  outline: 0;
  padding: .75rem;
  background-image: linear-gradient(to bottom right, transparent -50%, #55acee4f);
  position: relative;
}
.result::after {
  content: '';
  width: 20px;
  height: 2px;
  border-bottom: 1px solid black;
  border-top: 1px solid black;
  position: absolute;
  bottom: 1px;
  right: -9px;
  transform: rotate(-50deg)
}

.info {
  color: #969085
}

</style>
