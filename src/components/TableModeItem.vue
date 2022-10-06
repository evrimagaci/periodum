<template>
  <div @click="toggleModal($event)" class="container"
   :class="{
    'uncertain':  heatState('uncertain', element),
    'solid':      heatState('solid', element),
    'liquid':     heatState('liquid', element),
    'gas':        heatState('gas', element),
  }">
    <div class="flex-between">
      <div
        class="number"
        :class="{'colored flex-between': heat_view === false}">
          <p> {{ element.number }} </p>
      </div>
      
      <img v-show="heat_view"
      class="fade heatState"
      :src="displayHeatState(element)"
      />
    </div>
    
    <div class="symbol" :class="{'colored': heat_view === false}">{{ element.symbol }}</div>
    <div class="name" :class="{'colored': heat_view === false}"> {{ element.name_tr }} </div>
    <div class="atomic" :class="{'colored': heat_view === false}">{{ element.atomic_mass }}</div>
    <span class="block inactive">{{ element.block }}</span>
    <span class="category inactive">{{ element.category }}</span>
    <span class="name_en inactive">{{ element.name_en }}</span>
  </div>
</template>

<script>
  export default {
    props: { element: Object, heat_value: [Number, String], heat_changed: Boolean, heat_view: Boolean },
    data() {
      const elementCategory = this.element.category
      const categoryColors = {
        'alkali metal': '#ffaf80',          // turuncu
        'alkali metal_shade': '#ef9851',

        'toprak alkali metal': '#80ff8e',   // yeşi
        'toprak alkali metal_shade': '#44e053',

        'geçiş metali': '#ffef80',          // sarı
        'geçiş metali_shade': '#c1b45f',

        'geçiş sonrası metali': '#80d5ff',  // mavi
        'geçiş sonrası metali_shade': '#52c5fe',

        'metalsi': '#8095ff',               // slate
        'metalsi_shade': '#526efe',

        'reaktif ametal': '#ff80d4',        // pembe
        'reaktif ametal_shade': '#fe52c4',

        'soy gaz': '#aa80ff',               // lila
        'soy gaz_shade': '#8b52fe',

        'lantanit': '#c3ff80',              // yeşil
        'lantanit_shade': '#adfe52',

        'aktinit': '#80fffc',               // teal
        'aktinit_shade': '#52fefa',

        'bilinmiyor': '#fff',               // beyaz
        'bilinmiyor_shade': '#e0e0e0'
      }
      return {
        modalViewable: false,
        colorCode: categoryColors[elementCategory] || '#fff',
        colorCodeShaded: categoryColors[elementCategory+'_shade'] || '#fff',
        colorHeat: this.heat_value,
        states: {
          solid:      require("../resources/img/states/solid.svg"),
          liquid:     require("../resources/img/states/liquid.svg"),
          gas:        require("../resources/img/states/gas.svg"),
          uncertain:  require("../resources/img/states/uncertain.svg"),
        }
      }
    },
    methods: {
      toggleModal($event) {
        let eventTarget = $event.target

        if (eventTarget.classList.contains('close-modal') || eventTarget.classList.contains('overlay')) {
          this.modalViewable = false
          return
        }
        
        if (!eventTarget.closest('.block')) return
        this.modalViewable = !this.modalViewable
      },
      toggleInfo($event) {
        let eventTarget = $event.target
        if (eventTarget.classList.contains('close-modal') || eventTarget.classList.contains('overlay')) {
          this.modalViewable = false
          return
        }

        if (eventTarget.classList.contains('modal-open')) return
        if (eventTarget.classList.contains('modal')) return
        if (!eventTarget.closest('.block')) return
        this.modalViewable = false
      },
      heatState(check, element) {
        // element.removeAttribute('class');
        if (check === 'uncertain') {
          if (
            this.heat_view === true && (element.boil_use === '' && element.melt_use === '') ||
            this.heat_view === true && (element.melt_use === '' && this.heat_value <= element.boil_use) ||
            this.heat_view === true && (element.boil_use === '' && this.heat_value <= element.melt_use)
          ) return true
          else return false
        }
        if (check === 'solid') {
          if (
            this.heat_view === true && (element.melt_use !== '' && this.heat_value <= element.melt_use)
          ) return true
          else return false
        }
        if (check === 'liquid') {
          if (
            this.heat_view === true && element.melt_use !== '' && this.heat_value >= element.melt_use
          ) return true
          else return false
        }
        if (check === 'gas') {
          if (
            this.heat_view === true && element.boil_use !== '' && this.heat_value >= element.boil_use
          ) return true
          else return false
        }
      },
      displayHeatState(element) {
        if (this.heat_view)
        {
          let result = '' 
          if ((element.boil_use === '' && element.melt_use === '') || (element.melt_use === '' && this.heat_value <= element.boil_use) || (element.boil_use === '' && this.heat_value <= element.melt_use)) result = this.states.uncertain // `Belirsiz`;
          if (element.melt_use !== '' && this.heat_value <= element.melt_use) result = this.states.solid // `🪨`
          if (element.melt_use !== '' && this.heat_value >= element.melt_use) result = this.states.liquid // `💦`
          if (element.boil_use !== '' && this.heat_value >= element.boil_use) result = this.states.gas // `♨️`
          return result
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    height: 4.2vmax;
    width: 4.2vmax;
    
    border: 1px solid #1d232f;
    border-radius: .3rem;
    
    background: rgb(39,47,63);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    /* color: whitesmoke; */
    padding: .3vw;
    
    justify-self: flex-start;
    margin-top: -.13vw;

    filter: drop-shadow(0 0 1px rgba($color: #000000, $alpha: .5));

    &:hover {
      filter: drop-shadow(0 0 .2rem v-bind(colorCode));
      cursor: pointer;
    }
    &:active {
      filter: drop-shadow(0 0 .5rem v-bind(colorCode));
    }
  }
  .uncertain {
    // color: black;
    border-radius: 4px;
    // box-shadow: 0px 0px .2vmin .1vmin #c7732f;
    // background-image: linear-gradient(135deg, #c7732f, #ed954b 100%);
    color: #ee9038;
  }
  .solid {
    // color: black;
    border-radius: 4px;
    // box-shadow: 0px 0px .2vmin .1vmin #d5b7ff;
    // background-image: linear-gradient(135deg, #d5b7ff, rgba(185, 148, 250, 0.4));
    color: #acbdff;
  }
  .liquid {
    // color: black;
    border-radius: 4px;
    // box-shadow: 0px 0px .2vmin .1vmin #acbdff;
    // background-image: linear-gradient(135deg, #acbdff, rgba(136, 158, 255, 0.4));
    color: #46b4b2;
  }
  .gas {
    // color: black;
    border-radius: 4px;
    // box-shadow: 0px 0px .2vmin .1vmin #46b4b2;
    // background-image: linear-gradient(135deg, #46b4b2, #56d9d7);
    color: #eb61b1;
  }
  
  .colored {
    color: v-bind(colorCode);
  }
  
  .glow {
    box-shadow: 0 0 40px 0 rgba($color: #fff, $alpha: .3);
  }

  .highlight {
    background: v-bind(colorCode);
    background-image: linear-gradient(127deg, v-bind(colorCode) 46%, v-bind(colorCodeShaded) 100%);
    // filter: drop-shadow(0 0 0 1rem v-bind(colorCode));
    color: black;
    z-index: 99999;
  }

  .number {
    font-weight: bolder;
    font-size: .5vw;
    margin-top: .2vh;
    opacity: .7;
  }

  .symbol {
    font-size: 1vmax;
    font-weight: bold;
    letter-spacing: normal;
    filter: drop-shadow(0 0 5px rgba(255,255,255, .2));
  }
  .name {
    /* color: white; */
    text-align: left;
    margin-top: -.2vh;
    // color: white;
    font-size: .52vw;
    opacity: .8;
  }
  
  .atomic {
    float: left;
    font-weight: 100;
    /* color: #e9e9e9; */
    font-size: .5vw;
    opacity: .6;
    
    /* text-shadow: 0 0 .1em v-bind(colorCode); */
  }
  
  .heatState {
    display: inline-block;
    position: static;
    width: .7vw;
    height: .7vw;
  }
  
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .text-left {
    text-align: left;
  }
  .text-justify {
    text-align:justify;
  }
  .muted {
    opacity: .5;
  }
</style>