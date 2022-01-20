<template>
  <div style="display: flex">
    <side-bar v-if="showSideBar && selectedElement" :element="selectedElement" @close="showSideBar = false" />
    <div class="main">
      <div style="margin: 35px 0 30px 40px; display: flex">
        <div style="position: relative">
          <slider style="position: absolute; top: 26px; left: 11.6vw" />
          <div v-for="y in 9" :key="y" style="display: flex" :style="y === 8 ? 'margin-top: 10px' : null">
            <p-element
              v-for="x in 18"
              :key="x"
              :x="x"
              :y="y"
              :selected-block="selectedBlock"
              :selected-category="selectedCategory"
              :search-text="$store.state.searchText ? $store.state.searchText.toLowerCase() : null"
              @selectElement="selectElement"
              @dragstart="selectedElementForCompound = $event"
            />
          </div>
          <div class="sample">
            <div class="group-no">Anahtar</div>
            <div class="wrapper">
              <div class="number">Atom No</div>
              <div class="symbol">Sembol</div>
              <div class="name">İsim</div>
              <div class="atomic-mass">Atom Ağırlığı</div>
            </div>
          </div>
        </div>
        <div style="margin: 60px 0 0 15px">
          <div class="filter-title">Filtre</div>
          <div class="filter-sub-title" style="margin-top: 23px">Bloğa Göre</div>
          <div class="group-container" style="margin-top: 6px">
            <img v-if="selectedBlock === 's'" src="~/assets/icons/s-block-active.svg" class="s-block" @click="selectBlock('s')" />
            <img v-else src="~/assets/icons/s-block.svg" class="s-block" @click="selectBlock('s')" />
            <img v-if="selectedBlock === 'd'" src="~/assets/icons/d-block-active.svg" class="d-block" @click="selectBlock('d')" />
            <img v-else src="~/assets/icons/d-block.svg" class="d-block" @click="selectBlock('d')" />
            <img v-if="selectedBlock === 'p'" src="~/assets/icons/p-block-active.svg" class="p-block" @click="selectBlock('p')" />
            <img v-else src="~/assets/icons/p-block.svg" class="p-block" @click="selectBlock('p')" />
            <img v-if="selectedBlock === 'f'" src="~/assets/icons/f-block-active.svg" class="f-block" @click="selectBlock('f')" />
            <img v-else src="~/assets/icons/f-block.svg" class="f-block" @click="selectBlock('f')" />
          </div>
          <div class="filter-sub-title" style="margin-top: 20px">Kategoriye Göre</div>
          <div class="filter-sub-title-smaller">Metaller</div>
          <div class="category-type-filter-wrapper alkalineMetal" @click="selectCategory('alkalineMetal')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'alkalineMetal' ? 'active' : null">Alkali Metaller</div>
          </div>
          <div class="category-type-filter-wrapper alkalineEarthMetal" @click="selectCategory('alkalineEarthMetal')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'alkalineEarthMetal' ? 'active' : null">Toprak Alkali Metaller</div>
          </div>
          <div class="category-type-filter-wrapper transitionMetal" @click="selectCategory('transitionMetal')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'transitionMetal' ? 'active' : null">Geçiş Metali</div>
          </div>
          <div class="category-type-filter-wrapper metal" @click="selectCategory('metal')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'metal' ? 'active' : null">Geçiş Sonrası Metali</div>
          </div>
          <div class="category-type-filter-wrapper lanthanide" @click="selectCategory('lanthanide')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'lanthanide' ? 'active' : null">Lantanitler</div>
          </div>
          <div class="category-type-filter-wrapper actinide" @click="selectCategory('actinide')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'actinide' ? 'active' : null">Aktinitler</div>
          </div>
          <div class="filter-sub-title-smaller">Metalsiler</div>
          <div class="category-type-filter-wrapper halfMetal" @click="selectCategory('halfMetal')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'halfMetal' ? 'active' : null">Metalsi</div>
          </div>

          <div class="filter-sub-title-smaller">Ametaller</div>
          <div class="category-type-filter-wrapper nobleGas" @click="selectCategory('nobleGas')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'nobleGas' ? 'active' : null">Soygazlar</div>
          </div>
          <div class="category-type-filter-wrapper nonmetallic" @click="selectCategory('nonmetallic')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'nonmetallic' ? 'active' : null">Reaktif Ametal</div>
          </div>
          <div class="filter-sub-title-smaller">Diğer</div>
          <div class="category-type-filter-wrapper other" @click="selectCategory('other')">
            <div class="round" />
            <div class="category-type-filter" :class="selectedCategory === 'other' ? 'active' : null">Bilinmiyor</div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showRightSideBar" class="right-sidebar" @drop="onDrop" @dragover="$event.preventDefault()">
      <div class="title" style="margin: 10px 0 0 0">Bileşikler</div>
      <div style="margin-top: 222px">
        <img style="margin-left: 7px" src="~/assets/icons/drop.svg" />
      </div>
      <div class="text-area" style="margin: 10px">Element sürükleyip bırakarak bileşikler üretin.</div>
    </div>
    <right-side-bar
      v-else
      :compound-elements="compoundElements"
      @drop="onDrop"
      @remove="onRemove"
      @close="
        showRightSideBar = false
        compoundElements = []
      "
      @incOrDec="incOrDecCompoundElements"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import MobileDetect from 'mobile-detect'
import PElement from '../components/Element'
import Slider from '../components/Slider'
import SideBar from '../components/SideBar'
import RightSideBar from '../components/RightSideBar'

export default {
  components: { SideBar, RightSideBar, Slider, PElement },
  asyncData({ error, params, app, store, req }) {
    if (req) {
      const md = new MobileDetect(req.headers['user-agent'])
      store.commit('SET_IS_MOBILE', md.mobile() || md.tablet() || md.phone())
    }
    return app.$axios
      .get(`/api/elements`)
      .then(({ data }) => {
        if (!data) {
          return error({ statusCode: 404 })
        }
        store.commit('SET_ELEMENTS', data)
        return {
          selectedBlock: null,
          selectedCategory: null,
          showSideBar: false,
          showRightSideBar: false,
          selectedElement: null,
          compoundElements: [],
        }
      })
      .catch((err) => {
        return error({ statusCode: 404, message: err })
      })
  },
  data() {
    return {
      visible: false,
      selectedBlock: null,
      selectedCategory: null,
      showSideBar: false,
      showRightSideBar: false,
      selectedElement: null,
      compoundElements: [],
      selectedElementForCompound: null,
    }
  },
  watch: {
    '$store.state.searchText'(newVal) {
      if (newVal !== null) {
        this.selectedBlock = null
        this.selectedCategory = null
      }
    },
  },
  created() {
    this.$axios
      .get(`/api/compounds`)
      .then(({ data }) => {
        this.$store.commit('SET_COMPOUNDS', data)
      })
      .finally(() => {
        this.$store.commit('SET_COMPOUNDS_FETCHED', true)
      })
    this.$axios
      .get(`/api/isotopes`)
      .then(({ data }) => {
        this.$store.commit('SET_ISOTOPES', data)
      })
      .finally(() => {
        this.$store.commit('SET_ISOTOPES_FETCHED', true)
      })
  },
  methods: {
    incOrDecCompoundElements(payload) {
      this.compoundElements[payload.index].count += payload.value
    },
    selectElement($event) {
      if (this.showSideBar) {
        this.showSideBar = this.selectedElement && this.selectedElement.number !== $event.number
      } else {
        this.showSideBar = !!$event.number
      }
      this.selectedElement = $event
    },
    onRemove(index) {
      this.compoundElements.splice(index, 1)
      if (!this.compoundElements.length) {
        this.showRightSideBar = false
      }
    },
    onDrop(event) {
      event.preventDefault()
      const lastIndex = this.compoundElements.length - 1
      if (lastIndex > -1 && this.compoundElements[lastIndex].number === this.selectedElementForCompound.number) {
        this.compoundElements[lastIndex].count++
      } else {
        this.compoundElements.push({
          count: 1,
          ..._.cloneDeep(this.selectedElementForCompound),
        })
      }
      this.showRightSideBar = true
    },
    selectBlock(block) {
      this.selectedBlock = this.selectedBlock === block ? null : block
      this.selectedCategory = null
      this.$nextTick(() => {
        this.$store.commit('SET_SEARCH_TEXT', null)
      })
    },
    selectCategory(category) {
      this.selectedCategory = this.selectedCategory === category ? null : category
      this.selectedBlock = null
      this.$nextTick(() => {
        this.$store.commit('SET_SEARCH_TEXT', null)
      })
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';

.sample {
  position: absolute;
  bottom: 28px;
  left: 50px;
  width: $elementBoxSize * 1.5;
  height: $elementBoxSize * 1.5;
  margin: 5px 0 0;
  padding: 5px;
  border-radius: 6px;
  background-image: linear-gradient(136deg, #80fffc 0%, #5ab3b0);
  .group-no {
    color: #878c97;
    font-size: 0.6em;
    font-weight: normal;
    position: absolute;
    width: 56px;
    top: -1.1vw;
  }
  .wrapper {
    margin: 4px 3px;
  }
  .number {
    opacity: 0.6;
    font-size: 0.5em;
    color: #222938;
  }
  .symbol {
    font-size: 0.9em;
    font-weight: 800;
    margin-top: 10px;
    color: #222938;
  }
  .name {
    font-size: 0.5em;
    font-weight: 600;
    color: #222938;
    margin-top: 7px;
  }
  .atomic-mass {
    opacity: 0.6;
    font-size: 0.5em;
    margin-top: 1px;
  }
}

.main {
  width: 100%;
  position: relative;
}

.logo {
  height: 100%;
}

.cell-title {
  text-align: center;
  font-size: 10px;
  color: $gray;
}

.filter-title {
  font-size: 0.9em;
  font-weight: 800;
  color: $white;
}

.filter-sub-title {
  font-size: 0.6em;
  font-weight: 600;
  color: #cdcfd4;
}

.filter-sub-title-smaller {
  font-size: 0.5em;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: #bec1c6;
}

.category-type-filter-wrapper {
  display: flex;
  margin-bottom: 0.4em;
  margin-top: 0.2em;
  height: 0.5em;
  cursor: pointer;
  .round {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin: auto 0;
  }
  .category-type-filter {
    margin-left: 3px;
    font-size: 0.6em;
    line-height: 10px;
    font-weight: normal;
    color: $gray;
  }
}

.group-container {
  position: relative;
  width: 7.03vw;
  height: 4.32vw;
  .s-block {
    height: 3.15vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .d-block {
    height: 1.61vw;
    left: 1.47vw;
    top: 1.54vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .p-block {
    height: 2.49vw;
    left: 4.61vw;
    top: 0.66vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .f-block {
    height: 0.88vw;
    bottom: 0.15vw;
    right: 0;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
}

.right-sidebar {
  position: absolute;
  right: 0;
  width: 11vw;
  height: calc(100% - 153px);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  text-align: center;

  .title {
    font-size: 0.6em;
    font-weight: bold;
    color: $white;
    text-align: center;
  }
  .text-area {
    font-size: 0.5em;
    font-weight: normal;
    text-align: center;
    color: #bec1c6;
  }
}
</style>
