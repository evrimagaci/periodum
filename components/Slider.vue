<template>
  <div>
    <div style="width: 30vw; display: flex; justify-content: space-between">
      <div class="slider-title">Sıcaklık</div>
      <div style="display: flex; cursor: pointer" @click="onTemperatureChange($store.state.selectedTemperatureType === 'c' ? 25 : 77)">
        <img src="../assets/icons/icons-yenile-gray.svg" style="margin-right: 5px" />
        <div class="slider-title" style="font-weight: bold; margin-top: 2px">Yenile</div>
      </div>
    </div>
    <client-only>
      <div style="display: flex; margin-top: 8px" class="table-slider">
        <vue-range-slider
          ref="slider"
          :value="viewTemperature"
          :tooltip="'none'"
          :min="minDegree"
          :max="maxDegree"
          :drag-on-click="true"
          @change="onTemperatureChange"
          @dragging="onTemperatureChange"
        />
        <period-select :selected-value="$store.state.selectedTemperatureType" :options="temperatureOptions" :value="viewTemperature" @change="onTemperatureTypeChange" />
      </div>
    </client-only>
    <div class="slider-box-wrapper">
      <div>
        <div class="slider-box purple">
          <img width="18" height="16" src="~/assets/icons/solid.svg" />
        </div>
        <div class="title">Katı</div>
      </div>
      <div style="margin-left: 30px">
        <div class="slider-box blue">
          <img width="20" height="19" src="~/assets/icons/liquid.svg" />
        </div>
        <div class="title">Sıvı</div>
      </div>
      <div style="margin-left: 30px">
        <div class="slider-box teal">
          <img width="20" height="16" src="~/assets/icons/gas.svg" />
        </div>
        <div class="title">Gaz</div>
      </div>
      <div style="margin-left: 30px">
        <div class="slider-box orange">
          <img width="13" height="20" src="~/assets/icons/undefined.svg" />
        </div>
        <div class="title">Belirsiz</div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-slider-component/theme/antd.css'
import PeriodSelect from './PeriodSelect'
export default {
  name: 'Slider',
  components: { PeriodSelect },
  data() {
    return {
      temperature: this.$store.state.temperature,
      viewTemperature: this.$store.state.temperature,
      timer: null,
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
      if (this.$store.state.selectedTemperatureType === 'c') {
        return -273
      } else if (this.$store.state.selectedTemperatureType === 'k') {
        return 0
      } else {
        return -459
      }
    },
    maxDegree() {
      if (this.$store.state.selectedTemperatureType === 'c') {
        return 7000
      } else if (this.$store.state.selectedTemperatureType === 'k') {
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
        clearTimeout(this.timer)
        this.timer = setTimeout(this.triggerTimer, 3000)
      },
    },
    temperature() {
      this.$store.commit('UPDATE_TEMPERATURE', this.temperature)
      clearTimeout(this.timer)
      this.timer = setTimeout(this.triggerTimer, 3000)
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    onTemperatureTypeChange(type) {
      if (type === 'c' && this.$store.state.selectedTemperatureType === 'f') {
        this.viewTemperature = Number(((this.viewTemperature - 32) / 1.8).toFixed(0))
      }

      if (type === 'f' && this.$store.state.selectedTemperatureType === 'c') {
        this.viewTemperature = Number((this.viewTemperature * 1.8 + 32).toFixed(0))
      }

      if (type === 'c' && this.$store.state.selectedTemperatureType === 'k') {
        this.viewTemperature -= 273
      }

      if (type === 'k' && this.$store.state.selectedTemperatureType === 'c') {
        this.viewTemperature += 273
      }

      if (type === 'f' && this.$store.state.selectedTemperatureType === 'k') {
        this.viewTemperature = Number(((this.viewTemperature - 273) * 1.8 + 32).toFixed(0))
      }

      if (type === 'k' && this.$store.state.selectedTemperatureType === 'f') {
        this.viewTemperature = Number(((this.viewTemperature - 273 - 32) / 1.8).toFixed(0))
      }
      this.$store.commit('SET_TEMPERATURE_TYPE', type)
      this.$store.commit('UPDATE_VIEW_TEMPERATURE', Number(this.viewTemperature))
    },
    onTemperatureChange(val) {
      this.viewTemperature = val
      clearTimeout(this.tempTimer)
      this.tempTimer = setTimeout(() => this.triggerSetTemperature(val), 150)
    },
    triggerSetTemperature(val) {
      this.temperature = val
    },
    triggerTimer() {
      this.$store.commit('DEACTIVATE_TEMPERATURE')
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';

.vue-slider {
  padding: 0 !important;
}

.table-slider {
  .vue-slider {
    width: 30vw !important;
  }
}

.element-slider {
  .vue-slider {
    width: 30vw !important;
  }
}

.vue-slider-rail {
  background-color: #0b0e13 !important;
  border-radius: 5px !important;
  height: 8px !important;
}

.vue-slider-dot {
  background-color: #66ccca !important;
  border-radius: 50%;
}

.vue-slider-process,
.vue-slider-dot-handle {
  background-color: #66ccca !important;
}
.vue-slider-dot-handle {
  border: 1px;
  border-radius: 50%;
}

.slider-title {
  font-size: 10px;
  color: $gray;
}

.slider-box-wrapper {
  display: flex;
  margin-top: 23px;
  text-align: center;
  .slider-box {
    width: 2.3vw;
    height: 2.3vw;
    border-radius: 4px;
    display: flex;
    img {
      align-self: center;
      margin: auto;
    }
  }
  .purple {
    box-shadow: 0 2px 40px 0 rgba(185, 148, 250, 0.4);
    background-image: linear-gradient(135deg, #d5b7ff, #aa80ff);
  }
  .blue {
    box-shadow: 0 2px 20px 0 rgba(136, 158, 255, 0.4);
    background-image: linear-gradient(135deg, #acbdff, #8095ff);
  }
  .teal {
    box-shadow: 0 2px 20px 0 rgba(153, 255, 252, 0.4);
    background-image: linear-gradient(135deg, #80fffc, #56d9d7);
  }
  .orange {
    box-shadow: 0 2px 40px 0 rgba(255, 175, 128, 0.4);
    background-image: linear-gradient(135deg, #ffaf80, #ed954b 100%);
  }
  .title {
    font-size: 10px;
    color: $gray;
    margin-top: 3px;
  }
}
</style>
