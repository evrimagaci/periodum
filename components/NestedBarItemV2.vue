<template>
  <div>
    <div class="row" style="cursor: pointer" :style="show ? 'border-left: solid 3px #80fffc' : null" @click="show ? close() : (show = true)">
      <div class="wrapper">
        <div class="menu-title" :style="show ? 'margin-left: -3px' : null">
          <div>
            {{ label }}
          </div>
        </div>
        <div class="menu-value">
          <img v-if="!show" style="cursor: pointer" src="../assets/icons/icons-plus.svg" />
          <img v-else style="cursor: pointer" src="../assets/icons/icons-minus.svg" />
        </div>
      </div>
    </div>
    <template v-for="(item, index) in filteredList">
      <div :key="'nested_parent' + index + item.key" class="dark-row">
        <div class="dark-row-back" />
        <div class="wrapper">
          <div v-if="item.values && Object.keys(item.values).length" class="menu-title">
            <div class="slider-select-container" style="width: 132px" :style="item.isLeftSelectOpened ? 'border-radius: 12px 12px 0 0' : null">
              <div class="wrapper" style="display: unset">
                <div style="font-size: 9px">
                  <div v-if="item.label.length > titleTextLimit">
                    <el-tooltip popper-class="tooltip" effect="dark" :content="item.label" placement="top">
                      <span> {{ item.label.slice(0, titleTextLimit) }}... </span>
                    </el-tooltip>
                  </div>
                  <div v-else>{{ item.label }}</div>
                </div>
                <div style="display: flex; cursor: pointer; justify-content: space-between" @click="toggleLeftSelect(item, !item.isLeftSelectOpened)">
                  <div class="slider-selected" style="width: unset; font-weight: 800; color: white; margin-right: 4px">{{ item.selectedLeftItem.label }}</div>
                  <img v-if="!item.isLeftSelectOpened && Object.keys(item.values).length > 1" style="width: 14px; height: 14px" src="~/assets/icons/chevron-down.svg" />
                  <img v-else-if="Object.keys(item.values).length > 1" style="width: 14px; height: 14px" src="~/assets/icons/chevron-up.svg" />
                </div>
              </div>
              <div v-if="item.isLeftSelectOpened" class="option-container">
                <div style="margin: 4px 6px">
                  <div v-for="(value, key) in item.values" v-show="key !== item.selectedLeftItem.key" :key="key" class="row" @click="selectLeftOption(item, key)">
                    <div class="option-value">{{ value.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="menu-title">
            <div v-if="item.label.length > titleTextLimit">
              <el-tooltip popper-class="tooltip" effect="dark" :content="item.label" placement="top">
                <span>{{ item.label.slice(0, titleTextLimit) }}...</span>
              </el-tooltip>
            </div>
            <div v-else>{{ item.label }}</div>
          </div>
          <div v-if="item.values && Object.keys(item.values).length" class="menu-value">
            <div
              v-if="item.values[item.selectedLeftItem.key].showRightSelect"
              class="slider-select-container"
              :style="item.values[item.selectedLeftItem.key].isRightSelectOpened ? 'border-radius: 12px 12px 0 0' : null"
            >
              <div class="wrapper">
                <div class="value">{{ convertUnit(item) }}</div>
                <div class="separator" />
                <div style="width: 64px; display: flex; cursor: pointer">
                  <div class="slider-selected">{{ item.values[item.selectedLeftItem.key].selectedUnit }}</div>
                  <img
                    v-if="!item.values[item.selectedLeftItem.key].isRightSelectOpened"
                    style="width: 14px; height: 14px"
                    src="~/assets/icons/chevron-down.svg"
                    @click="toggleRightSelect(item, true)"
                  />
                  <img v-else style="width: 14px; height: 14px" src="~/assets/icons/chevron-up.svg" @click="toggleRightSelect(item, false)" />
                </div>
              </div>
              <div v-if="item.values[item.selectedLeftItem.key].isRightSelectOpened" class="option-container">
                <div style="margin: 4px 6px">
                  <div v-for="(option, index) in item.values[item.selectedLeftItem.key].units" v-show="option !== item.values[item.selectedLeftItem.key].selectedUnit" :key="index" class="row">
                    <div></div>
                    <div class="option-value" style="width: 50px" @click="selectOption(item, option)">{{ option }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="slider-select-container">
              <div class="wrapper">
                <div class="value">{{ convertUnit(item) }}</div>
                <div v-if="item.values[item.selectedLeftItem.key].selectedUnit" style="width: 64px; display: flex; cursor: pointer">
                  <div class="slider-selected">
                    <div v-if="item.values[item.selectedLeftItem.key].selectedUnit.length > unitTextLimit">
                      <el-tooltip popper-class="tooltip" effect="dark" :content="item.values[item.selectedLeftItem.key].selectedUnit" placement="top">
                        <span>{{ item.values[item.selectedLeftItem.key].selectedUnit.slice(0, unitTextLimit) }}...</span>
                      </el-tooltip>
                    </div>
                    <div v-else>{{ item.values[item.selectedLeftItem.key].selectedUnit }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="menu-value">
            <div v-if="item.showRightSelect" class="slider-select-container" :style="item.isRightSelectOpened ? 'border-radius: 12px 12px 0 0' : null">
              <div class="wrapper">
                <div class="value">{{ convertUnit(item) }}</div>
                <div class="separator" />
                <div style="width: 64px; display: flex; cursor: pointer">
                  <div class="slider-selected">{{ item.selectedUnit }}</div>
                  <img v-if="!item.isRightSelectOpened" style="width: 14px; height: 14px" src="~/assets/icons/chevron-down.svg" @click="toggleRightSelect(item, true)" />
                  <img v-else style="width: 14px; height: 14px" src="~/assets/icons/chevron-up.svg" @click="toggleRightSelect(item, false)" />
                </div>
              </div>
              <div v-if="item.isRightSelectOpened" class="option-container">
                <div style="margin: 4px 6px">
                  <div v-for="(option, index) in item.units" v-show="option !== item.selectedUnit" :key="index" class="row">
                    <div></div>
                    <div class="option-value" style="width: 50px" @click="selectOption(item, option)">{{ option }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="slider-select-container">
              <div class="wrapper">
                <div v-if="element[item.key].length > textLimit">
                  <el-tooltip popper-class="tooltip" effect="dark" :content="element[item.key]" placement="top">
                    <span>{{ element[item.key].slice(0, textLimit) }}...</span>
                  </el-tooltip>
                </div>
                <div v-else class="value">{{ convertUnit(item) }}</div>
                <div v-if="item.selectedUnit" style="width: 64px; display: flex; cursor: pointer">
                  <div class="slider-selected">{{ item.selectedUnit }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
import elementUnits from '../static/element_units'
import units from '../static/units'

export default {
  name: 'NestedBarItemV2',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    element: {
      type: Object,
      default: () => {},
    },
    label: {
      type: String,
      default: () => '',
    },
  },
  data() {
    return {
      titleTextLimit: 24,
      textLimit: 16,
      unitTextLimit: 9,
      show: false,
      list: [],
      selected: {},
      value: null,
    }
  },
  computed: {
    filteredList() {
      return this.show ? this.list : []
    },
  },
  watch: {
    data() {
      this.init()
    },
    element() {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    selectLeftOption(item, key) {
      this.selectOption(item, item.values[item.selectedLeftItem.key].defaultUnit)
      item.selectedLeftItem = {
        key,
        label: item.values[key].label,
      }
      this.toggleLeftSelect(item, false)
    },
    selectOption(item, option) {
      if (item.key) {
        item.selectedUnit = option
        this.toggleRightSelect(item, false)
      } else {
        item.values[item.selectedLeftItem.key].selectedUnit = option
        this.toggleRightSelect(item, false)
      }
    },
    formatNumber(value) {
      if (value >= 0.01) {
        return Number(value.toFixed(2))
      } else {
        if (value < 0.00001) {
          return Number.parseFloat(Number(value.toFixed(100)).toExponential()).toPrecision(2)
        }
        return value
      }
    },
    convertUnit(item) {
      if (item.key) {
        if (item.selectedUnit !== item.defaultUnit) {
          const selectedUnits = units[item.defaultUnit]
          const found = _.find(selectedUnits, { target_unit: item.selectedUnit })
          if (found) {
            // eslint-disable-next-line no-eval
            const func = eval(found.formula)
            return !_.isNaN(Number(this.element[item.key])) ? this.formatNumber(func(Number(this.element[item.key]))) : this.element[item.key]
          }
        }
        return !_.isNaN(Number(this.element[item.key])) ? this.formatNumber(Number(this.element[item.key])) : this.element[item.key]
      } else {
        if (item.values[item.selectedLeftItem.key].selectedUnit !== item.values[item.selectedLeftItem.key].defaultUnit) {
          const selectedUnits = units[item.values[item.selectedLeftItem.key].defaultUnit]
          const found = _.find(selectedUnits, { target_unit: item.values[item.selectedLeftItem.key].selectedUnit })
          // eslint-disable-next-line no-eval
          const func = eval(found.formula)
          return this.formatNumber(func(Number(this.element[item.selectedLeftItem.key])))
        }
        return !_.isNaN(Number(this.element[item.selectedLeftItem.key])) ? this.formatNumber(Number(this.element[item.selectedLeftItem.key])) : this.element[item.selectedLeftItem.key]
      }
    },
    toggleRightSelect(item, toggle) {
      this.list.forEach((listItem) => {
        if (listItem.values) {
          for (const key in listItem.values) {
            listItem.values[key].isRightSelectOpened = false
          }
        }
        if (listItem.key) {
          listItem.isRightSelectOpened = false
        }
      })
      if (item.key) {
        item.isRightSelectOpened = toggle
      } else {
        item.values[item.selectedLeftItem.key].isRightSelectOpened = toggle
      }
    },
    toggleLeftSelect(item, toggle) {
      this.list.forEach((listItem) => {
        listItem.isLeftSelectOpened = false
      })
      item.isLeftSelectOpened = toggle
    },
    init() {
      this.show = false
      this.list = _.cloneDeep(this.data)
        .filter((item) => {
          if (item.key) {
            return this.element[item.key] !== null && this.element[item.key] !== undefined && this.element[item.key] !== ''
          }
          return true
        })
        .map((item) => {
          if (item.values) {
            const values = {}
            item.values
              .filter((value) => {
                return this.element[value.key] !== null && this.element[value.key] !== undefined && this.element[value.key] !== ''
              })
              .forEach((value) => {
                const found = _.cloneDeep(elementUnits[value.key])
                const showRightSelect = found && found.units.length > 1

                values[value.key] = {
                  label: value.label,
                  defaultUnit: found ? found.defaultUnit : null,
                  selectedUnit: found ? found.defaultUnit : null,
                  units: found.units,
                  isRightSelectOpened: false,
                  showRightSelect,
                }
              })
            item.values = values
            return {
              selectedLeftItem: Object.keys(item.values).length
                ? {
                    key: Object.keys(item.values)[0],
                    label: item.values[Object.keys(item.values)[0]].label,
                  }
                : null,
              isLeftSelectOpened: false,
              ...item,
            }
          } else {
            const showRightSelect = item.key && elementUnits[item.key] && elementUnits[item.key].units.length > 1
            const found = _.cloneDeep(elementUnits[item.key])

            return {
              units: found ? found.units : [],
              defaultUnit: found ? found.defaultUnit : null,
              selectedUnit: found ? found.defaultUnit : null,
              isRightSelectOpened: false,
              showLeftSelect: false,
              showRightSelect,
              ...item,
            }
          }
        })
        .filter((item) => {
          return item.key || Object.keys(item.values).length
        })
    },
    close() {
      this.show = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.slider-select-container {
  width: 116px;
  border-radius: 12px;
  background-color: #0b0e13;
  .wrapper {
    display: flex;
    justify-content: space-between;
    padding: unset;
    .separator {
      width: 2px;
      height: 14px;
      opacity: 0.15;
      border-radius: 1px;
      background-color: $gray;
    }
    .slider-selected {
      font-size: 12px;
      font-weight: 800;
      color: $gray;
      margin-right: 14px;
      line-height: 16px;
      width: 48px;
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
  z-index: 10;
  width: 98px;
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
    width: 100%;
    &:hover {
      color: $white;
      background-color: rgba(102, 204, 202, 0.1);
    }
  }
}

.menu-title {
  .el-tooltip {
    display: block;
    width: 150px;
  }
}
</style>
