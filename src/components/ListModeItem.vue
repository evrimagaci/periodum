<template>
  <div @click="toggleInfo($event)" class="container_List fade"
    :class="{
      'uncertain_list':  heatState('uncertain', element),
      'solid_list':      heatState('solid', element),
      'liquid_list':     heatState('liquid', element),
      'gas_list':        heatState('gas', element),
    }">
    <div class="item noselect">
      <div class="number flex-between fade" v-if="infoViewable === false">
        <p class="number_List">{{ element.number }}</p>
        <h2 class="labels atomic muted">{{ this.locale.elements.modal_content.atomic_mass }} {{ element.atomic_mass }}</h2>
        <!-- <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" /> -->
      </div>
      <div class="number text-left fade" v-else>
        <p>{{ element.number }} {{ element.name }} </p>
        <!-- ({{ element.name_en }}) -->
        <h2 class="labels atomic muted">{{ this.locale.elements.modal_content.atomic_mass }} {{ element.atomic_mass }}</h2>

        <!-- <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" /> -->
        <!-- <button class="close" @click="closeInfo">&times;</button> -->
      </div>

      <div class="labels">

        <h2 class="names fade" v-show="infoViewable === false">
          <div class="nameTR "> {{ element.name }} </div>
          <!-- <div class="nameEN muted"> {{ element.name_en }} </div> -->
        </h2>

        <div class="symbol" :style="{ color: colorCode }">
          <div v-show="!heat_view">{{ element.symbol }}</div>
          <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" />
        </div>
        <span class="block_List inactive">{{ element.block }}</span>
        <span class="category_List inactive">{{ element.category_code }}</span>

      </div> 
      <!-- <h2 class="labels atomic muted">Atomik kütle: {{ element.atomic_mass }}</h2> -->
    </div>

    <div :class="{
      'moreInfo active': infoViewable,
      'moreInfo inactive': !infoViewable}">
      <p class="description text-left fade">{{ element.description }}</p>
    </div>

      <a class="modal-open noselect flex-between" href="#">
        <span class="details-button muted">☰ {{ this.locale.misc.details }}</span>
      </a>
  </div>
</template>

<script>
  export default {
    props: { element: Object, heat_value: [Number, String], heat_changed: Boolean, heat_view: Boolean, locale: Object },
    data() {
      const categoryOfElement = this.element.category_code
      const categoryColors = {
        'alkaline_metals': '#ffaf80',          // turuncu
        'alkaline_metals_shade': '#ef9851',

        'alkaline_earth_metal': '#80ff8e',   // yeşi
        'alkaline_earth_metal_shade': '#44e053',

        'transition_metal': '#ffef80',          // sarı
        'transition_metal_shade': '#c1b45f',

        'post_transition_metal': '#80d5ff',  // mavi
        'post_transition_metal_shade': '#52c5fe',

        'metalloid': '#8095ff',               // slate
        'metalloid_shade': '#526efe',

        'reactive_nonmetal': '#ff80d4',        // pembe
        'reactive_nonmetal_shade': '#fe52c4',

        'noble_gas': '#aa80ff',               // lila
        'noble_gas_shade': '#8b52fe',

        'lanthanides': '#c3ff80',              // yeşil
        'lanthanides_shade': '#adfe52',

        'actinides': '#80fffc',               // teal
        'actinides_shade': '#52fefa',

        'unknown': '#fff',               // beyaz
        'unknown_shade': '#e0e0e0'
      }

      return {
        infoViewable: false,
        colorCode: categoryColors[categoryOfElement] || '#fff',
        states: {
          solid:      require("../resources/img/states/solid.svg"),
          liquid:     require("../resources/img/states/liquid.svg"),
          gas:        require("../resources/img/states/gas.svg"),
          uncertain:  require("../resources/img/states/uncertain.svg"),
        }
      }
    },
    methods: {
      toggleInfo($event) {
        if (!$event.target.closest('.labels') && !$event.target.closest('.number')) return
        this.infoViewable = !this.infoViewable
      },
      displayHeatState(element) {
        if (this.heat_view)
        {
          let result = '' 
          if ((element.boil_use === '' && element.melt_use === '') || (element.melt_use === '' && this.heat_value <= element.boil_use) || (element.boil_use === '' && this.heat_value <= element.melt_use)) result = this.states.uncertain;
          if (element.melt_use !== '' && this.heat_value <= element.melt_use) result = this.states.solid
          if (element.melt_use !== '' && this.heat_value >= element.melt_use) result = this.states.liquid
          if (element.boil_use !== '' && this.heat_value >= element.boil_use) result = this.states.gas
          return result
        }
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
        if (check === 'gas') {
          if (
            this.heat_view === true && element.boil_use !== '' && this.heat_value >= element.boil_use
          ) return true
          else return false
        }
        if (check === 'liquid') {
          if (
            this.heat_view === true && element.melt_use !== '' && this.heat_value >= element.melt_use
          ) return true
          else return false
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .container_List {
    border: .1px solid #1d232f;
    border-radius: 1vw;

    display: grid;
    margin-bottom: .5rem;

    background: rgb(39,47,63);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    /* background-color: #232b38; */
    color: whitesmoke;
    &:hover {
      filter: drop-shadow(0 0 .2rem v-bind(colorCode));
    }
    &:active {
      filter: drop-shadow(0 0 .5rem v-bind(colorCode));
    }

    .item {
      // margin: 10px 15px;
      padding: .5rem 1rem;
    }
  }
  
  .labels {
    display: flex;
    justify-content: space-between;
    font-weight:100;
    font-size: large;
    
    .names {
      color: v-bind(colorCode);
      justify-self: flex-start;
      text-align: left;
      
      // .nameEN {
      //   font-weight: lighter;
      //   font-size: medium;
      // }
      .nameTR {
        font-size: 8vw;
        font-weight: bolder;
      }
    }
    .symbol {
      font-size: 3rem;
      font-weight: bold;
      filter: drop-shadow(0 0 .1rem v-bind(colorCode));
    }
  }
  .atomic {
    color: v-bind(colorCode);
    align-self: center;
    font-size: small;
  }
  .number {
    font-size: large;
    justify-self: flex-start;
    position: relative;

    color: v-bind(colorCode);
  }
  .heatState {
    margin-top: .5rem;
    // font-family: 'Emoji', sans-serif;
    filter: drop-shadow(0 0 .2rem v-bind(colorCode));
    width: 2.4rem;
    height: 2.4rem;
  }
  .description {
    margin-bottom: 1rem;
    font-weight: 100;
  }
  .moreInfo {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    transition: all 500ms ease;
    margin: 0 1rem;
  }
  .modal-open {
    text-decoration: none;
    // color: v-bind(colorCode);
    background: rgb(39,47,63);
    background-image: linear-gradient(90deg, #272f3f 0%, #1d232f 100%);
    border-radius: 0 0 .3rem .3rem;
    // border-bottom-left-radius: .3rem;
    // border-bottom-right-radius: .3rem;
    padding: .3rem 1rem;

    // .details-button {
    //   padding: .4rem .4rem;
    //   background-color: #1d232f;
    //   border-radius: .3rem;
    // }
  }
  .close {
    position: absolute;
    top: -1rem;
    left: 21.5rem;
    font-size: 3rem;
    color: rgb(214, 214, 214);
    cursor: pointer;
    border: none;
    background: none;
  }
  .text-left {
    text-align: left;
  }
  .text-justify {
    text-align:justify;
  }
  .text-xs {
    font-size: x-small;
  }
  .text-xxs {
    font-size: xx-small;
  }
  .text-l {
    font-size: large;
  }
  .text-xl {
    font-size: x-large;
  }
  .text-xxl {
    font-size: xx-large;
  }
  .muted {
    opacity: .5;
  }
  .active {
    display: block;
  }
  .inactive {
    display: none;
  }
  a {
    color: white;
  }
</style>