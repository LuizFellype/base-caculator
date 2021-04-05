<template>
  <div class="app-wrapper d-flex justify-around f-wrap">
    <div class="content-spaces">  
      <ConvertBases />
    </div>

    <div class="content-spaces">
     <Sum />
    </div>

    <div class="content-spaces">
      <Operadores />
    </div>
    
    <div class="content-spaces">
      <ExcessOf />
    </div>

    <div class="content-spaces">
      <FloatinPoint />
    </div>
  </div>
</template>

<script>
import Operadores from './components/Operadores.vue'
import ExcessOf from './components/ExcessOf.vue'
import FloatinPoint from './components/FloatinPoint.vue'
import Sum from './components/Sum.vue'
import ConvertBases from './components/ConvertBases.vue'

export default {
  name: 'App',
  components: {
    Operadores,
    ExcessOf,
    FloatinPoint,
    Sum,
    ConvertBases,
  },
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
  padding-bottom: 50px
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
.inline-center { 
  display: flex;
  justify-content: center;
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

/* EFFECTS */
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  /* transform: translate3d(0, 0, 0); */
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.scale {
  animation: floatingEffect .3s ease-in;
  backface-visibility: hidden;
}

@keyframes floatingEffect {
  0% {
    transform: scale(0) rotateZ(360deg)
  }
  99% {
    transform: scale(1.1) rotateZ(0deg)
  }
  100% {
    transform: scale(1)
  }
}


</style>
