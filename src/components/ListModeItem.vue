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
        <h2 class="labels atomic muted">Atomik kütle: {{ element.atomic_mass }}</h2>
        <!-- <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" /> -->
      </div>
      <div class="number text-left fade" v-else>
        <p>{{ element.number }} {{ element.name_tr }} ({{ element.name_en }})</p>
        <h2 class="labels atomic muted">Atomik kütle: {{ element.atomic_mass }}</h2>

        <!-- <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" /> -->
        <!-- <button class="close" @click="closeInfo">&times;</button> -->
      </div>

      <div class="labels">

        <h2 class="names fade" v-show="infoViewable === false">
          <div class="nameTR "> {{ element.name_tr }} </div>
          <div class="nameEN muted"> {{ element.name_en }} </div>
        </h2>

        <div class="symbol" :style="{ color: colorCode }">
          <div v-show="!heat_view">{{ element.symbol }}</div>
          <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" />
        </div>
        <span class="block_List inactive">{{ element.block }}</span>
        <span class="category_List inactive">{{ element.category }}</span>

      </div> 
      <!-- <h2 class="labels atomic muted">Atomik kütle: {{ element.atomic_mass }}</h2> -->
    </div>

    <div :class="{
      'moreInfo active': infoViewable === true,
      'moreInfo inactive': infoViewable === false}">
      <p class="description text-left fade">{{ element.description }}</p>
    </div>

      <a class="modal-open noselect flex-between" href="#">
        <span class="details-button muted">☰ Detaylar</span>
      </a>
  </div>
</template>

<script>
  export default {
    props: { element: Object, heat_value: [Number, String], heat_changed: Boolean, heat_view: Boolean },
    data() {
      const categoryOfElement = this.element.category
      const categoryColors = {
        'alkali metal': '#ffaf80',          // turuncu
        'toprak alkali metal': '#80ff8e',   // yeşi
        'geçiş metali': '#ffef80',          // sarı
        'geçiş sonrası metali': '#80d5ff',  // mavi
        'metalsi': '#8095ff',               // slate
        'reaktif ametal': '#ff80d4',        // pembe
        'soy gaz': '#aa80ff',               // lila
        'lantanit': '#c3ff80',              // yeşil
        'aktinit': '#80fffc'                // teal
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
      // closeInfo() {
      //   this.infoViewable = false
      // },
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
    border-radius: .3rem;

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
  
  .flex-between {
    display: flex;
    justify-content: space-between;
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
      
      .nameEN {
        font-weight: lighter;
        font-size: medium;
      }
      .nameTR {
        font-size: 2rem;
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
    margin-left: 1rem;
    margin-right: 1rem;
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