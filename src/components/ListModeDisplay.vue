<template>

  <div class="list_element" v-for="element in elements" :key="element.number">
    <div @click.prevent="toggleModal($event, element)"> <ListItem :eID="`list_${element.number}_${element.name}`" :locale="locale" :heat_view="list_heatMode" :heat_value="kelvin_setByUser" :element="element">{{ element }}</ListItem> </div>
  </div>
  
  <div class="bottomMenu noselect">

    <div @click="toggleBottomPanel" class="noselect bm_Button">
      <img id="bm_Icon" :src="this.logo" alt="Periodum Logo">
    </div>

    <div class="bm_Previews">
      <!-- Arama Önizleme -->
      <section class="bm_Preview flex-between" v-if="list_searchMode">
        <div class="bm_leanLeft" id="bm_searchResultCount">{{ this.locale.sub_menu.el_count }} {{ visibleElementCount }}</div>
        <div class="bm_leanRight" id="bm_selectedLanguage"></div>
      </section>

      <!-- Sıcaklık Önizleme -->
      <section class="bm_Preview flex-between" v-if="list_heatMode">
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

        <div @click.prevent="filterByState_List($event)" class="bm_leanRight heatSVGs">
          <div class="btn fade" id="list_stateSolid">           <img clas="preventMouseEvent" :src="states.solid"/></div>
          <div class="btn fade inactive" id="list_stateLiquid"> <img clas="preventMouseEvent" :src="states.liquid"/></div>
          <div class="btn fade inactive" id="list_stateGas">    <img clas="preventMouseEvent" :src="states.gas"/></div>
          <div class="btn fade" id="list_stateUncertain">       <img clas="preventMouseEvent" :src="states.uncertain"/></div>
        </div>
      </section>

      <!-- Grup Önizleme -->
      <section class="bm_Preview flex-between" v-if="list_filterMode">
        <div class="bm_leanLeft">
          {{ this.locale.sub_menu.el_count }} {{ visibleElementCount }}
        </div>
        <div class="bm_leanRight" id="currentFilter">
          {{ lastChosenFilter_List }}
        </div>
      </section>
      
    </div>
  
    <div class="bm_Content fade inactive">
      <div class="bm_Tabs fade flex-between">
          <button id="list_moduleBtn_searchMode" class="bm_tab btn" :style="[list_searchMode  ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toogleListPanel('search')">{{ this.locale.sub_menu.search }}</button>
          <button id="list_moduleBtn_heatMode" class="bm_tab btn" :style="[list_heatMode    ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toogleListPanel('heat')">{{ this.locale.sub_menu.heat }}</button>
          <button id="list_moduleBtn_filterMode" class="bm_tab btn" :style="[list_filterMode   ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toogleListPanel('group')">{{ this.locale.sub_menu.group }}</button>
          <button id="list_moduleBtn_helpMode" class="bm_tab btn" :style="[list_helpMode    ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" @click="toogleListPanel('info')">{{ this.locale.sub_menu.help }}</button>
      </div>
      
      <div class="modules flex-between">
        <!-- Arama Modülü -->
        <div v-show="list_searchMode">
            <div class="search">
              <input type="text" name="search" id="listSearch" :placeholder="this.locale.misc.elementSearch_text" autocomplete="off"
                @input="listSearching($event)"
                @focus="disableKeyboard()"
                @click="disableKeyboard()">
            </div>
            <Keyboard class="fade" />
        </div>

        <!-- Sıcaklık Modülü -->
        <div v-show="list_heatMode">
          <input @input="sliderChange_List()" v-model="kelvin_setByUser" type="range" step=".1" :min="minScale_List" :max="maxScale_List" id="heat" >
        
          <Numpad class="fade" />
        </div>

        <!-- Grup Modülü -->
        <div v-show="list_filterMode">
          <section @click="filterByCategory($event)" class="list_categoricalFilter_container text-white">
            <ul class="list_categoricalFilter float">
              <h6 id="list_catFilter_metals" class="listTitle">{{ locale.elements.categories.metals.main }}</h6>
              <li id="list_catFilter_alkaline_metals">{{ locale.elements.categories.metals.alkaline_metal }}</li>
              <li id="list_catFilter_alkaline_earth_metal">{{ locale.elements.categories.metals.alkaline_earth_metal }}</li>
              <li id="list_catFilter_transition_metal">{{ locale.elements.categories.metals.transition_metal }}</li>
              <li id="list_catFilter_post_transition_metal">{{ locale.elements.categories.metals.post_transition_metal }}</li>
              <li id="list_catFilter_lanthanides">{{ locale.elements.categories.metals.lanthanides }}</li>
              <li id="list_catFilter_actinides">{{ locale.elements.categories.metals.actinides }}</li>
            </ul>
            <ul class="list_categoricalFilter">
              <h6 id="list_catFilter_metalloid" class="listTitle">{{ locale.elements.categories.metalloid.main }}</h6>
              <li id="list_catFilter_metalloid">{{ locale.elements.categories.metalloid.metalloid }}</li>
            </ul>
            <ul class="list_categoricalFilter">
              <h6 id="list_catFilter_nonmetals" class="listTitle">{{ locale.elements.categories.nonmetals.main }}</h6>
              <li id="list_catFilter_noble_gas">{{ locale.elements.categories.nonmetals.noble_gases }}</li>
              <li id="list_catFilter_reactive_nonmetal">{{ locale.elements.categories.nonmetals.reactive_nonmetals }}</li>
            </ul>
            <ul class="list_categoricalFilter">
              <h6 id="list_catFilter_other" class="listTitle">{{ locale.elements.categories.other.main }}</h6>
              <li id="list_catFilter_unknown">{{ locale.elements.categories.other.unknown }}</li>
            </ul>
          </section>
          <section @click="filterByGroup($event)" class="list_group_svgs">
            <img :src="groups_List.list_groupFilter_s" id="list_groupFilter_s" class="s-list_elementBlock">
            <img :src="groups_List.list_groupFilter_d" id="list_groupFilter_d" class="d-list_elementBlock">
            <img :src="groups_List.list_groupFilter_p" id="list_groupFilter_p" class="p-list_elementBlock">
            <img :src="groups_List.list_groupFilter_f" id="list_groupFilter_f" class="f-list_elementBlock">
          </section>
        </div>

        <!-- Yardım Modülü -->
        <div class="bm_Info" v-show="list_helpMode">
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
      list_searchMode: true,
      list_filterMode: false,
      list_heatMode: false,
      list_helpMode: false,
      panelView_List: false,
      minScale_List: 0,
      maxScale_List: 7273,
      lastChosenFilter_List: '',
      visibleElementCount: 119,
      groups_List: {
        list_groupFilter_s:          require("../resources/img/groups/s.svg"),
        list_groupFilter_s_selected: require("../resources/img/groups/s_selected.svg"),
        list_groupFilter_d:          require("../resources/img/groups/d.svg"),
        list_groupFilter_d_selected: require("../resources/img/groups/d_selected.svg"),
        list_groupFilter_p:          require("../resources/img/groups/p.svg"),
        list_groupFilter_p_selected: require("../resources/img/groups/p_selected.svg"),
        list_groupFilter_f:          require("../resources/img/groups/f.svg"),
        list_groupFilter_f_selected: require("../resources/img/groups/f_selected.svg"),
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
      if($event.target.classList.contains('details-button')) {
        this.$emit('getElement', el)
        document.body.classList.add('active_modal');
      }
    },
    defaultView() {
      this.summaryView = false;
      this.list_heatMode = false; this.kelvin_setByUser = 0;
      this.list_filterMode = false;
      this.compoundView_List = false;
      this.list_searchMode = false;
      this.list_helpMode = false;
    },
    toogleListPanel(mode) {
      this.defaultView();
      if (mode === 'summary') {
        this.summaryView = true;
      }
      if (mode === 'heat') {
        this.list_heatMode = true;
        this.kelvin_setByUser = 298.15;
        this.heat_toDisplay = this.kelvin_setByUser;
        
        this.metric_Initials = {
          K: 298.15,
          C: 25,
          F: 77
        }
      }
      if (mode === 'group') {
        this.list_filterMode = true;
      }
      if (mode === 'compound') {
        this.compoundView_List = true;
      }
      if (mode === 'search') {
        this.list_searchMode = true;
      }
      if (mode === 'info') {
        this.list_helpMode = true;
      }
    },
    toggleBottomPanel() {
      const PANEL = document.querySelector('.bottomMenu');
      const PREVIEW = document.querySelector('.bm_Previews')
      if (!this.panelView_List) {
        PANEL.style.bottom = '0rem'
        this.panelView_List = true
        document.querySelector('.bm_Content').classList.remove('inactive')
        const PANELBUTON = document.querySelector('.bm_Button')
        PANELBUTON.classList.add('activated')
        PANELBUTON.style.marginTop = "-2rem"
        
        PREVIEW.style.position = 'absolute'
        // PREVIEW.style.width = '94vw'
        PREVIEW.style.marginTop = '5rem'
        
        
        // document.body.classList.add('active_modal');
    // position: absolute;
    // width: 95%;
    // margin-top: 5rem;

        // document.querySelector('.modules').appendChild(PREVIEW)
      } else {
        PANEL.style.bottom = '-21rem'
        this.panelView_List = false
        document.querySelector('.bm_Content').classList.add('inactive')
        const PANELBUTON = document.querySelector('.bm_Button')
        PANELBUTON.classList.remove('activated')
        PANELBUTON.style.marginTop = "-1.8rem"
        
        PREVIEW.style.position = "unset"
        PREVIEW.style.width = '94vw'
        PREVIEW.style.marginTop = '.8rem'
        // document.querySelector('.bottomMenu').appendChild(PREVIEW)
        // document.body.classList.remove('active_modal');
      }
    },
    listSearching($event) {
      const INPUT = $event.target.value.toLowerCase()
      const KEY = document.querySelector('.list_element')
      
      const CONDITIONS = function(el) {
        let searchIn = []
        if (!INPUT.includes('.')) {
          searchIn = [
            el.querySelector('.list_atomicNumber').textContent,
            el.querySelector('.list_name').textContent,
            el.querySelector('.list_symbol').textContent,
            el.querySelector('.list_atomicMass').textContent.split('.')[0]
          ].join('').toLowerCase()
        } else {
          searchIn = [
            el.querySelector('.list_atomicMass').textContent
          ].join('').toLowerCase()
        }
        
        return INPUT !== ''
        && searchIn.includes(INPUT)
      }

      document.querySelectorAll('.list_element').forEach(function(element) {
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
      this.visibleElementCount = document.querySelectorAll('.list_element:not(.inactive)').length
      
      // // Menü önizleme kısmı
      // const PREVIEW_INFO = document.querySelector('#searchInput_List')
      // // Menü önizleme kısmını güncelle
      // PREVIEW_INFO.textContent = `${INPUT}`
    },
    filterByState_List($event) {
      if (!this.list_heatMode) return
      // if ($event.target.classList.contains('heatSVGs')) return;

      try {
        const ID = $event.target.id === '' ? $event.target.closest('.btn').id : $event.target.id

        const STATES = {
          list_stateSolid: 'solid',
          list_stateGas: 'gas',
          list_stateUncertain: 'uncertain',
          list_stateLiquid: 'liquid',
        };

        if (document.querySelector(`.${ID}`).classList.contains('inactive')) {
          Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
            el.removeAttribute('class')
            el.classList.add('inactive')
            el.classList.add(`list_elementContainer`)
            el.classList.add(state)
          }))
        }

        Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
          el.removeAttribute('class')
          el.classList.add('inactive')
          el.classList.add(`list_elementContainer`)
          el.classList.add(state)
        }))

        document.querySelectorAll(`.${ID}`).forEach(function(el) {
          el.removeAttribute('class')
          el.classList.add(`list_elementContainer`)
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

      const BUTTON_UNCERTAIN = document.querySelector('#list_stateUncertain')
      const BUTTON_SOLID = document.querySelector('#list_stateSolid')
      const BUTTON_LIQUID = document.querySelector('#list_stateLiquid')
      const BUTTON_GAS = document.querySelector('#list_stateGas')

      document.querySelectorAll('.list_stateUncertain').length >= 1
      ? BUTTON_UNCERTAIN.classList.remove('inactive') : BUTTON_UNCERTAIN.classList.add('inactive')
      document.querySelectorAll('.list_stateLiquid').length >= 1
      ? BUTTON_LIQUID.classList.remove('inactive') : BUTTON_LIQUID.classList.add('inactive')
      document.querySelectorAll('.list_stateGas').length >= 1
      ? BUTTON_GAS.classList.remove('inactive') : BUTTON_GAS.classList.add('inactive')
      document.querySelectorAll('.list_stateSolid').length >= 1
      ? BUTTON_SOLID.classList.remove('inactive') : BUTTON_SOLID.classList.add('inactive')

    },
    disableKeyboard() {
      if (typeof screen.orientation !== 'undefined') {
        document.activeElement.blur();
      }
    },
    categoryFilterStylizer() {
      // const FILTERS = document.querySelector('.list_categoricalFilter_container')
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
        item.style.color = categoryColors[item.id.replaceAll('-', ' ').replace('list_catFilter_', '')]
      })
      // return {'color': this.categoryColors[$event.target.id.replaceAll('-', ' ')]}
    },
    filterByCategory($event) {
      const CLICKED = $event.target.id
      if (CLICKED === '') return;


      if (this.lastChosenFilter === CLICKED) {
        document.querySelectorAll('.list_element').forEach(function(el) {
          const ELEMENT = el.querySelector('.list_elementContainer');
          ELEMENT.classList.remove('inactive')
        })
        this.lastChosenFilter = ''
        
        this.visibleElementCount = document.querySelectorAll('.list_elementContainer:not(.inactive)').length

        document.querySelector('#currentFilter').textContent = ''
        return
      } document.querySelector('#currentFilter').textContent = `${this.locale.modules.group}: ` + $event.target.textContent

      document.querySelectorAll('.list_element').forEach(function(el) {
        const ELEMENT = el.querySelector('.list_elementContainer');
        const list_elementCategory = el.querySelector('.list_elementCategory');
        
        if (list_elementCategory.textContent === CLICKED.replaceAll('-', ' ').replace('list_catFilter_', '')) {
          ELEMENT.classList.remove('inactive')
        }
        else {
          ELEMENT.classList.add('inactive')
        }
      })
      this.visibleElementCount = document.querySelectorAll('.list_elementContainer:not(.inactive)').length
      this.lastChosenFilter = CLICKED
    },
    filterByGroup($event) {
      const TARGET = $event.target;
      if (TARGET.classList.contains('list_group_svgs')) return
      
      document.querySelectorAll('.list_element').forEach(function(el) {
        const ELEMENT = el.querySelector('.list_elementContainer');
        ELEMENT.classList.remove('inactive')
      });

      const allBlocks = document.getElementsByClassName('list_elementBlock');
      
      // TRYCATCH OLMADAN ÇALIŞIR HALE GETİR
      const view = function(allBlocks, _default) {
        for (const list_elementBlock of allBlocks) {
          if (_default) {
            list_elementBlock.parentElement.parentElement.parentElement.classList.add('inactive')
          }
          else { 
            if (list_elementBlock.textContent === TARGET.id) {
              list_elementBlock.parentElement.parentElement.parentElement.classList.remove('inactive');
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
        
        document.querySelectorAll('.list_element').forEach(function(el) {
          const ELEMENT = el.querySelector('.list_elementContainer');
          ELEMENT.classList.remove('inactive')
        });
        this.visibleElementCount = document.querySelectorAll('.list_elementContainer:not(.inactive)').length
        return;
      }
      
      // Only the selected
      TARGET.parentElement.childNodes.forEach(group => group.src = this.groups_List[`${group.id}`])
      TARGET.src = this.groups_List[`${TARGET.id}_selected`]
        
      // Display on table
      view(allBlocks, false);
      this.visibleElementCount = document.querySelectorAll('.list_elementContainer:not(.inactive)').length
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
    this.categoryFilterStylizer()
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
    margin-top: 3.8rem;
    width: 95vw;
    font-size: 2.5vw;
    border: 0;
    border-radius: 0;
    border-bottom: 1px solid #e5bb09;
  }
  .activated {
    height: 3rem;
    width: 3rem;
    transform: translateY(.10rem);
    
    #bm_Icon {
      // transform: translateY(15%);
      width: 2rem;
      height: 2.2rem;
    }
  }

  .bottomMenu {
    transition: all 170ms ease-out;
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
    
    bottom: -21rem;
    left: 0;
    z-index: 2;
    
    backdrop-filter: blur(10px);
    filter: opacity(.9);
    background: #1c222e;
    background-image: linear-gradient(0deg, #1c222e 10%, #1c222e 70%);
        
    .bm_Button {
      #bm_Icon {
        transform: translateY(10%);
        width: 2rem;
        height: 3rem;
      }

      position: absolute;
      margin-top: -1.8rem;
      background: rgb(39,47,63);
      background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
      align-content: center;
      border: 1px solid #e5bb09;
      border-radius: 100%;

      text-align: center;
      align-self: center;
      height: 3.5rem;
      width: 3.5rem;

      transition: all 50ms linear;

      z-index: 5;

      &:hover {
        img{
          filter: drop-shadow(0 0 1rem #e5bb09);
        }
      }
      
      // span {
      //   display: inline-list_elementBlock;
      //   transform: translateY(9px);
      //   font-size: 3rem;
      // }
    }

    .bm_Tabs {
      padding: 1.1rem 0;

      // border-radius: .3rem;
      .btn {
        border-radius: 10rem;
        padding: .7vw;

        margin: .3rem;
        font-size: 3.4vw;
        min-width: 16vw;

        cursor: pointer;
        &:active {
          box-shadow: 0 0 .2vw black;
        }
      }
    }
    
    .bm_Previews {
      margin-top: 1rem;
      // padding: 0 1rem;
      width: 94vw;
      position: absolute;
      // transform: translateX(5%);

      #heatinput {
        width: 5rem;
        height: 2rem;
        margin-right: .5rem;
        // align-self: center;
        font-size: 1rem;
        border: none;
        border: 1px solid #343f54;
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

      .list_categoricalFilter_container {
        font-family: 'Nunito Sans', sans-serif;
        position: absolute;
        margin-top: 3.4rem;
        left: 1.3rem;

        .list_categoricalFilter {
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

    .bm_tab {
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

    .list_group_svgs {
      position: absolute;
      // left: 7vw;
      width: 8rem;
      height: 5rem;

      left: 55%;
      bottom: 5.3rem;
      transform: translateX(-50%);
      
      .s-list_elementBlock {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 6.5rem;
      }
      .d-list_elementBlock {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 3.2rem;
        left: 2.9rem;
        top: 3.32rem;
      }
      .p-list_elementBlock {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 5.15rem;
        left: 9.3rem;
        top: 1.4rem;
      }
      .f-list_elementBlock {
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
      width: 93vw;
      height: 2rem;
      background: #343f54;
      // padding: .3rem;
      outline: none;
      -webkit-transition: .2s;
      transition: opacity .2s;
    }
    .bm_Info {
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
    #list_stateSolid {
      background-image: linear-gradient(135deg, #acbdff, rgba(82, 101, 185, 0.4));
      // background-image: linear-gradient(135deg, #d5b7ff, rgba(185, 148, 250, 0.4));
    }
    #list_stateLiquid {
      // background-image: linear-gradient(135deg, #acbdff, rgba(136, 158, 255, 0.4));
      background-image: linear-gradient(135deg, #46b4b2, #2b807e);
    }
    #list_stateGas {
      background-image: linear-gradient(135deg, #FF44CC, #df25ad);
      // background-image: linear-gradient(135deg, #46b4b2, #56d9d7);
    }
    #list_stateUncertain {
      background-image: linear-gradient(135deg, #fd7b2f, #ee9038 100%);
    }
    
    img {
      height: .9rem; width: .9rem;
      top: -1rem;
      right: .1rem;
    }
  }

  .bm_leanLeft {
    font-family: sans-serif;
    font-size: .8rem;
    // align-self: flex-end;
    // align-self: center;
    left: 1rem;
  }
  
  .bm_leanRight {
    font-family: sans-serif;
    font-size: .8rem;
    // align-self: flex-end;
    // align-self: center;
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
    height: 2rem;
    &::before {
      // content: "⮟ ";
      content: "";
      
      color: #e5bb09;
    }
  }
</style>