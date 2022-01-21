<template>
  <div
    v-if="isRenderable"
    class="element"
    :class="`${computedClass} ${element.hoverClass}`"
    :draggable="isTableElement"
    @dragstart="$emit('dragstart', element)"
    @click="$emit('selectElement', element)"
  >
    <div v-if="activeGroups.includes(element.number) && isTableElement" class="group-no">
      {{ x }}
    </div>
    <div v-if="activePeriods.includes(element.number) && isTableElement" class="period-no">
      {{ y }}
    </div>
    <div class="wrapper" :style="`color: ${element.color}`">
      <div class="number">
        {{ element.number }}
      </div>
      <div class="symbol">
        {{ element.symbol }}
      </div>
      <div class="name" :style="element.name_tr && element.name_tr.length > 11 ? 'letter-spacing: -0.4px' : null">
        {{ element.name_tr }}
      </div>
      <div class="atomic-mass">
        {{ element.atomic_mass }}
      </div>
    </div>
  </div>
  <div v-else class="element-empty" />
</template>

<script>
import _ from 'lodash'

export default {
  name: 'PElement',
  props: {
    x: {
      type: Number,
      default: () => 0,
    },
    y: {
      type: Number,
      default: () => 0,
    },
    searchText: {
      type: String,
      default: () => null,
    },
    selectedBlock: {
      type: String,
      default: () => null,
    },
    selectedCategory: {
      type: String,
      default: () => null,
    },
    isTableElement: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      activeGroups: [1, 2, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
      activePeriods: [1, 3, 11, 19, 37, 55, 87],
      element: {},
    }
  },
  computed: {
    computedClass() {
      if (!this.isTableElement) return `element-searched ${this.element.searchClass}`

      const isTemperatureTriggered = this.$store.state.isTemperatureTriggered
      const selectedTemperatureType = this.$store.state.selectedTemperatureType
      const temperature = this.$store.state.temperature

      let ref
      if (selectedTemperatureType === 'c') {
        ref = temperature + 273.15
      } else if (selectedTemperatureType === 'f') {
        ref = (temperature + 459.67) * 1.8
      } else {
        ref = temperature
      }

      if (isTemperatureTriggered && this.element.number) {
        if (this.element.boil_use === '' && this.element.melt_use === '') {
          return 'element-searched orange'
        }
        if (this.element.boil_use === '') {
          return ref >= this.element.melt_use ? 'element-searched orange' : 'element-searched purple'
        }
        if (this.element.melt_use === '') {
          return ref >= this.element.boil_use ? 'element-searched teal' : 'element-searched orange'
        }
        if (ref >= this.element.boil_use) {
          return 'element-searched teal'
        } else if (ref >= this.element.melt_use) {
          return 'element-searched blue'
        } else {
          return 'element-searched purple'
        }
      }

      const selectedStateOfMatter = this.$store.state.selectedStateOfMatter
      let isFilteredState = false
      if (selectedStateOfMatter) {
        let state = 'solid'
        if (this.element.boil_use === '' && this.element.melt_use === '') {
          state = 'unknown'
        } else if (ref >= this.element.boil_use) {
          state = 'gas'
        } else if (ref >= this.element.melt_use) {
          state = 'liquid'
        }

        isFilteredState = state === selectedStateOfMatter
      }

      if (
        this.isFoundOnSearch ||
        isFilteredState ||
        this.element.block === this.selectedBlock ||
        this.selectedCategory === this.element.type ||
        this.$store.getters.probableElements.includes(this.element.symbol)
      ) {
        return `element-searched ${this.element.searchClass}`
      } else if (this.isFoundOnSearch === false) {
        return 'search-not-found'
      } else {
        return null
      }
    },
    isRenderable() {
      if (this.y === 1) {
        return this.x === 1 || this.x === 18
      }
      if (this.y === 2 || this.y === 3) {
        return this.x < 3 || this.x > 12
      }
      if (this.y > 7) {
        return this.x > 3 && this.x < 19
      }
      return true
    },
    isFoundOnSearch() {
      if (this.element.number && this.searchText) {
        if (this.element.symbol.toLowerCase() === this.searchText) {
          return true
        } else if (this.element.name_tr.toLowerCase() === this.searchText) {
          return true
        } else return String(this.element.number) === this.searchText
      }
      return null
    },
  },
  created() {
    this.element = _.find(this.$store.getters.elements, { xpos: this.x, ypos: this.y }) || {}
  },
}
</script>
