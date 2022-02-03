<template>
  <div :class="[`periodic-element ${element.hoverClass}`, { [element.searchClass]: isActive, active: isActive }]" :style="style" :title="element.name_tr" @click="selectElement">
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
    <StateIndicator :element="element" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Element',
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    ...mapGetters(['searchResults', 'selectedElement', 'selectedCategory', 'selectedBlock']),
    style() {
      return {
        color: this.element.color,
      }
    },
    isActive() {
      return (
        this.selectedElement === this.element.number || !!this.searchResults.includes(this.element.number) || this.element.block === this.selectedBlock || this.selectedCategory === this.element.type
      )
    },
  },

  methods: {
    selectElement() {
      this.$store.commit('SET_SELECTED_ELEMENT', this.element.number)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.periodic-element {
  background: $elementDefaultBackground;
  padding: 5px;
  border-radius: 12.5%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: normal;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  user-select: none;
  &.active * {
    color: #222938 !important;
  }
  .number {
    font-size: 10px;
    font-weight: normal;
    color: inherit;
  }
  .symbol {
    font-size: 16px;
    font-weight: 800;
    color: inherit;
  }
  .name {
    font-size: 10px;
    font-weight: 600;
    color: #bec1c6;
  }
  .atomic-mass {
    opacity: 0.6;
    font-size: 10px;
  }
}
</style>
