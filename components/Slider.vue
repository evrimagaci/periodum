<template>
  <div class="slider">
    <div class="w-full flex justify-between mb-4">
      <div class="slider-title flex items-center">
        Sıcaklık
        <toggle-button v-model="active" color="#66ccca" :sync="true" class="ml-3" />
      </div>
      <div v-if="active" style="display: flex; cursor: pointer" @click="onTemperatureChange($store.state.unit === 'c' ? 25 : 77)">
        <img src="../assets/icons/icons-yenile-gray.svg" style="margin-right: 5px" />
        <div class="slider-title" style="font-weight: bold; margin-top: 2px">Yenile</div>
      </div>
    </div>
    <div :class="{ grayscale: !active, 'blur-sm': !active, 'pointer-events-none': !active }" class="temp-container">
      <client-only>
        <div style="display: flex; margin-top: 8px" class="table-slider">
          <vue-range-slider
            ref="slider"
            v-model="viewTemperature"
            :tooltip="'none'"
            :min="minDegree"
            :max="maxDegree"
            :drag-on-click="true"
            @change="onTemperatureChange"
            @dragging="onTemperatureChange"
          />
          <period-select
            :selected-value="$store.state.unit"
            :options="temperatureOptions"
            :value="viewTemperature"
            :min="minDegree"
            :max="maxDegree"
            @typeChange="onTemperatureTypeChange"
            @valueChange="onTemperatureChange"
          />
        </div>
      </client-only>
      <States />
    </div>
  </div>
</template>

<script>
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'Slider',
  data() {
    return {
      active: false,
      temperature: this.$store.state.temperature,
      viewTemperature: this.$store.state.temperature,
      tempTimer: null,
      temperatureOptions: [
        { label: '°C', value: 'c' },
        { label: '°F', value: 'f' },
        { label: 'K', value: 'k' },
      ],
    }
  },
  computed: {
    minDegree() {
      if (this.$store.state.unit === 'c') {
        return -273
      } else if (this.$store.state.unit === 'k') {
        return 0
      } else {
        return -459
      }
    },
    maxDegree() {
      if (this.$store.state.unit === 'c') {
        return 7000
      } else if (this.$store.state.unit === 'k') {
        return 7273
      } else {
        return 12632
      }
    },
  },
  watch: {
    '$store.state.temperature': {
      handler() {
        this.viewTemperature = this.$store.state.temperature
      },
    },
    temperature() {
      this.$store.commit('UPDATE_TEMPERATURE', this.temperature)
    },
    active() {
      if (!this.active) {
        this.$store.commit('DEACTIVATE_TEMPERATURE')
      }
    },
  },
  methods: {
    onTemperatureTypeChange(type) {
      if (type === 'c' && this.$store.state.unit === 'f') {
        this.viewTemperature = Number(((this.viewTemperature - 32) / 1.8).toFixed(0))
      }

      if (type === 'f' && this.$store.state.unit === 'c') {
        this.viewTemperature = Number((this.viewTemperature * 1.8 + 32).toFixed(0))
      }

      if (type === 'c' && this.$store.state.unit === 'k') {
        this.viewTemperature -= 273
      }

      if (type === 'k' && this.$store.state.unit === 'c') {
        this.viewTemperature += 273
      }

      if (type === 'f' && this.$store.state.unit === 'k') {
        this.viewTemperature = Number(((this.viewTemperature - 273) * 1.8 + 32).toFixed(0))
      }

      if (type === 'k' && this.$store.state.unit === 'f') {
        this.viewTemperature = Number(((this.viewTemperature - 273 - 32) / 1.8).toFixed(0))
      }
      clearTimeout(this.tempTimer)

      this.tempTimer = setTimeout(() => {
        this.$store.commit('SET_TEMPERATURE_TYPE', type)
        this.$store.commit('UPDATE_VIEW_TEMPERATURE', Number(this.viewTemperature))
      }, 150)
    },
    onTemperatureChange(val) {
      this.viewTemperature = val
      clearTimeout(this.tempTimer)
      this.tempTimer = setTimeout(() => this.triggerSetTemperature(val), 150)
    },
    triggerSetTemperature(val) {
      this.temperature = val
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';

.slider {
  grid-area: 1 / 3 / span 3 / span 10;
  padding: 30px;
}

.vue-slider {
  padding: 0 !important;
}

.table-slider {
  .vue-slider {
    width: 100% !important;
  }
}

.vue-slider-rail {
  background-color: #0b0e13 !important;
  border-radius: 5px !important;
  height: 10px !important;
}

.vue-slider-dot {
  background-color: #e8bc0b !important;
  border-radius: 50%;
}

.vue-slider-process,
.vue-slider-dot-handle {
  background-color: #e8bc0b !important;
}
.vue-slider-dot-handle {
  border: 1px;
  border-radius: 50%;
}

.slider-title {
  font-size: 16px;
  font-weight: 600;
  color: $gray;
}

.temp-container,
.temp-container * :not(.vue-slider-rail *) {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.temp-container.pointer-events-none * {
  pointer-events: none !important;
}

.vue-switcher-theme--custom {
  &.vue-switcher-color--blue {
    div {
      background-color: lighten(#66ccca, 10%);

      &::after {
        // for the circle on the switch
        background-color: darken(#66ccca, 5%);
      }
    }

    &.vue-switcher--unchecked {
      div {
        background-color: lighten(#66ccca, 30%);

        &::after {
          background-color: lighten(#66ccca, 10%);
        }
      }
    }
  }
}
</style>
