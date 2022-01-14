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
      <div :key="'nested_parent' + index + item.key" class="dark-row" :style="calculateRowStyle(item)" @click="toggleRow(item)">
        <div class="wrapper">
          <div class="menu-title" :style="!item.key && !item.isHidden ? 'margin-left: -3px' : null">
            <div>
              {{ item.label }}
            </div>
          </div>
          <div class="menu-value">
            <template v-if="!item.key">
              <img v-if="item.isHidden" style="cursor: pointer" src="../assets/icons/icons-plus.svg" />
              <img v-else style="cursor: pointer" src="../assets/icons/icons-minus-purple.svg" />
            </template>
            <template v-else>
              <el-tooltip v-if="element[item.key] && element[item.key].length > textLimit" popper-class="tooltip" effect="dark" :content="element[item.key]" placement="top">
                <span>{{ element[item.key].slice(0, textLimit) }}...</span>
              </el-tooltip>
              <template v-else>
                {{ item.type === 'Boolean' ? (element[item.key] ? 'Evet' : 'Hayır') : element[item.key] }}
              </template>
            </template>
          </div>
        </div>
      </div>
      <template v-if="!item.key && !item.isHidden">
        <div v-for="(innerItem, lindex) in item.values" :key="'nested' + lindex + innerItem.key" class="darker-row">
          <div class="wrapper">
            <div class="menu-title">
              <div>
                {{ innerItem.label }}
              </div>
            </div>
            <div v-if="element[innerItem.key] && element[innerItem.key].length > textLimit" class="menu-value">
              <el-tooltip popper-class="tooltip" effect="dark" :content="element[innerItem.key]" placement="top">
                <span>{{ element[innerItem.key].slice(0, textLimit) }}...</span>
              </el-tooltip>
            </div>
            <div v-else class="menu-value">{{ element[innerItem.key] }}</div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'NestedBarItem',
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
      textLimit: 18,
      show: false,
      list: [],
    }
  },
  computed: {
    filteredList() {
      return this.show
        ? this.list
            .filter((item) => {
              if (item.key) {
                return this.element[item.key] !== null && this.element[item.key] !== undefined && this.element[item.key] !== ''
              }
              return true
            })
            .map((item) => {
              if (!item.key) {
                item.values = item.values.filter((value) => {
                  return this.element[value.key] !== null && this.element[value.key] !== undefined && this.element[value.key] !== ''
                })
              }
              return item
            })
        : []
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
    calculateRowStyle(item) {
      let style = null
      if (!item.key) {
        style = 'cursor: pointer;'
        if (!item.isHidden) {
          style += 'border-left: solid 3px #aa80ff'
        }
      }
      return style
    },
    toggleRow(item) {
      if (!item.key) {
        item.isHidden = !item.isHidden
      }
    },
    init() {
      this.show = false
      this.list = _.cloneDeep(this.data).map((item) => {
        if (!item.key) {
          item.isHidden = true
        }
        return item
      })
    },
    close() {
      this.show = false
      this.list.forEach((item) => {
        if (!item.key) {
          item.isHidden = true
        }
      })
    },
  },
}
</script>
