<template>
  <div class="right-sidebar">
    <div class="title">Bileşikler</div>
    <div class="close-btn" @click="$emit('close')">
      <img src="../assets/icons/icons-close.svg" />
    </div>
    <div class="element-area" @drop="onDrop" @dragover="$event.preventDefault()">
      <div v-if="elements.length === 0" class="empty-element">
        <div>
          <img class="drop-icon" src="~/../assets/icons/drop.svg" />
        </div>
      </div>
      <div v-if="elements.length === 1" class="one-element">
        <div style="position: relative">
          <p-element :x="elements[0].xpos" :y="elements[0].ypos" :is-table-element="false" />
          <img class="remove-element-btn" src="~/../assets/icons/icons-close.svg" @click="$emit('remove', 0)" />
          <div class="round-count">
            <img v-if="elements[0].count === 1" src="~/assets/icons/icons-minus-gray.svg" class="minus-plus" />
            <img v-else src="~/assets/icons/icons-minus-white.svg" class="minus-plus" @click="$emit('incOrDec', { index: 0, value: -1 })" />
            <div class="count">
              {{ elements[0].count }}
            </div>
            <img src="~/assets/icons/icons-plus.svg" class="minus-plus" @click="$emit('incOrDec', { index: 0, value: 1 })" />
          </div>
        </div>
        <img class="swiper-divider-plus" src="~/assets/icons/icons-plus.svg" />
        <div>
          <img class="drop-icon" style="margin-left: 5px" src="~/../assets/icons/drop.svg" />
        </div>
      </div>
      <div v-if="elements.length > 1" style="display: flex; position: relative">
        <div class="shadow-left">
          <div class="swiper-arrow-left">
            <img src="~/../assets/icons/chevron-left.svg" @click="swiper.slidePrev()" />
          </div>
        </div>
        <div class="shadow-right">
          <div class="swiper-arrow-right">
            <img src="~/../assets/icons/chevron-right.svg" @click="swiper.slideNext()" />
          </div>
        </div>
        <swiper ref="swiper" :options="swiperOptions" style="padding: 28px; margin-top: -28px">
          <swiper-slide v-for="(element, index) in elements" :key="element.name_tr + index" style="display: flex" :style="index !== 0 ? 'margin-left: 0px' : null">
            <div style="position: relative">
              <p-element :x="element.xpos" :y="element.ypos" :is-table-element="false" />
              <img class="remove-element-btn" src="~/../assets/icons/icons-close.svg" @click="onRemove(index)" />
              <div class="round-count">
                <img v-if="element.count === 1" src="~/assets/icons/icons-minus-gray.svg" class="minus-plus" />
                <img v-else src="~/assets/icons/icons-minus-white.svg" class="minus-plus" @click="$emit('incOrDec', { index, value: -1 })" />
                <div class="count">
                  {{ element.count }}
                </div>
                <img src="~/assets/icons/icons-plus.svg" class="minus-plus" @click="$emit('incOrDec', { index, value: 1 })" />
              </div>
            </div>
            <img class="swiper-divider-plus" style="margin-left: -3px" src="~/assets/icons/icons-plus.svg" />
          </swiper-slide>
          <swiper-slide>
            <div>
              <img class="drop-icon" src="~/../assets/icons/drop.svg" />
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div v-if="suggestedCompounds.length > 0" class="suggestion-area">
      <div v-for="compound in suggestedCompounds" :key="compound.formula" v-fcf class="compound-suggestion" @click="setElementsByFormula(compound.formula)">
        {{ compound.formula }}
      </div>
    </div>
    <div v-if="foundCompound && foundCompound.formula" class="wrapper" style="color: white">
      <canvas id="smiley" width="200" height="80"></canvas>
      <div class="row">
        <div class="wrapper">
          <div class="menu-title">
            <div>Moleküler Ağırlık</div>
          </div>
          <div class="menu-value">{{ foundCompound.molecular_weight }}</div>
        </div>
      </div>
      <div v-if="foundCompound.dtp_names.length" class="row" style="cursor: pointer" :style="showDtpNames ? 'border-left: solid 3px #80fffc' : null" @click="showDtpNames = !showDtpNames">
        <div class="wrapper">
          <div class="menu-title" :style="showDtpNames ? 'margin-left: -3px' : null">
            <div>DTP İsim ve Alternatifleri</div>
          </div>
          <div class="menu-value">
            <img v-if="!showDtpNames" style="cursor: pointer" src="../assets/icons/icons-plus.svg" />
            <img v-else style="cursor: pointer" src="../assets/icons/icons-minus.svg" />
          </div>
        </div>
      </div>
      <div v-if="showDtpNames" style="max-height: 200px; overflow: auto">
        <div v-for="(name, index) in foundCompound.dtp_names" :key="index" class="dark-row">
          <div class="wrapper">
            <div class="menu-title">
              <div>
                {{ name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="wrapper">
          <div class="menu-title">
            <div>CAS Numarası</div>
          </div>
          <div class="menu-value">{{ foundCompound.cas_number }}</div>
        </div>
      </div>
      <div class="row">
        <div class="wrapper">
          <div class="menu-title">
            <div>Atom Stereomerkez Sayısı</div>
          </div>
          <div class="menu-value">{{ foundCompound.number_of_atom_stereocenters }}</div>
        </div>
      </div>
      <div class="row">
        <div class="wrapper">
          <div class="menu-title">
            <div>Bağ Stereomerkez Sayısı</div>
          </div>
          <div class="menu-value">{{ foundCompound.number_of_bond_stereocenters }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { Loading } from 'element-ui'
import SmilesDrawer from 'smiles-drawer'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper.scss'
import PElement from './Element'
export default {
  name: 'RightSideBar',
  components: { PElement, Swiper, SwiperSlide },
  props: {
    compoundElements: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      elements: [],
      showDtpNames: false,
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
        slidesPerView: 3,
        spaceBetween: 70,
        navigation: {
          nextEl: 'swiper-arrow-right',
          prevEl: 'swiper-arrow-left',
        },
      },
      foundCompound: {
        dtp_names: [],
      },
      suggestedCompounds: [],
      loadingInstance: null,
      timeoutCheck: null,
    }
  },
  computed: {
    swiper() {
      return this.$refs.swiper.$swiper
    },
  },
  watch: {
    compoundElements: {
      immediate: true,
      deep: true,
      handler() {
        this.elements = _.cloneDeep(this.compoundElements)
      },
    },
    elements: {
      deep: true,
      immediate: true,
      handler() {
        if (this.$store.getters.isCompoundFetched) {
          clearTimeout(this.timeoutCheck)
          this.timeoutCheck = setTimeout(() => {
            // add timeout check if necessary to render immediately
            this.getAvailableElements(this.elements)
          }, 250)
        }
      },
    },
    '$store.getters.isCompoundFetched'(newVal) {
      if (newVal) {
        this.getAvailableElements(this.elements)
        this.loadingInstance.close()
      }
    },
  },
  created() {
    if (!this.$store.getters.isCompoundFetched) {
      this.loadingInstance = Loading.service({ background: 'rgba(0, 0, 0, 0.7)', lock: true })
    }
  },
  beforeDestroy() {
    this.$store.commit('SET_PROBABLE_ELEMENTS', [])
  },
  methods: {
    setElementsByFormula(formula) {
      const formulaElements = Array.from(formula.matchAll(/[A-Z][a-z0-9]*/g)).map((match) => match[0])
      const elements = this.$store.getters.elements
      const compoundElements = []

      for (const formulaElement of formulaElements) {
        const [, symbol, count] = formulaElement.match(/([A-Za-z]+)(\d*)/)
        const element = elements.find((e) => e.symbol === symbol)

        if (element) {
          compoundElements.push({
            count: Number(count || 1),
            ...element,
          })
        }
      }

      this.elements = compoundElements
    },
    getAvailableElements(elements) {
      this.loadingInstance = Loading.service({ background: 'rgba(0, 0, 0, 0.7)', lock: true })
      this.foundCompound = {
        dtp_names: [],
      }
      const formulaRegexps = []
      elements.forEach((element, index) => {
        const formula = element.symbol
        if (element.count > 1 && index < elements.length - 1) {
          formulaRegexps.push(new RegExp(`${formula}[0-100].*`))
        } else {
          formulaRegexps.push(new RegExp(`^${formula}$`))
        }
      })
      const compounds = this.$store.getters.compounds
      const availableCompoundElements = []
      const finalized = []

      // this holds the suggestions with exact count matches
      const primaryCompoundSuggestions = new Map()

      // this holds a loose match; will match the atoms (symbols) only
      const secondaryCompoundSuggestions = new Map()

      const primaryRegExps = elements.map((element) => {
        if (element.count > 1) {
          // if there are more than 1 atoms, filter the compounds accordingly
          return new RegExp(`${element.symbol}${element.count}`)
        }

        // if there is only one atom, perform a negative look-ahead search to filter out compounds with multiple counts
        return new RegExp(`${element.symbol}(?![a-f0-9])`)
      })
      const secondaryRegExps = elements.map((e) => new RegExp(`${e.symbol}${e.count === 1 ? '' : e.count}`))

      const performMatch = (compound, regexps, map) => {
        let compoundHasAllElements = true

        for (const regex of regexps) {
          if (!regex.test(compound.formula)) {
            compoundHasAllElements = false
            break
          }
        }

        if (compoundHasAllElements) {
          if (map.size < 5) {
            map.set(compound.formula, compound)
          } else {
            let longestFormula = ''
            for (const key of map.keys()) {
              if (longestFormula.length < key.length) {
                longestFormula = key
              }
            }

            if (compound.formula.length < longestFormula.length) {
              map.delete(longestFormula)
              map.set(compound.formula, compound)
            }
          }
        }
      }

      compounds.forEach((compound) => {
        let symbol = ''
        let count = ''
        let flagElement = false
        const availableElements = []
        const chars = compound.formula.split('')
        chars.forEach((char, index) => {
          if (!flagElement && isNaN(char * 1) && char === char.toUpperCase()) {
            symbol += char
            flagElement = true
          } else if (isNaN(char * 1) && char === char.toLowerCase()) {
            symbol += char
          } else if (!isNaN(char * 1)) {
            count += char
          } else {
            availableElements.push({
              symbol,
              count: count === '' ? 1 : Number(count),
            })
            symbol = char
            count = ''
          }
          pushAvailableElement(index)
        })
        availableCompoundElements.push(availableElements)

        const forbidden = compound.formula.includes('?')

        if (!forbidden) {
          performMatch(compound, primaryRegExps, primaryCompoundSuggestions)
          performMatch(compound, secondaryRegExps, secondaryCompoundSuggestions)
        }

        function pushAvailableElement(index) {
          if (chars.length - 1 === index) {
            availableElements.push({
              symbol,
              count: count === '' ? 1 : Number(count),
            })
          }
        }
      })

      while (primaryCompoundSuggestions.size < 5) {
        const [key, value] = secondaryCompoundSuggestions.entries().next().value
        secondaryCompoundSuggestions.delete(key)
        primaryCompoundSuggestions.set(key, value)

        if (secondaryCompoundSuggestions.size === 0) {
          break
        }
      }

      const suggestedCompounds = Array.from(primaryCompoundSuggestions.values())
      suggestedCompounds.sort((a, b) => a.formula.length - b.formula.length)

      // filter out the current compound formula from the suggestions (since it is already being shown)
      this.suggestedCompounds = suggestedCompounds.filter((suggestion) => {
        let { formula } = suggestion

        for (const element of elements) {
          const re = new RegExp(`[A-Z0-9]?${element.symbol}${element.count === 1 ? '' : element.count}`)
          formula = formula.replace(re, '')
        }

        return formula.length
      })

      let exactCompound = null
      availableCompoundElements.forEach((availableElements) => {
        let isValidCompound = true
        elements.forEach((element) => {
          if (isValidCompound) {
            const found = _.find(availableElements, { symbol: element.symbol })
            const forbidden = availableElements.some((element) => element.symbol.includes('?'))
            isValidCompound = found && element.count <= found.count && !forbidden
          }
        })
        if (isValidCompound) {
          // console.log(availableElements)
          let isExact = true
          availableElements.forEach((ae) => {
            const found = _.find(elements, { symbol: ae.symbol })
            if (found && found.count < ae.count && !finalized.includes(found.symbol)) {
              finalized.push(found.symbol)
            } else if (!found && !finalized.includes(ae.symbol)) {
              finalized.push(ae.symbol)
            }
            if (isExact) {
              isExact = !!_.find(elements, { symbol: ae.symbol, count: ae.count })
            }
          })
          if (isExact && !exactCompound) {
            exactCompound = ''
            availableElements.forEach((ae) => {
              exactCompound += ae.symbol
              if (ae.count > 1) {
                exactCompound += ae.count
              }
            })
          }
        }
      })
      // console.log(finalized)
      this.$store.commit('SET_PROBABLE_ELEMENTS', finalized)
      if (exactCompound) {
        this.findAndSetCompound(exactCompound)
      } else {
        this.loadingInstance.close()
      }
    },
    findAndSetCompound(formula) {
      this.$axios
        .get(`/api/compounds/${formula}`)
        .then(({ data }) => {
          this.foundCompound = data.reduce((acc, current) => {
            if (!acc.formula) {
              acc.dtp_names = current.dtp_names ? current.dtp_names.split('\n') : []
              acc.formula = current.formula
              acc.molecular_weight = current.molecular_weight
              acc.structure_evaluation = current.structure_evaluation
              acc.cas_number = current.cas_number
              acc.number_of_atom_stereocenters = current.number_of_atom_stereocenters
              acc.number_of_bond_stereocenters = current.number_of_bond_stereocenters
              acc.smiles = current.smiles
            }
            return acc
          }, {})

          if (this.foundCompound.smiles) {
            this.$nextTick(() => {
              const smilesDrawer = new SmilesDrawer.Drawer({
                width: 200,
                height: 80,
                bondThickness: 1,
                fontSizeLarge: 8,
                fontSizeSmall: 6,
              })
              SmilesDrawer.parse(
                this.foundCompound.smiles,
                function (tree) {
                  // Draw to the canvas
                  smilesDrawer.draw(tree, 'smiley', 'light', false)
                  // Alternatively, draw to SVG:
                  // svgDrawer.draw(tree, 'output-svg', 'dark', false);
                },
                function (err) {
                  // eslint-disable-next-line no-console
                  console.log(err)
                }
              )
            })
          }
        })
        .finally(() => {
          this.loadingInstance.close()
        })
    },
    onRemove(index) {
      this.$nextTick(() => {
        this.$emit('remove', index)
      })
    },
    onDrop(event) {
      event.preventDefault()
      this.$emit('drop', event)
    },
    closeDtpNames() {
      this.showDtpNames = false
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.button-area {
  width: 40px;
  height: 16px;
  padding: 1px 3px;
  border-radius: 9px;
  background-color: #222938;
}

.right-sidebar {
  position: absolute;
  right: 0;
  width: 20vw;
  height: calc(100% - 153px);
  padding: 10px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  top: 53px;
  .title {
    font-size: 0.9vw;
    font-weight: bold;
    color: $white;
    margin-left: 1vw;
    text-align: left;
  }
  .wrapper {
    position: relative;
    overflow: auto;
    max-height: calc(100vh - 80px);
  }
}

.close-btn {
  position: absolute;
  cursor: pointer;
  width: 34px;
  height: 34px;
  padding: 10px 10px 21px;
  border-radius: 12px 0 0 12px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  left: -34px;
  top: 0;
  font-size: 12px;
  color: $white;
}

.element-area {
  margin-top: 36px;
  .empty-element {
    text-align: center;
  }
  .one-element {
    display: flex;
    justify-content: center;
  }
  .drop-icon {
    width: $elementBoxSize;
    height: $elementBoxSize;
  }
}

.remove-element-btn {
  position: absolute;
  top: -2px;
  right: -2px;
  cursor: pointer;
}

.round-count {
  width: 40px;
  height: 16px;
  padding: 1px 3px;
  border-radius: 9px;
  background-color: #222938;
  bottom: -2px;
  right: -2px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  .minus-plus {
    width: 10px;
    height: 14px;
    cursor: pointer;
  }
  .count {
    line-height: 14px;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    color: $white;
  }
}

.shadow-left {
  position: absolute;
  width: 2vw;
  height: 8.2vw;
  line-height: 8.2vw;
  text-align: center;
  z-index: 3;
  top: -25px;
  left: 0;
  background-image: linear-gradient(to right, #101319, rgba(16, 19, 25, 0));
}

.shadow-right {
  position: absolute;
  width: 2vw;
  height: 8.2vw;
  line-height: 8.2vw;
  text-align: center;
  z-index: 3;
  top: -25px;
  right: 0;
  background-image: linear-gradient(to right, rgba(16, 19, 25, 0) 0%, #101319 100%);
}

.swiper-arrow-left {
  z-index: 4;
  cursor: pointer;
}

.swiper-arrow-right {
  z-index: 4;
  cursor: pointer;
}

.swiper-container {
  padding: 26px;
}

.swiper-wrapper {
  .swiper-slide {
    margin-right: 1.6vw !important;
    width: 3.5vw !important;

    .swiper-divider-plus {
      width: 1vw;
      height: 1vw;
      align-self: center;
      margin-left: -3px;
    }
  }
}

.suggestion-area {
  display: flex;
  width: 20vw;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
  margin-top: 30px;

  .compound-suggestion {
    background: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    padding: 7px 22px;
    border-radius: 4px;
    user-select: none;
    cursor: pointer;
    color: #fff;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    &:hover {
      opacity: 1;
    }
  }
}
</style>
