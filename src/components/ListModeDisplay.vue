<template>

  <div class="list-element" v-for="element in elements" :key="element.number">
    <div :id="'list'+element.number" @click.prevent="toggleModal($event, element)"> <ListItem :locale="locale" :heat_view="heatView_List" :heat_value="kelvin_setByUser" :element="element">{{ element }}</ListItem> </div>
  </div>
  
  <div class="bottomMenu noselect">

    <div @click.prevent="toggleBottomPanel" class="noselect circleSettings"> <img id="bottomPanelIcon" :src="this.logo" alt="Periodum Logo"> </div>

    <div class="bottomMenuPreviews">
      <!-- Arama Önizleme -->
      <section class="previewSection flex-between" v-if="searchView_List">
        <div class="leanLeft" id="searchResultCount_List">{{ this.locale.sub_menu.el_count }} {{ visibleElementCount }}</div>
        <div class="leanRight" id="languageSelection_List"></div>
      </section>

      <!-- Sıcaklık Önizleme -->
      <section class="previewSection flex-between" v-if="heatView_List">
        <div class="flex-between">
          <input class="align-center" type="number" id="heatinput" v-model.lazy="heat_toDisplay"
            @focus="disableKeyboard()"
            @click="disableKeyboard()"
            @change="sliderChange_List()"
          >

          <div class="dropdown">
            <button class="dropdown-button metricmenu_list">K</button>
            <div class="dropdown-content">
              <a @click="convertUnit($event)" href="#">K</a>
              <a @click="convertUnit($event)" href="#">C</a>
              <a @click="convertUnit($event)" href="#">F</a>
            </div>
          </div>
        </div>

        <div @click.prevent="filterByState_List($event)" class="leanRight heatSVGs">
          <div class="fade btn" id="solid_list">     <img :src="states.solid"/></div>
          <div class="fade btn inactive" id="liquid_list">    <img :src="states.liquid"/></div>
          <div class="fade btn inactive" id="gas_list">       <img :src="states.gas"/></div>
          <div class="fade btn" id="uncertain_list"> <img :src="states.uncertain"/></div>
        </div>
      </section>

      <!-- Grup Önizleme -->
      <section class="previewSection flex-between" v-if="groupView_List">
        <div class="leanLeft">
          {{ this.locale.sub_menu.el_count }} {{ visibleElementCount }}
        </div>
        <div class="leanRight" id="currentFilter">
          {{ lastChosenFilter_List }}
        </div>
        <!-- <button @click="toLandscape()">[TEST]</button> -->
      </section>

      <!-- Yardım Önizleme -->
      <!-- <section class="previewSection flex-between" v-if="infoView_List">
        <div class="leanLeft">
          Element sayısı: {{ visibleElementCount }}
        </div>
        <div class="leanRight" id="currentFilter">
          {{ lastChosenFilter_List }}
        </div>
      </section> -->
      
    </div>
  
    <div class="bottomMenuContent inactive">
      <div class="tabbedNav fade flex-between">
          <button class="tab btn" id="search_list"    :style="[searchView_List  ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toggleTablePanel('search')">{{ this.locale.sub_menu.search }}</button>
          <button class="tab btn" id="heatmode_list"  :style="[heatView_List    ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toggleTablePanel('heat')">{{ this.locale.sub_menu.heat }}</button>
          <button class="tab btn" id="groupmode_list" :style="[groupView_List   ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toggleTablePanel('group')">{{ this.locale.sub_menu.group }}</button>
          <button class="tab btn" id="infomode_list"  :style="[infoView_List    ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toggleTablePanel('info')">{{ this.locale.sub_menu.help }}</button>
          <!-- <button class="btn" id="compoundmode" @click="toggleTablePanel('compound')">Bileşik</button> -->
      </div>
      
      <div class="modules flex-between">
        <!-- Arama Modülü -->
        <div v-show="searchView_List">
            <div class="search">
              <input type="text" name="search" id="listSearch" :placeholder="this.locale.misc.elementSearch_text" autocomplete="off"
                @input="listSearching($event)"
                @focus="disableKeyboard()"
                @click="disableKeyboard()">
            </div>
            <Keyboard class="fade" />
        </div>

        <!-- Sıcaklık Modülü -->
        <div v-show="heatView_List">
          <input @input="sliderChange_List()" v-model="kelvin_setByUser" type="range" step=".1" :min="minScale_List" :max="maxScale_List" id="heat" >
        
          <Numpad class="fade" />
        </div>

        <!-- Grup Modülü -->
        <div v-show="groupView_List">
          <section @click="viewFilter($event)" class="advancedFilter text-white">
            <ul class="advancedFilterList float">
              <h6 class="listTitle">{{ locale.elements.categories.metals.main }}</h6>
              <li id="alkaline_metals">{{ locale.elements.categories.metals.alkaline_metal }}</li>
              <li id="alkaline_earth_metal">{{ locale.elements.categories.metals.alkaline_earth_metal }}</li>
              <li id="transition_metal">{{ locale.elements.categories.metals.transition_metal }}</li>
              <li id="post_transition_metal">{{ locale.elements.categories.metals.post_transition_metal }}</li>
              <li id="lanthanides">{{ locale.elements.categories.metals.lanthanides }}</li>
              <li id="actinides">{{ locale.elements.categories.metals.actinides }}</li>
            </ul>
            <ul class="advancedFilterList">
              <h6 class="listTitle">{{ locale.elements.categories.metalloid.main }}</h6>
              <li id="metalloid">{{ locale.elements.categories.metalloid.metalloid }}</li>
            </ul>
            <ul class="advancedFilterList">
              <h6 class="listTitle">{{ locale.elements.categories.nonmetals.main }}</h6>
              <li id="noble_gas">{{ locale.elements.categories.nonmetals.noble_gases }}</li>
              <li id="reactive_nonmetal">{{ locale.elements.categories.nonmetals.reactive_nonmetals }}</li>
            </ul>
            <ul class="advancedFilterList">
              <h6 class="listTitle">{{ locale.elements.categories.other.main }}</h6>
              <li id="unknown">{{ locale.elements.categories.other.unknown }}</li>
            </ul>
          </section>
          <section @click="viewGroup($event)" class="groupSVGs">
            <img :src="groups_List.s" id="s" class="s-block_List">
            <img :src="groups_List.d" id="d" class="d-block_List">
            <img :src="groups_List.p" id="p" class="p-block_List">
            <img :src="groups_List.f" id="f" class="f-block_List">
          </section>
        </div>

        <!-- Yardım Modülü -->
        <div class="info-content" v-show="infoView_List">
          <div>
            <hr class="divider">
            <h2>Element</h2>
            <hr class="divider">
            <span>Özet Bilgi</span>
            <p>Element kutularının üzerine tıklayarak özet bilgi edinebilirsin.</p>
            <span>Detaylı Bilgi</span>
            <p>Element kutularının alt kısmındaki "☰ Detaylar" butonuna tıklayarak, element hakkındaki tüm bilgiye erişebilirsin.</p>
            <hr class="divider">

            <h2>Açılır Menü</h2>
            <hr class="divider">
            <span>Arama</span>
            <p>Elementin Türkçe ve İngilizce adı, atomik kütlesi veya numarası ile arama yapabilirsin.</p>
            <span>Sıcaklık</span>
            <p>Kelvin, Celcius ve Fahrenheit birimleri üzerinden sıcaklığı değiştirip, elementlerin hallerini inceleyebilir ve filtreleyebilirsin.</p>
            <span>Grup</span>
            <p>Elementleri, ait oldukları bloklara ve kategorilere göre filtreleyebilirsin.</p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  
  <div class="thanks mute flex-start margin">
    <a class="fade" href="https://bionluk.com" target="_blank">
    <img id="thanks-bionluk" src="../resources/img/bionluk.png" alt="bionluk logo">
    </a>
    <span>{{ locale.misc.thanks }}</span>
  </div>
</template>

<script>
import ListItem from '@/components/ListModeItem.vue'
import Keyboard from '@/addons/v_keyboard.vue'
import Numpad from '@/addons/v_numpad.vue'

export default {
  components: { ListItem, Keyboard, Numpad },
  emits: ["getElement"],
  props: { elements: Object, locale: Object },
  data() {
    return {
      searchView_List: true,
      groupView_List: false,
      heatView_List: false,
      infoView_List: false,
      panelView_List: false,
      minScale_List: 0,
      maxScale_List: 7273,
      lastChosenFilter_List: '',
      visibleElementCount: 119,
      groups_List: {
        s:          require("../resources/img/groups/s.svg"),
        s_selected: require("../resources/img/groups/s_selected.svg"),
        d:          require("../resources/img/groups/d.svg"),
        d_selected: require("../resources/img/groups/d_selected.svg"),
        p:          require("../resources/img/groups/p.svg"),
        p_selected: require("../resources/img/groups/p_selected.svg"),
        f:          require("../resources/img/groups/f.svg"),
        f_selected: require("../resources/img/groups/f_selected.svg"),
      },
      states: {
        solid:      require("../resources/img/states/solid.svg"),
        liquid:     require("../resources/img/states/liquid.svg"),
        gas:        require("../resources/img/states/gas.svg"),
        uncertain:  require("../resources/img/states/uncertain.svg"),
      },
      logo: require("../resources/img/panel.svg"),
      metric_Initials: {
        K: 298.15,
        C: 25,
        F: 77
      },
      kelvin_setByUser: 298.15,
      heat_toDisplay: 298.15,
      metricConvertion: {
        C: 'unit => unit-273.15',
        F: 'unit => 9/5*unit-459.67'
      },
      flag: {
        tr:  require("../resources/locale/flags/tr.svg"),
        en:  require("../resources/locale/flags/en.svg"),
      }
    }
  },
  methods: {
    toggleModal($event, el) {
      if($event.target.classList.contains('modal-open') || $event.target.classList.contains('details-button')) {
        this.$emit('getElement', el)
        document.body.classList.add('active_modal');
      }
    },
    defaultView() {
      this.summaryView = false;
      this.heatView_List = false; this.kelvin_setByUser = 0;
      this.groupView_List = false;
      this.compoundView_List = false;
      this.searchView_List = false;
      this.infoView_List = false;
    },
    toggleTablePanel(mode) {
      this.defaultView();
      if (mode === 'summary') {
        this.summaryView = true;
      }
      if (mode === 'heat') {
        this.heatView_List = true;
        this.kelvin_setByUser = 298.15;
        this.heat_toDisplay = this.kelvin_setByUser;
        
        this.metric_Initials = {
          K: 298.15,
          C: 25,
          F: 77
        }
      }
      if (mode === 'group') {
        this.groupView_List = true;
      }
      if (mode === 'compound') {
        this.compoundView_List = true;
      }
      if (mode === 'search') {
        this.searchView_List = true;
      }
      if (mode === 'info') {
        this.infoView_List = true;
      }
    },
    toggleBottomPanel() {
      const PANEL = document.querySelector('.bottomMenu');
      const PREVIEW = document.querySelector('.bottomMenuPreviews')
      if (!this.panelView_List) {
        PANEL.style.bottom = '0rem'
        this.panelView_List = true
        document.querySelector('.bottomMenuContent').classList.remove('inactive')
        document.querySelector('.circleSettings').classList.add('activated')
        
        PREVIEW.style.position = 'absolute'
        PREVIEW.style.width = '91vw'
        PREVIEW.style.marginTop = '5rem'
        
        
        // document.body.classList.add('active_modal');
    // position: absolute;
    // width: 95%;
    // margin-top: 5rem;

        // document.querySelector('.modules').appendChild(PREVIEW)
      } else {
        PANEL.style.bottom = '-20rem'
        this.panelView_List = false
        document.querySelector('.bottomMenuContent').classList.add('inactive')
        document.querySelector('.circleSettings').classList.remove('activated')
        
        PREVIEW.style.position = null
        PREVIEW.style.width = '98vw'
        PREVIEW.style.marginTop = '1rem'
        // document.querySelector('.bottomMenu').appendChild(PREVIEW)
        // document.body.classList.remove('active_modal');
      }
    },
    listSearching($event) {
      const INPUT = $event.target.value.toLowerCase()
      const KEY = document.querySelector('.keyElement')
      
      const CONDITIONS = function(el) {
        let searchIn = []
        if (!INPUT.includes('.')) {
          searchIn = [
            el.querySelector('.number_List').textContent,
            el.querySelector('.names').textContent,
            el.querySelector('.symbol').textContent,
            el.querySelector('.atomic').textContent.split('.')[0],
          ].join('').toLowerCase()
        } else {
          searchIn = [
            el.querySelector('.atomic').textContent
          ].join('').toLowerCase()
        }
        
        return INPUT !== ''
        && searchIn.includes(INPUT)
      }

      document.querySelectorAll('.list-element').forEach(function(element) {
        element.style.removeProperty('filter');
        if (CONDITIONS(element)) {
          element.style.filter = 'drop-shadow(0 0 .3vw white)'
          element.classList.remove('inactive')
        }
        else {
          if (INPUT === '') {
            element.classList.remove('inactive')
            KEY.classList.remove('inactive')
          }
          else {
            element.style.removeProperty('filter');
            element.classList.add('inactive')
            KEY.classList.add('inactive')
          }
        }
      })
      this.visibleElementCount = document.querySelectorAll('.list-element:not(.inactive)').length
      
      // // Menü önizleme kısmı
      // const PREVIEW_INFO = document.querySelector('#searchInput_List')
      // // Menü önizleme kısmını güncelle
      // PREVIEW_INFO.textContent = `${INPUT}`
    },
    filterByState_List($event) {
      if (!this.heatView_List) return
      // if ($event.target.classList.contains('heatSVGs')) return;

      try {
        const ID = $event.target.id === '' ? $event.target.closest('.btn').id : $event.target.id

        const STATES = {
          solid_list: 'solid',
          gas_list: 'gas',
          uncertain_list: 'uncertain',
          liquid_list: 'liquid',
        };

        if (document.querySelector(`.${ID}`).classList.contains('inactive')) {
          Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
            el.removeAttribute('class')
            el.classList.add('inactive')
            el.classList.add(`container_List`)
            el.classList.add(state)
          }))
        }

        Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
          el.removeAttribute('class')
          el.classList.add('inactive')
          el.classList.add(`container_List`)
          el.classList.add(state)
        }))

        document.querySelectorAll(`.${ID}`).forEach(function(el) {
          el.removeAttribute('class')
          el.classList.add(`container_List`)
          el.classList.add(ID)
        });
      }
      catch (err) {
        console.log(err)
      }
    },
    sliderChange_List() {
      const STATES = {
        uncertain: 'uncertain',
        solid: 'solid',
        gas: 'gas',
        liquid: 'liquid',
      };

      Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
        el.removeAttribute('class')
        el.classList.add(`container`)
        el.classList.add(`${state}`)
        el.classList.remove('mute')
        el.classList.remove('glow')
      }))
      
      this.metric_Initials.K = this.kelvin_setByUser

      const toC = eval(this.metricConvertion.C)
      const toF = eval(this.metricConvertion.F)

      this.metric_Initials.C = toC(Number(this.metric_Initials.K))
      this.metric_Initials.F = toF(Number(this.metric_Initials.K))

      const SELECTION = document.querySelector('.metricmenu_list').textContent
      this.heat_toDisplay = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;

      const BUTTON_UNCERTAIN = document.querySelector('#uncertain_list')
      const BUTTON_SOLID = document.querySelector('#solid_list')
      const BUTTON_LIQUID = document.querySelector('#liquid_list')
      const BUTTON_GAS = document.querySelector('#gas_list')

      document.querySelectorAll('.uncertain_list').length >= 1
      ? BUTTON_UNCERTAIN.classList.remove('inactive') : BUTTON_UNCERTAIN.classList.add('inactive')
      document.querySelectorAll('.liquid_list').length >= 1
      ? BUTTON_LIQUID.classList.remove('inactive') : BUTTON_LIQUID.classList.add('inactive')
      document.querySelectorAll('.gas_list').length >= 1
      ? BUTTON_GAS.classList.remove('inactive') : BUTTON_GAS.classList.add('inactive')
      document.querySelectorAll('.solid_list').length >= 1
      ? BUTTON_SOLID.classList.remove('inactive') : BUTTON_SOLID.classList.add('inactive')

    },
    disableKeyboard() {
      if (typeof screen.orientation !== 'undefined') {
        document.activeElement.blur();
      }
    },
    viewGroupStylizer() {
      // const FILTERS = document.querySelector('.advancedFilter')
      const categoryColors = {
        'alkaline_metals': '#ffaf80',          // turuncu
        'alkaline_metals_shade': '#ef9851',

        'alkaline_earth_metal': '#80ff8e',   // yeşi
        'alkaline_earth_metal_shade': '#44e053',

        'transition_metal': '#ffef80',          // sarı
        'transition_metal_shade': '#c1b45f',

        'post_transition_metal': '#80d5ff',  // mavi
        'post_transition_metal_shade': '#52c5fe',

        'metalloid': '#8095ff',               // slate
        'metalloid_shade': '#526efe',

        'reactive_nonmetal': '#ff80d4',        // pembe
        'reactive_nonmetal_shade': '#fe52c4',

        'noble_gas': '#aa80ff',               // lila
        'noble_gas_shade': '#8b52fe',

        'lanthanides': '#c3ff80',              // yeşil
        'lanthanides_shade': '#adfe52',

        'actinides': '#80fffc',               // teal
        'actinides_shade': '#52fefa',

        'unknown': '#fff',               // beyaz
        'unknown_shade': '#e0e0e0'
      }
      document.querySelectorAll('li').forEach(function(item) {
        item.style.color = categoryColors[item.id.replaceAll('-', ' ')]
      })
      // return {'color': this.categoryColors[$event.target.id.replaceAll('-', ' ')]}
    },
    viewFilter($event) {
      const CLICKED = $event.target.id
      if (CLICKED === '') return;


      if (this.lastChosenFilter === CLICKED) {
        document.querySelectorAll('.list-element').forEach(function(el) {
          const ELEMENT = el.querySelector('.container_List');
          ELEMENT.classList.remove('inactive')
        })
        this.lastChosenFilter = ''
        
        this.visibleElementCount = document.querySelectorAll('.container_List:not(.inactive)').length

        document.querySelector('#currentFilter').textContent = ''
        return
      } document.querySelector('#currentFilter').textContent = `${this.locale.modules.group}: ` + $event.target.textContent

      document.querySelectorAll('.list-element').forEach(function(el) {
        const ELEMENT = el.querySelector('.container_List');
        const category_List = el.querySelector('.category_List');
        
        if (category_List.textContent === CLICKED.replaceAll('-', ' ')) {
          ELEMENT.classList.remove('inactive')
        }
        else {
          ELEMENT.classList.add('inactive')
        }
      })
      this.visibleElementCount = document.querySelectorAll('.container_List:not(.inactive)').length
      this.lastChosenFilter = CLICKED
    },
    viewGroup($event) {
      const TARGET = $event.target;
      if (TARGET.classList.contains('groupSVGs')) return
      
      document.querySelectorAll('.list-element').forEach(function(el) {
        const ELEMENT = el.querySelector('.container_List');
        ELEMENT.classList.remove('inactive')
      });

      const allBlocks = document.getElementsByClassName('block_List');
      
      // TRYCATCH OLMADAN ÇALIŞIR HALE GETİR
      const view = function(allBlocks, _default) {
        for (const block_List of allBlocks) {
          if (_default) {
            block_List.parentElement.parentElement.parentElement.classList.add('inactive')
          }
          else { 
            if (block_List.textContent === TARGET.id) {
              block_List.parentElement.parentElement.parentElement.classList.remove('inactive');
            }
            else {
              false
            }
          }
        }
      }
      view(allBlocks, true);

      // Toggle
      if (TARGET.src.includes('selected')) {
        TARGET.src = this.groups_List[`${TARGET.id}`]
        
        document.querySelectorAll('.list-element').forEach(function(el) {
          const ELEMENT = el.querySelector('.container_List');
          ELEMENT.classList.remove('inactive')
        });
        this.visibleElementCount = document.querySelectorAll('.container_List:not(.inactive)').length
        return;
      }
      
      // Only the selected
      TARGET.parentElement.childNodes.forEach(group => group.src = this.groups_List[`${group.id}`])
      TARGET.src = this.groups_List[`${TARGET.id}_selected`]
        
      // Display on table
      view(allBlocks, false);
      this.visibleElementCount = document.querySelectorAll('.container_List:not(.inactive)').length
    },
    convertUnit($event) {
      const CLICKED = $event.target;
      const SELECTION = CLICKED.textContent
      document.querySelector('.metricmenu_list').textContent = SELECTION

      this.kelvin_setByUser = this.metric_Initials.K
      document.querySelector('#heatinput').value = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;

      this.heat_toDisplay = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;
    }
  },
  mounted() {
    this.viewGroupStylizer()
  }
}
</script>

<style lang="scss" scoped>
  
  .thanks {
    width: 90vw;
      
    margin-top: 3vw;
    #thanks-bionluk {
      width: 10vw;
      margin-right: 5vw;
    }

    span {
      font-size: 1rem;
      color: white;
    }
    z-index: -1;
  }
  #listSearch {
    margin-top: 3rem;
    width: 85vw;
    font-size: 2.5vw;
    border: 0;
    border-bottom: 1px solid #e5bb09;
  }
  .circleSettings {
    #bottomPanelIcon {
      transform: translateY(15%);
      width: 2rem;
      height: 3rem;
    }

    position: absolute;
    margin-top: -2rem;
    // margin-bottom: 2rem;
    background: rgb(39,47,63);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    align-content: center;
    border: 1px solid #e5bb09;
    border-radius: 100%;
    text-align: center;
    align-self: center;
    height: 4rem;
    width: 4rem;

    transition: all 100ms linear;

    z-index: 1;

    &:hover {
      img{
        filter: drop-shadow(0 0 1rem #e5bb09);
      }
    }
    &:active {
      filter: drop-shadow(0 0 .5rem #e5bb09);
    }
      
    span {
      display: inline-block_List;
      transform: translateY(9px);
      font-size: 3rem;
    }
  }

  .activated {
    height: 3rem;
    width: 3rem;
    transform: translateY(.10rem);
    
    #bottomPanelIcon {
      // transform: translateY(15%);
      width: 2rem;
      height: 2.2rem;
    }
  }

  .bottomMenu {
    transition: all 200ms ease;
    font-family: 'Nunito Sans', sans-serif;

    position: fixed;
    // filter: drop-shadow(0 0 5vh #1d232f);
    color: #e5bb09;
    background-color: #1d232f;

    display: flex;
    flex-direction: column;

    padding: 0 1rem;
    // border: 1px solid #e5bb09;
    border-top: 1px solid #e5bb09;
    
    // width: 108vw;
    width: 100%;
    height: 25rem;
    max-height: 25rem;
    
    bottom: -20rem;
    // test
    // bottom: -1rem;
    // left: -4vw;
    left: 0;
    // transform: translateX(-1%);

    background-image: linear-gradient(0deg, #272f3f, #1c222e);

    z-index: 2;
    
    .tabbedNav {
      padding: 1rem;
      // margin-top: 1rem;
      background-color: #1d232f;

      // background-color: #181d27;
      // border-radius: .3rem;
      .btn {
        border-radius: 10rem;
        padding: .5vw;

        margin: .3rem;
        font-size: 3.4vw;
        min-width: 15vw;
        float:left;

        cursor: pointer;
        &:active {
          box-shadow: 0 0 .2vw black;
        }
      }
    }
    
    .bottomMenuPreviews {
      margin-top: 1rem;
      padding: 0 1rem;
      width: 80vw;
      // transform: translateX(5%);

      #heatinput {
        width: 5rem;
        margin-right: .2vw;
        align-self: center;
        font-size: 1rem;
        // border: 1px solid #343f54;
        border: none;
      }
      
      z-index: 3;
      .btn {
        border-radius: 1vw;
        min-width: 6.7vw;
      }
    }
    
    
    .modules {
      justify-content: center;
      justify-self: center;

      .advancedFilter {
        font-family: 'Nunito Sans', sans-serif;
        position: absolute;
        margin-top: 3.4rem;
        left: 2rem;

        .advancedFilterList {
          list-style: none;
          float: left;
          margin: 1vw;

          .listTitle {
            font-size: 2vmin;
            color:#e5bb09;
            margin-left: 1.2vw;
          }
          li {
            font-size: 2.2vw;
            padding: .5rem .5rem;
            margin: .3rem;
            background-color: rgba($color: #323d52, $alpha: .5);
            border-radius: 1rem;
          }
        }
      }
    }

    .tab {
      min-width: 5rem;
    }
    .btn {
      border-radius: 10rem;
      padding: .5rem;

      margin: .3rem;
      font-size: 1rem;
      min-height: 2rem;
      max-height: 2rem;
      float:left;

      cursor: pointer;
      &:active {
        box-shadow: 0 0 .2vw black;
      }
    }

    .groupSVGs {
      position: absolute;
      // left: 7vw;
      width: 8rem;
      height: 5rem;

      left: 55%;
      bottom: 5.3rem;
      transform: translateX(-50%);
      
      .s-block_List {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 6.5rem;
      }
      .d-block_List {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 3.2rem;
        left: 2.9rem;
        top: 3.32rem;
      }
      .p-block_List {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 5.15rem;
        left: 9.3rem;
        top: 1.4rem;
      }
      .f-block_List {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 1.8rem;
        bottom: -3.5rem;
        right: -6.14rem;
      }
    }

    input[type=range] {
      appearance: none;
      // height: 1.35vmin;
      margin-top: 3.5rem;
      width: 82vw;
      height: 2rem;
      background: #343f54;
      border-radius: .3rem;
      // padding: .3rem;
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }
    .info-content {
      overflow-y: scroll;
      padding: 0 5vw;
      padding-bottom: 2vw;
      height: 20rem;

      margin-bottom: 3rem;
      span {
        text-align: center;
      }
      p {
        color: white;
      }
    }
  }

  .heatSVGs {
    /* grid-row-start: 3; grid-column-start: 4; grid-column-end: 7; */
    #solid_list {
      background-image: linear-gradient(135deg, #acbdff, rgba(82, 101, 185, 0.4));
      // background-image: linear-gradient(135deg, #d5b7ff, rgba(185, 148, 250, 0.4));
    }
    #liquid_list {
      // background-image: linear-gradient(135deg, #acbdff, rgba(136, 158, 255, 0.4));
      background-image: linear-gradient(135deg, #46b4b2, #2b807e);
    }
    #gas_list {
      background-image: linear-gradient(135deg, #FF44CC, #df25ad);
      // background-image: linear-gradient(135deg, #46b4b2, #56d9d7);
    }
    #uncertain_list {
      background-image: linear-gradient(135deg, #fd7b2f, #ee9038 100%);
    }
    
    img {
      height: .9rem; width: .9rem;
      top: -1rem;
      right: .1rem;
    }
  }

  .leanLeft {
    font-family: sans-serif;
    font-size: .8rem;
    align-self: flex-start;
    left: 1rem;
  }
  
  .leanRight {
    font-family: sans-serif;
    font-size: .8rem;
    align-self: flex-start;
    right: 1rem;
  }

  #langmenu_list {
    // color: #e5bb09;
    img {
      width: 1rem;
    }
  }
  
  .dropdown-content {
    bottom: 2.2rem;
    height: 6rem;
    width: 4rem;
    img {
      width: 1rem;
    }
  }

  .dropdown-button {
    min-width: 4rem;
    &::before {
      // content: "⮟ ";
      content: "";
      
      color: #e5bb09;
    }
  }
</style>