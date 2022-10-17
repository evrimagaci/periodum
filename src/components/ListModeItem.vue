<template>
  <div @click="toggleInfo($event)" :id="eID" class="list_elementContainer fade"
    :class="{
      'list_stateUncertain':  heatState('uncertain', element),
      'list_stateSolid':      heatState('solid', element),
      'list_stateLiquid':     heatState('liquid', element),
      'list_stateGas':        heatState('gas', element),
    }">
    <div class="item preventMouseEvent noselect">
      <div class="list_number_container flex-between fade" v-if="infoViewable === false">
        <p class="list_atomicNumber muted">{{ element.number }}</p>
        <h2 class="list_labels list_atomicMass muted">{{ this.locale.elements.modal_content.atomic_mass }} {{ element.atomic_mass }}</h2>
      </div>
      <div class="list_number_container text-left fade" v-else>
        <p>{{ element.number }} {{ element.name }} </p>
        <h2 class="list_labels list_atomicMass muted">{{ this.locale.elements.modal_content.atomic_mass }} {{ element.atomic_mass }}</h2>
      </div>

      <div class="list_labels">
        <div v-show="!infoViewable" class="list_name fade">{{ element.name }}</div>

        <div class="list_symbol" :style="{ color: colorCode }">
          <div v-show="!heat_view">{{ element.symbol }}</div>
          <img v-show="heat_view" class="heatState" :src="displayHeatState(element)" />
        </div>

        <span class="list_elementBlock inactive">{{ 'list_groupFilter_' + element.block }}</span>
        <span class="list_elementCategory inactive">{{ element.category_code }}</span>
      </div>
    </div>

    <div :class="{
      'moreInfo active': infoViewable,
      'moreInfo inactive': !infoViewable}">
      <p class="list_description text-left fade">{{ element.description }}</p>
    </div>

    <span id="list_elementDetailsBtn" class="details-button muted noselect">☰ {{ this.locale.misc.details }}</span>
  </div>
</template>

<script>
  export default {
    props: { element: Object, heat_value: [Number, String], heat_changed: Boolean, heat_view: Boolean, locale: Object, eID: String },
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
        if ($event.target.classList.contains('details-button')) return
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
  .list_elementContainer {
    border: .1px solid #1d232f;
    border-radius: .3rem;

    display: grid;
    margin-bottom: .4rem;

    background: rgb(39,47,63);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    color: gainsboro;
    &:active {
      filter: drop-shadow(0 0 .2rem v-bind(colorCode));
    }
    &:hover {
      filter: drop-shadow(0 0 .2rem v-bind(colorCode));
    }

    .item {
      padding: .5rem 1rem;
    }
  }
  
  .list_labels {
    display: flex;
    justify-content: space-between;
    font-weight: 100;
    font-size: large;
    
    .list_name {
      color: v-bind(colorCode);
      font-size: 8vw;
      font-weight: bold;
    }
    .list_symbol {
      font-size: 8vw;
      font-weight: bold;
      filter: drop-shadow(0 0 .1rem v-bind(colorCode));
    }
  }
  .list_atomicMass {
    color: v-bind(colorCode);
    font-size: small;
  }
  .list_number_container {
    position: relative;

    font-size: small;
    color: v-bind(colorCode);
  }
  .heatState {
    margin-top: .5rem;
    width: 2rem;
    height: 2rem;
  }
  .list_description {
    margin-top: -.5rem;
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
  .details-button {
    width: 100%;
    text-decoration: none;
    // color: v-bind(colorCode);
    background: rgb(39,47,63);
    background-image: linear-gradient(90deg, #272f3f 0%, #1d232f 100%);
    border-radius: 0 0 2vw 2vw;
    padding: .2rem 1rem;

    border-top: .5px solid #181c24;

    &:hover {
      cursor: pointer;
    }
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