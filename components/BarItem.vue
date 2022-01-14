<template>
  <div v-if="isEligible">
    <div class="row" style="cursor: pointer" :style="show ? 'border-left: solid 3px #80fffc' : null" @click="show = !show">
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
    <div v-if="show" style="max-height: 200px; overflow: auto">
      <template v-for="(item, index) in filteredList">
        <div v-if="element[item.key]" :key="index" class="dark-row">
          <div class="wrapper">
            <div class="menu-title">
              <div>
                {{ item.label }}
              </div>
            </div>
            <div v-if="element[item.key] && element[item.key].length > textLimit" class="menu-value" :style="type === 'color' ? `color: #${element[item.key]}` : null">
              <el-tooltip popper-class="tooltip" effect="dark" :content="element[item.key]" placement="top">
                <span>{{ element[item.key].slice(0, textLimit) }}...</span>
              </el-tooltip>
            </div>
            <div v-else class="menu-value" :style="type === 'color' ? `color: #${element[item.key]}` : null">{{ element[item.key] }}</div>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div v-else></div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'BarItem',
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
    type: {
      type: String,
      default: () => 'normal',
    },
  },
  data() {
    return {
      textLimit: 18,
      show: false,
      list: [],
    }
  },
  computed: {
    filteredList() {
      return this.show
        ? this.list.filter((item) => {
            return this.element[item.key] !== null && this.element[item.key] !== undefined && this.element[item.key] !== ''
          })
        : []
    },
    isEligible() {
      return !!this.list.filter((item) => {
        return this.element[item.key] !== null && this.element[item.key] !== undefined && this.element[item.key] !== ''
      }).length
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
    init() {
      this.show = false
      this.list = _.cloneDeep(this.data)
    },
  },
}
</script>
