<template>
  <body>
    <main>
      <div @click="keyboardKeypress($event)" class="keyboard noselect">
        <div class="numbers">
          <div class="key"><span>1</span></div>
          <div class="key"><span>2</span></div>
          <div class="key"><span>3</span></div>
          <div class="key"><span>4</span></div>
          <div class="key"><span>5</span></div>
          <div class="key"><span>6</span></div>
          <div class="key"><span>7</span></div>
          <div class="key"><span>8</span></div>
          <div class="key"><span>9</span></div>
          <div class="key"><span>0</span></div>
          <div class="key del"><span>⌫</span></div>
        </div>
        <div class="qwerty">
          <div class="key lttr"><span>q</span></div>
          <div class="key lttr"><span>w</span></div>
          <div class="key lttr"><span>e</span></div>
          <div class="key lttr"><span>r</span></div>
          <div class="key lttr"><span>t</span></div>
          <div class="key lttr"><span>y</span></div>
          <div class="key lttr"><span>u</span></div>
          <div class="key lttr"><span>ı</span></div>
          <div class="key lttr"><span>o</span></div>
          <div class="key lttr"><span>p</span></div>
          <div class="key lttr"><span>ğ</span></div>
          <div class="key lttr"><span>ü</span></div>
        </div>
        <div class="asdf">
          <div class="key lttr"><span>a</span></div>
          <div class="key lttr"><span>s</span></div>
          <div class="key lttr"><span>d</span></div>
          <div class="key lttr"><span>f</span></div>
          <div class="key lttr"><span>g</span></div>
          <div class="key lttr"><span>h</span></div>
          <div class="key lttr"><span>j</span></div>
          <div class="key lttr"><span>k</span></div>
          <div class="key lttr"><span>l</span></div>
          <div class="key lttr"><span>ş</span></div>
          <div class="key lttr"><span>i</span></div>
        </div>
        <div class="zxcv">
          <div class="key lttr"><span>z</span></div>
          <div class="key lttr"><span>x</span></div>
          <div class="key lttr"><span>c</span></div>
          <div class="key lttr"><span>v</span></div>
          <div class="key lttr"><span>b</span></div>
          <div class="key lttr"><span>n</span></div>
          <div class="key lttr"><span>m</span></div>
          <div class="key lttr"><span>ö</span></div>
          <div class="key lttr"><span>ç</span></div>
          <div class="key lttr"><span>.</span></div>
        </div>
      </div>
    </main>
</body>
</template>

<script>
export default {
  methods: {
    keyboardKeypress($event) {
      if (!$event.target.classList.contains('key') && !$event.target.closest('.key')) return

      const PRESSED_KEY = $event.target.classList.contains('key') ?
      $event.target.textContent : $event.target.closest('.key').textContent

      if (PRESSED_KEY === undefined) return

      const INPUT_FIELD = document.querySelector('#listSearch')

      // Menü önizleme kısmı
      // const PREVIEW_INFO = document.querySelector('#searchInput_List')

      if (PRESSED_KEY === '⌫') {
        INPUT_FIELD.value = INPUT_FIELD.value.substring(0, INPUT_FIELD.value.length - 1)

        // Menü önizleme kısmını güncelle
        // PREVIEW_INFO.textContent = `${INPUT_FIELD.value}`
        INPUT_FIELD.focus();
        
        INPUT_FIELD.dispatchEvent(new Event('input'));
        return
      }
      
      INPUT_FIELD.value += PRESSED_KEY
      INPUT_FIELD.dispatchEvent(new Event('input'));

      // Menü önizleme kısmını güncelle
      // PREVIEW_INFO.textContent = `${INPUT_FIELD.value}`
      // INPUT_FIELD.focus();
      
    }
  }
}
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
    bottom: -1rem;
    width: auto;
    height: auto;
  }

  .keyboard{
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    padding: 0 1rem;
    position:relative;
    width: 100vw;
    height: 15rem;
    grid-gap: .3rem;
    // background: $main;
    text-align: center;

    .numbers {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      grid-gap: .2rem;
    }

    .qwerty {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-gap: .2rem;
    }

    .asdf {
      display: grid;
      grid-template-columns: repeat(11, 1fr);
      grid-gap: .2rem;
    }

    .zxcv {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
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

  .input:after {
    animation-name: cursor;
    animation-duration: 450ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-delay: 2s;
  }

  @keyframes cursor {
    0%   {opacity: 0}
    100% {opacity: .5}
  }
</style>