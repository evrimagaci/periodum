<template>
  <body>
    <main>
      <div @click="keyboardKeypress($event)" class="keyboard noselect">
        <div class="n789">
          <div class="key"><span>7</span></div>
          <div class="key"><span>8</span></div>
          <div class="key"><span>9</span></div>
          <div class="key plus"><span>+</span></div>
        </div>
        <div class="n456">
          <div class="key"><span>4</span></div>
          <div class="key"><span>5</span></div>
          <div class="key"><span>6</span></div>
          <div class="key minus"><span>-</span></div>
        </div>
        <div class="n123">
          <div class="key"><span>1</span></div>
          <div class="key"><span>2</span></div>
          <div class="key"><span>3</span></div>
          <div class="key del"><span>⌫</span></div>
        </div>
        <div class="n0del">
          <div class="key"><span>.</span></div>
          <div class="key"><span>0</span></div>
          <div class="key send" style="font-size: .1px;"><span>✓</span></div>
        </div>
      </div>
    </main>
</body>
</template>

<script>
export default {
  data() {
    return {
      convertToKelvin: {
        C: 'unit => unit+273.15',
        F: 'unit => (unit+459.67)*5/9'
      }
    }
  },
  methods: {
    formatNumber (value) {
      if (value >= 0.01) {
        return Number(value.toFixed(2))
      } else {
        if (value < 0.00001) {
          return Number.parseFloat(Number(value.toFixed(100)))
          .toExponential() || Number(value.toFixed(2))
        }
        return value
      }
    },
    keyboardKeypress($event) {
      if (!$event.target.classList.contains('key') && !$event.target.closest('.key')) return

      const PRESSED_KEY = $event.target.classList.contains('key') ?
      $event.target : $event.target.closest('.key')

      if (PRESSED_KEY === undefined) return

      const INPUT_FIELD = document.querySelector('#heatinput')

      const repeatedCode = function() {
        INPUT_FIELD.focus();
        INPUT_FIELD.dispatchEvent(new Event('input'));
      }

      if (PRESSED_KEY.classList.contains('del')) {
        // INPUT_FIELD.value = INPUT_FIELD.value.substring(0, INPUT_FIELD.value.length - 1)
        INPUT_FIELD.value = ''
        
        repeatedCode(INPUT_FIELD)
        return
      }
      if (PRESSED_KEY.classList.contains('plus')) {
        INPUT_FIELD.value = Number(INPUT_FIELD.value)+1
        repeatedCode(INPUT_FIELD)
        return
      }
      if (PRESSED_KEY.classList.contains('minus')) {
        INPUT_FIELD.value = Number(INPUT_FIELD.value)-1
        repeatedCode(INPUT_FIELD)
        return
      }
      if (PRESSED_KEY.classList.contains('send')) {
        const SELECTION = document.querySelector('.metricmenu_list').textContent
        const SLIDER = document.querySelector('#heat')
        if (SELECTION === 'C') {
          const toC = eval(this.convertToKelvin.C)
          SLIDER.value = this.formatNumber(toC(Number(INPUT_FIELD.value)))
          SLIDER.dispatchEvent(new Event('input'));
        }
        else if (SELECTION === 'F') {
          const toF = eval(this.convertToKelvin.F)
          SLIDER.value = this.formatNumber(toF(Number(INPUT_FIELD.value)))
          SLIDER.dispatchEvent(new Event('input'));
        }
        else {
          SLIDER.value = +(INPUT_FIELD.value)
          SLIDER.dispatchEvent(new Event('input'));
        }
        
        repeatedCode(INPUT_FIELD)
        return        
      }
      
      INPUT_FIELD.value += PRESSED_KEY.textContent
      INPUT_FIELD.dispatchEvent(new Event('input'));
      
    }
  }
}

        // if (INPUT_FIELD.value === '') {
        //   INPUT_FIELD.value = 0
          
        //   document.querySelector('#list_stateLiquid').classList.add('inactive')
        //   document.querySelector('#list_stateGas').classList.add('inactive')
        //   INPUT_FIELD.focus();
        //   return
        // }
</script>

<style lang="scss" scoped>
  $main: #202734;

  $keyBkg: #343f54;
  $keyBkgHover: #1b212d;
  $keyBkgActive: #e5bb09;
  $keycolor: #e5bb09;
  $light: #7d7b7c;
  $green: #74f583;
  $black: #000;
  $white: #fff;

  *{box-sizing: border-box; outline: 0px;}
  ::-moz-selection {background: transparent;}
  ::selection {background: transparent;}

  body{font-family: "Nunito Sans"; margin: 0px;}
    


  main{
    display: inline-block;
    position: fixed;
    // position: inherit;
    bottom: .5rem;
    width: auto;
    height: auto;
  }

  .keyboard{
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    padding: 0 1rem;
    position:relative;
    width: 100vw;
    height: 13.2rem;
    grid-gap: .3rem;
    // background: $main;
    text-align: center;

    .n789 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: .2rem;
    }

    .n456 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: .2rem;
    }

    .n123 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: .2rem;
    }

    .n0del {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: .2rem;
    }
    
    .key{
      display:block;
      position: relative;
      color: $keycolor;
      border-radius: .3rem;
      background: $keyBkg;
      border: 1px solid rgba($black,.4);
      // box-shadow: 1px 1px 0px 0px rgba($white,.2);
      cursor: pointer;
      align-content: center;
      span {
        font-size: 2rem;
      }
      &:hover{
        background: $keyBkgHover;
      }
      &:active{
        background: $keyBkgActive;
        color: $black;
        font-weight: bold;
      }
    }
  }

  .key{
    transition: .2s ease-out all; 
    -moz-transition: .2s ease-out all; 
    -webkit-transition: .2s ease-out all;
  }

  // .input:after {
  //   animation-name: cursor;
  //   animation-duration: 450ms;
  //   animation-timing-function: linear;
  //   animation-iteration-count: infinite;
  //   animation-direction: alternate;
  //   animation-delay: 2s;
  // }

  @keyframes cursor {
    0%   {opacity: 0}
    100% {opacity: .5}
  }
</style>