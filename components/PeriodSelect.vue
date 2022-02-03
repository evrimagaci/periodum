<template>
  <div class="slider-select-container" :style="isSelectOpened ? 'border-radius: 12px 12px 0 0' : 'border-radius: 12px'">
    <div class="wrapper">
      <input v-model="temperature" class="input-value" type="number" :min="min" :max="max" @blur="checkEmpty" />
      <div class="separator" />
      <div style="width: 30px; display: flex; cursor: pointer" @click="isSelectOpened = !isSelectOpened">
        <div class="slider-selected">{{ selected.label }}</div>
        <img v-if="!isSelectOpened" class="icon" src="~/assets/icons/chevron-down.svg" />
        <img v-else class="icon" src="~/assets/icons/chevron-up.svg" />
      </div>
    </div>
    <div v-if="isSelectOpened" class="option-container">
      <div v-for="(option, index) in filteredOptions" :key="index" class="row option-value border-0" @click="selectValue(option.value)">
        <div>
          {{ unitCalculator(selected.value, temperature)[option.value] }}
        </div>
        <span style="width: 43px" class="flex items-center">
          <div class="separator" />
          <span>
            {{ option.label }}
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import unitCalculator from '~/utils/unitCalculator'
export default {
  name: 'PeriodSelect',
  props: {
    value: {
      type: Number,
      default: () => 0,
    },
    selectedValue: {
      type: String,
      default: () => null,
    },
    options: {
      type: Array,
      default: () => [],
    },
    min: {
      type: Number,
      required: true,
    },
    max: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      selected: {},
      isSelectOpened: false,
      temperature: this.$store.state.temperature,
    }
  },
  computed: {
    filteredOptions() {
      return _.filter(this.options, (option) => {
        return option.value !== this.selectedValue
      })
    },
  },
  watch: {
    '$store.state.temperature': {
      handler() {
        this.temperature = this.$store.state.temperature
      },
    },
    '$store.state.unit': {
      handler() {
        this.temperature = this.$store.state.temperature
      },
    },
    temperature(value) {
      if (this.min > value) {
        this.temperature = this.min
      }
      if (this.max < value) {
        this.temperature = this.max
      }
      this.$emit('valueChange', this.temperature)
    },
    selectedValue() {
      this.selected = _.find(this.options, { value: this.selectedValue }) || {}
    },
  },
  mounted() {
    this.selected = _.find(this.options, { value: this.selectedValue }) || {}
  },
  methods: {
    selectValue(value) {
      this.$emit('typeChange', value)
      this.isSelectOpened = false
    },
    unitCalculator,
    checkEmpty() {
      if (this.temperature === '') {
        this.temperature = this.$store.state.unit === 'c' ? 25 : 77
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.slider-select-container {
  border-radius: 12px;
  background-color: #0b0e13;
  margin-top: -8px;
  margin-left: 10px;
  z-index: 1;
  position: relative;
  display: flex;
  align-items: center;
  .wrapper {
    padding: 6px 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      width: 14px;
      height: 14px;
      display: block;
    }
    .input-value {
      background: none;
      color: white;
      border: none;
      width: 61px;
      font-size: 12px;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      &[type='number'] {
        -moz-appearance: textfield;
      }
    }
    .slider-selected {
      font-size: 12px;
      font-weight: 800;
      color: $gray;
      margin-right: 8px;
      line-height: 16px;
      width: 12px;
    }
    .value {
      font-size: 12px;
      line-height: 16px;
      font-weight: 800;
      color: $white;
    }
  }
}

.separator {
  width: 2px;
  height: 14px;
  opacity: 0.15;
  border-radius: 1px;
  background-color: $gray;
  margin-left: 8px;
  margin-right: 3px;
}

.option-container {
  top: calc(100% - 3px);
  width: 100%;
  position: absolute;
  background-color: #0b0e13;
  border-radius: 0 0 12px 12px;
  padding: 0 12px 6px;
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 18px;
    line-height: 18px;
    width: 100%;
    margin-bottom: 3px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .option-value {
    cursor: pointer;
    color: $gray;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    &:hover {
      color: $white;
      background-color: rgba(102, 204, 202, 0.1);
    }
  }
}
</style>
