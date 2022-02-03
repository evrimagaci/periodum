<template>
  <div v-if="isTemperatureTriggered" class="indicator" :class="state">
    {{ states[state] }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import stateCalculator from '~/utils/stateCalculator'
export default {
  name: 'StateIndicator',
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      state: '',
      states: {
        solid: 'K',
        liquid: 'S',
        gas: 'G',
        unknown: '?',
      },
    }
  },

  computed: {
    ...mapGetters(['temperature', 'unit', 'isTemperatureTriggered']),
  },

  watch: {
    temperature() {
      this.state = stateCalculator(this.element, this.temperature, this.unit)
    },
    unit() {
      this.state = stateCalculator(this.element, this.temperature, this.unit)
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';

.indicator {
  font-size: 16px;
  font-weight: 900;
  line-height: 16px;
  height: 16px;
  position: absolute;
  top: 4px;
  right: 4px;
  z-index: 1;
  &.solid {
    background: linear-gradient(135deg, #ffaf80, #b84300);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.liquid {
    background: linear-gradient(135deg, #8095ff, #001fb8);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.gas {
    background: linear-gradient(135deg, #ffef80, #b89f00);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  &.unknown {
    background: linear-gradient(135deg, #d4dadc, #536065);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.draggable-mirror .indicator {
  display: none;
}

.active .indicator {
  color: #222938 !important;
  background: none !important;
  -webkit-background-clip: unset !important;
  -webkit-text-fill-color: unset !important;
  opacity: 0.4;
}
</style>
