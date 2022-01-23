<template>
  <div class="slider-select-container" :style="isSelectOpened ? 'border-radius: 12px 12px 0 0' : 'border-radius: 12px'">
    <div class="wrapper">
      <div class="value">
        <input style="max-width: 40px" type="number" :value="value" @keyup="changeValue" />
      </div>
      <div class="separator" />
      <div style="width: 30px; display: flex; cursor: pointer">
        <div class="slider-selected">{{ selected.label }}</div>
        <img v-if="!isSelectOpened" style="width: 14px; height: 14px" src="~/assets/icons/chevron-down.svg" @click="isSelectOpened = !isSelectOpened" />
        <img v-else style="width: 14px; height: 14px" src="~/assets/icons/chevron-up.svg" @click="isSelectOpened = !isSelectOpened" />
      </div>
    </div>
    <div v-if="isSelectOpened" class="option-container">
      <div style="margin: 4px 6px">
        <div v-for="(option, index) in options" :key="index" class="row">
          <div></div>
          <div class="option-value" style="width: 30px" @click="selectValue(option.value)">{{ option.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'PeriodSelect',
  props: {
    minDegree: Number,
    value: {
      type: Number,
      default: () => 0,
    },
    selectedValue: {
      type: [Number, String],
      default: () => null,
    },
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selected: {},
      isSelectOpened: false,
      newTemp: Number,
    }
  },
  watch: {
    selectedValue() {
      this.selected = _.find(this.options, { value: this.selectedValue }) || {}
    },
  },
  mounted() {
    this.selected = _.find(this.options, { value: this.selectedValue }) || {}
  },
  methods: {
    changeValue(e) {
      if (e.target.value === '') {
        // eslint-disable-next-line vue/no-mutating-props
        this.newTemp = 0
      } else {
        // eslint-disable-next-line vue/no-mutating-props
        this.newTemp = parseInt(e.target.value)
      }
      if (this.newTemp === undefined) {
        // eslint-disable-next-line vue/no-mutating-props
        this.newTemp = 25
      } else if (this.value > 7000) {
        // eslint-disable-next-line vue/no-mutating-props
        this.newTemp = 7000
      } else if (this.value < this.minDegree) {
        // eslint-disable-next-line vue/no-mutating-props
        this.newTemp = this.minDegree
      }
      this.$emit('changeVal', this.newTemp)
    },
    selectValue(value) {
      this.$emit('change', value)
      this.isSelectOpened = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.slider-select-container {
  width: 86px;
  border-radius: 12px;
  background-color: #0b0e13;
  margin-top: -8px;
  margin-left: 10px;
  z-index: 1;
  position: relative;

  .wrapper {
    margin: 4px 6px;
    display: flex;
    justify-content: space-between;

    .separator {
      width: 2px;
      height: 14px;
      opacity: 0.15;
      border-radius: 1px;
      background-color: $gray;
      margin-left: 8px;
    }

    .slider-selected {
      font-size: 12px;
      font-weight: 800;
      color: $gray;
      margin-right: 4px;
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

.option-container {
  width: 86px;
  position: absolute;
  background-color: #0b0e13;
  border-radius: 0 0 12px 12px;

  .row {
    display: flex;
    justify-content: space-between;
    height: 18px;
    line-height: 18px;
    cursor: pointer;
  }

  .option-value {
    color: $gray;
    font-size: 12px;
    line-height: 16px;
    font-weight: 800;

    &:hover {
      color: $white;
      background-color: rgba(102, 204, 202, 0.1);
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
