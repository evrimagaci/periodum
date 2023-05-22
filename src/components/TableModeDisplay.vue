<template>

  <div class="grid">
    <div v-show="table_panelMode" class="table_tabs fade">
      <button class="btn" :style="[table_filterMode ? { border: 'solid 1px #e5bb09' }   : {color: '#e5bb09'}]" id="table_moduleBtn_filterMode"   @click="toggleTablePanel('filter')">{{ locale.modules.group }}</button>
      <button class="btn" :style="[table_heatMode ? { border: 'solid 1px #e5bb09' }     : {color: '#e5bb09'}]" id="table_moduleBtn_heatMode"     @click="toggleTablePanel('heat')">{{ locale.modules.heat }}</button>
      <!-- <button class="btn" :style="[table_articleMode ? { border: 'solid 1px #e5bb09' }  : {color: '#e5bb09'}]" id="table_moduleBtn_articleMode"  @click="toggleTablePanel('article')">Makale</button> -->
      <!-- <button class="btn" :style="[table_compoundMode ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]" id="table_moduleBtn_compoundMode" @click="toggleTablePanel('compound')">Bileşik</button> -->
      <!-- <button class="btn" :style="[table_summaryMode ? { border: 'solid 1px #e5bb09' } : {color: '#e5bb09'}]"  id="table_moduleBtn_summaryMode"  @click="toggleTablePanel('summary')">Özet</button> -->
    </div>

    <div class="search table">
      <input type="search" name="search" id="tableSearch" :placeholder="this.locale.misc.elementSearch_text" autocomplete="off" @input="tableSearching($event)">
    </div>

    <label class="switch">
      <input id="table_module_switcher"
        type="checkbox"
        :checked="table_panelMode"
        @change="table_panelMode = !table_panelMode"
      />
      <span class="slider round"></span>
    </label>

    <div v-show="table_panelMode" id="modulePanel" class="modules noselect fade">

      <!-- Sıcaklık Modülü -->
      <div v-show="table_heatMode" class="h-100 flex-between flex-column fade">
        <!-- <input class="inactive" :heat_value="displayStateButtons()"/> -->
        <input @input="sliderChange()" v-model="heatValue" type="range" step=".1" :min="minScale" :max="maxScale" id="heat_slider" >
        <!-- @click="toggletable_heatMode()" -->
        <div class="flex-between align-end">
          <div @click.prevent="filterByState($event)" class="states flex-between noselect">
            <div class="fade btn" id="solid">     <img :src="states.solid"/></div>
            <div class="fade btn" id="liquid">    <img :src="states.liquid"/></div>
            <div class="fade btn" id="gas">       <img :src="states.gas"/></div>
            <div class="fade btn" id="uncertain"> <img :src="states.uncertain"/></div>
          </div>
          
          <div>
            <input class="align-center" type="tel" id="heatinput_table" pattern="[A-Za-z\s]{0,50}" :value="heat_toDisplay_table"
              @input="heatinputAction()"
            >

            <div class="dropdown">
              <button class="dropdown-button metricmenu_table">K</button>
              <div class="dropdown-content">
                <a @click="convertUnit($event)" href="#">K</a>
                <a @click="convertUnit($event)" href="#">C</a>
                <a @click="convertUnit($event)" href="#">F</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Filtre Modülü -->
      <div v-show="table_filterMode" class="h-100 flex-between flex-column fade">
        <div class="groupFilter" @click.prevent="viewGroup($event)">
          <img :src="groups.table_groupFilter_s" id="table_groupFilter_s" class="s-block">
          <img :src="groups.table_groupFilter_d" id="table_groupFilter_d" class="d-block">
          <img :src="groups.table_groupFilter_p" id="table_groupFilter_p" class="p-block">
          <img :src="groups.table_groupFilter_f" id="table_groupFilter_f" class="f-block">
        </div>
        <div @click="viewFilter($event)" class="table_categoricalFilter_container text-white fit-content">
          <ul class="table_categoricalFilter float">
            <li class="mainFilter" id="table_catFilter_metals">{{ locale.elements.categories.metals.main }}</li>
            <li id="table_catFilter_alkaline_metals">{{ locale.elements.categories.metals.alkaline_metal }}</li>
            <li id="table_catFilter_alkaline_earth_metal">{{ locale.elements.categories.metals.alkaline_earth_metal }}</li>
            <li id="table_catFilter_transition_metal">{{ locale.elements.categories.metals.transition_metal }}</li>
            <li id="table_catFilter_post_transition_metal">{{ locale.elements.categories.metals.post_transition_metal }}</li>
            <li id="table_catFilter_lanthanides">{{ locale.elements.categories.metals.lanthanides }}</li>
            <li id="table_catFilter_actinides">{{ locale.elements.categories.metals.actinides }}</li>
          </ul>
          <ul class="table_categoricalFilter">
            <li class="mainFilter" id="table_catFilter_metalloids">{{ locale.elements.categories.metalloid.main }}</li>
            <li id="table_catFilter_metalloid">{{ locale.elements.categories.metalloid.metalloid }}</li>
          </ul>
          <ul class="table_categoricalFilter">
            <li class="mainFilter" id="table_catFilter_nonmetals">{{ locale.elements.categories.nonmetals.main }}</li>
            <li id="table_catFilter_noble_gas">{{ locale.elements.categories.nonmetals.noble_gases }}</li>
            <li id="table_catFilter_reactive_nonmetal">{{ locale.elements.categories.nonmetals.reactive_nonmetals }}</li>
          </ul>
          <ul class="table_categoricalFilter">
            <li class="mainFilter" id="table_catFilter_other">{{ locale.elements.categories.other.main }}</li>
            <li id="table_catFilter_unknown">{{ locale.elements.categories.other.unknown }}</li>
          </ul>
        </div>
      </div>

      <!-- Bileşik Modülü -->
      <div v-show="table_compoundMode" class="compoundContainer h-100 flex-start flex-row fade">
        <div class="compoundSample mute"></div>
        <div class="compoundBucket"></div>
        <div class="compoundResult fit-content"></div>
      </div>
    </div>
    <!-- if (table_compoundMode) compoundAdd($event); else  COMPOUND MODU İÇİN ÖNEMLİ!!!! -->
    <div class="element noselect" :style="{ 'grid-row-start': element.ypos, 'grid-column-start': element.xpos}"
        v-for="element in elements" :key="element.number">
      <div @click.prevent="if (table_compoundMode) compoundAdd($event); else toggleModal($event, element)" @mouseover="if (table_summaryMode) displaySummary(elements.indexOf(element));"> <TableItem :eID="`table_${element.number}_${element.name}`" :heat_view="table_heatMode" :heat_value="Number(heatValue)" :element="element"> {{ element }} </TableItem> </div>
    </div>
    
  </div>

  <div v-show="table_panelMode" class="table_demo_element noselect fade">
    <div class="table_demo_block">
      <div class="table_demo_number"><p> {{ locale.misc.sample_element.atomic_number }} </p></div>
      <div class="table_demo_symbol" >{{ locale.misc.sample_element.symbol }}</div>
      <div class="table_demo_name"> {{ locale.misc.sample_element.name }} </div>
      <h2 class="table_demo_atomic">{{ locale.misc.sample_element.atomic_mass }}</h2>
    </div>
  </div>
  
  <div v-show="table_panelMode" class="thanks mute flex-start margin">
    <a class="fade" href="https://bionluk.com" target="_blank">
    <img id="thanks-bionluk" src="../resources/img/bionluk.png" alt="bionluk logo">
    </a>
    <span>{{ locale.misc.thanks }}</span>
  </div>
</template>

<script>
import TableItem from '@/components/TableModeItem.vue'
// import infoBar from '../addons/infoBar.vue';
// <infoBar class="infoBar" :fontSize="'.8vw'" :infoText="'Atomik kütle araması için \'.\' işaretini kullan.'" />

// const sqlite3 = require('sqlite3').verbose()
// let sql;

// const COMPOUNDSS = require("../resources/db.sql");
// const db = new sqlite3.Database(COMPOUNDSS, sqlite3.OPEN_READONLY, (err) => {
//   if (err) return console.error(err.message);
// })


// sql = `SELECT * FROM compounds`

// db.all(sql, [], (err, rows) => {
//   if (err) return console.error(err.message);
//   rows.forEach(row => console.log(row))
// })

export default {
  components: { TableItem },
  props: { elements: Object, locale: Object },
  emits: ["getElement", "checkStatus"],
  data() {
    return {
      compounds_list: [],
      symbols_list: [],
      // table_summaryMode: false,
      table_panelMode: true,
      table_filterMode: true,
      table_heatMode: false,
      table_compoundMode: false,
      heatValue: 298.15,
      lastIndexOfHoveredItem: 0,
      lastChosenFilter: '',
      lastChosenMainFilter: '',
      lastChosenGroup: '',
      minScale: 0,
      maxScale: 7273,
      groups: {
        table_groupFilter_s:          require("../resources/img/groups/s.svg"),
        table_groupFilter_s_selected: require("../resources/img/groups/s_selected.svg"),
        table_groupFilter_d:          require("../resources/img/groups/d.svg"),
        table_groupFilter_d_selected: require("../resources/img/groups/d_selected.svg"),
        table_groupFilter_p:          require("../resources/img/groups/p.svg"),
        table_groupFilter_p_selected: require("../resources/img/groups/p_selected.svg"),
        table_groupFilter_f:          require("../resources/img/groups/f.svg"),
        table_groupFilter_f_selected: require("../resources/img/groups/f_selected.svg"),
      },
      states: {
        solid:      require("../resources/img/states/solid.svg"),
        liquid:     require("../resources/img/states/liquid.svg"),
        gas:        require("../resources/img/states/gas.svg"),
        uncertain:  require("../resources/img/states/uncertain.svg"),
      },
      metric_Initials: {
        K: 298.15,
        C: 25,
        F: 77
      },
      metricConvertion: {
        C: 'unit => unit-273.15',
        F: 'unit => 9/5*unit-459.67'
      },
      convertToKelvin: {
        C: 'unit => unit+273.15',
        F: 'unit => (unit+459.67)*5/9'
      },
      heat_toDisplay_table: 0,
      flag: {
        tr:  require("../resources/locale/flags/tr.svg"),
        en:  require("../resources/locale/flags/en.svg"),
      },
      language: 'en'
    }
  },
  methods: {
    toggleModal($event, el) {
      // if($event.target.classList.contains('modal-open') || $event.target.classList.contains('details-button'))
      this.$emit('getElement', el)
      document.body.classList.add('active_modal');
    },
    defaultView() {
      this.table_summaryMode = false;
      this.table_heatMode = false; this.heatValue = 298.15;
      this.table_filterMode = false;
      this.table_compoundMode = false;
      
      document.querySelectorAll('.table_elementContainer').forEach(function(element) {
        element.classList.remove('mute')
      })

      document.querySelector('#modulePanel').style.backgroundColor = '#242b3a'
    },
    toggleTablePanel(mode) {
        this.defaultView();
      // if (mode === 'summary') {
      //   this.table_summaryMode = true;
      // }
      if (mode === 'heat') {
        if(this.heatValue === 298.15)
        document.querySelector('#table_moduleBtn_heatMode').textContent = this.locale.modules.heat

        this.table_heatMode = true;
        this.heat_toDisplay_table = this.heatValue;
        
        this.$nextTick(() => {
          document.querySelectorAll(`.gas`).forEach(function(el) {
            el.removeAttribute('class')
            el.classList.add(`table_elementContainer`)
            el.classList.add(`flex-evenly`)
            el.classList.add(`flex-column`)
            el.classList.add('gas')
          });
        })
        
        this.$nextTick(() => {
          this.sliderChange()
        })
      }
      if (mode === 'filter') {
        this.table_filterMode = true;
        this.filterValue = 0;
      }
      if (mode === 'compound') {
        this.table_compoundMode = true;
        document.querySelectorAll('.element').forEach(function(element) {
          element.classList.remove('mute')
        })
        this.$nextTick(() => {
          document.querySelector('.compoundBucket').innerHTML = ''
          document.querySelector('.compoundResult').innerHTML = ''

          document.querySelector('.compoundSample').classList.remove('inactive')

          // document.querySelector('.compoundBucket').innerHTML = '<div style="font-size: 1vw;" class="tutorial_CompoundModule_FirstTime text-primary">Eklemek istediğiniz elementleri seçin.</div>'
          this.compounds_list = []

          document.querySelector('#modulePanel').style.backgroundColor = '#101319'
        })

      }
      // if (mode === 'hide') {
      //   this.defaultView();
      //   this.table_filterMode = true;
      //   this.filterValue = 0;
      //   document.querySelector('.table_tabs').classList.add('inactive')
      //   document.querySelector('.modules').classList.add('inactive')
      //   document.querySelector('#tablePanelBtn').classList.remove('inactive')
      // }
      
      // document.querySelector('.navSwitch').classList.toggle('switchON')
      // document.querySelector('.navSwitch').classList.toggle('switchOFF')
    },
    // displaySummary(index) {
    //   if (this.lastIndexOfHoveredItem === index) return;

    //   this.lastIndexOfHoveredItem = index;
    //   const ELEMENT = this.elements[index];
    //   document.querySelector('.element-summary-title').textContent = `${ELEMENT.name_tr}`;
    //   document.querySelector('.element-summary-titleEN').textContent = `${ELEMENT.name_en}`;
    //   document.querySelector('.element-summary-description').textContent = ELEMENT.description !== '' ? `${ELEMENT.description.split('.')[0]+ '. ' + ELEMENT.description.split('.')[1] + '.'}` : '';
    // },
    viewGroup($event) {
      if (this.table_heatMode) this.table_heatMode = ! this.table_heatMode

      this.lastChosenFilter = ''
      this.lastChosenMainFilter = ''

      const TARGET = $event.target;
      
      document.querySelectorAll('.element').forEach(function(el) {
        const ELEMENT = el.querySelector('.table_elementContainer');
        ELEMENT.classList.remove('mute')
      });

      const allBlocks = document.getElementsByClassName('table_elementBlock');
      
      // TRYCATCH OLMADAN ÇALIŞIR HALE GETİR
      const view = function(allBlocks, _default) {
        for (const block of allBlocks) {
          if (_default) {
            block.parentElement.classList.remove('highlight');
          }
          else { 
            if (block.textContent === TARGET.id) {
              block.parentElement.classList.add('highlight')
            }
            else {
              false
            }
          }

          try {
            
            block.parentElement.querySelector('.table_atomicNumber').classList.remove('colored')
            block.parentElement.childNodes.forEach(function(el) {
              if (_default) {
                el.classList.add('colored')
              }
              else {
                el.parentElement.classList.add('mute')
                if (block.textContent === TARGET.id) {
                  el.classList.remove('colored')
                  el.parentElement.classList.remove('mute')
                }
                else {
                  false
                }
              }
            })
          } catch(err) {console.log(err)}
        }
      }
      view(allBlocks, true);

      // Toggle
      if (TARGET.src.includes('selected')) {
        this.lastChosenGroup = ''
        TARGET.src = this.groups[`${TARGET.id}`]
        return;
      }
      
      this.lastChosenGroup = TARGET.src
      
      // Only the selected
      TARGET.parentElement.childNodes.forEach(group => group.src = this.groups[`${group.id}`])
      TARGET.src = this.groups[`${TARGET.id}_selected`]
        
      // Display on table
      view(allBlocks, false);
      
    },
    viewFilter($event) {
      const CLICKED = $event.target.id

      // if (this.lastChosenGroup !== '') 
      
      const FILTRE_IDs = []
      const MAIN_FILTER = $event.target
      if (MAIN_FILTER.classList.contains('mainFilter')) {

        const LIST_ITEMS = $event.target.parentElement.querySelectorAll('li')

        if (this.lastChosenMainFilter === MAIN_FILTER.textContent) {
        document.querySelectorAll('.element').forEach(function(el) {
          const ELEMENT = el.querySelector('.table_elementContainer');
          ELEMENT.classList.remove('highlight')
          ELEMENT.classList.remove('mute')
          ELEMENT.classList.add('colored')
        })
        this.lastChosenMainFilter = ''
        return
      }

        LIST_ITEMS.forEach(function(list) {
          // console.log(list);

          if(list !== $event.target) {
            FILTRE_IDs.push(list.id.replaceAll('-', ' ').replace('table_catFilter_', ''))


            document.querySelectorAll('.element').forEach(function(el) {
              const ELEMENT = el.querySelector('.table_elementContainer');
              const CATEGORY = el.querySelector('.table_elementCategory');
              
              if (FILTRE_IDs.includes(CATEGORY.textContent)) {
                ELEMENT.classList.add('highlight')
                ELEMENT.classList.remove('mute')
                
                ELEMENT.childNodes.forEach(function(el) {
                  el.classList.remove('colored')
                })

              }
              if (!FILTRE_IDs.includes(CATEGORY.textContent)) {
                ELEMENT.classList.remove('highlight')
                ELEMENT.classList.add('mute')
                ELEMENT.classList.add('colored')
              }
            })
          }
        })

        this.lastChosenMainFilter = MAIN_FILTER.textContent
        return
      }

      if (CLICKED === '') return;
      
      if (this.lastChosenFilter === CLICKED) {
        document.querySelectorAll('.element').forEach(function(el) {
          const ELEMENT = el.querySelector('.table_elementContainer');
          ELEMENT.classList.remove('highlight')
          ELEMENT.classList.remove('mute')
          ELEMENT.classList.add('colored')
        })
        this.lastChosenFilter = ''
        return
      }

      document.querySelectorAll('.element').forEach(function(el) {
        const ELEMENT = el.querySelector('.table_elementContainer');
        const CATEGORY = el.querySelector('.table_elementCategory');
        
        if (CATEGORY.textContent === CLICKED.replaceAll('-', ' ').replace('table_catFilter_', '')) {
          ELEMENT.classList.add('highlight')
          ELEMENT.classList.remove('mute')
          
          ELEMENT.childNodes.forEach(function(el) {
            el.classList.remove('colored')
          })

          // Atomik kütleyi siyahlaştır
          ELEMENT.querySelector('.table_atomicNumber').classList.remove('colored')
        }
        else {
          ELEMENT.classList.remove('highlight')
          ELEMENT.classList.add('mute')
          ELEMENT.classList.add('colored')
          
          // Atomik kütleyi renklendir
          ELEMENT.querySelector('.table_atomicNumber').classList.add('colored')
        }
      })

      this.lastChosenFilter = CLICKED
    },
    viewGroupStylizer() {
      // const FILTERS = document.querySelector('.table_categoricalFilter_container')
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
        item.style.color = categoryColors[item.id.replaceAll('-', ' ').replace('table_catFilter_', '')]
      })
      // return {'color': this.categoryColors[$event.target.id.replaceAll('-', ' ')]}
    },
    filterByState($event) {
      if (!this.table_heatMode) return
      if ($event.target.classList.contains('states')) return;

      try {
        const ID = $event.target.id === '' ? $event.target.closest('.btn').id : $event.target.id

        const STATES = {
          solid: 'solid',
          liquid: 'liquid',
          gas: 'gas',
          uncertain: 'uncertain'
        };

        if (document.querySelector(`.${ID}`).classList.contains('glow')) {
          Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
            el.removeAttribute('class')
            el.classList.add(`table_elementContainer`)
            el.classList.add(`flex-evenly`)
            el.classList.add(`flex-column`)
            el.classList.add(state)
          }))
          return
        }

        Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
          el.classList.add('mute')
          el.classList.remove('glow')
        }))

        document.querySelectorAll(`.${ID}`).forEach(function(el) {
          el.removeAttribute('class')
          el.classList.add(`table_elementContainer`)
          el.classList.add(`flex-evenly`)
          el.classList.add(`flex-column`)
          el.classList.add('glow')
          el.classList.add(ID)
        });
      }
      catch (err) {
        console.log('error')
      }
    },
    sliderChange() {
      if (this.heatValue !== 298.15 && !document.querySelector('#table_moduleBtn_heatMode').textContent.includes('🗘')) document.querySelector('#table_moduleBtn_heatMode').textContent = '🗘 ' + this.locale.modules.heat;
      const STATES = {
        uncertain: 'uncertain',
        solid: 'solid',
        gas: 'gas',
        liquid: 'liquid',
      };

      Object.keys(STATES).forEach(state => document.querySelectorAll(`.${state}`).forEach(function(el) {
        el.removeAttribute('class')
        el.classList.add(`table_elementContainer`)
        el.classList.add(`flex-evenly`)
        el.classList.add(`flex-column`)
        el.classList.add(`${state}`)
        el.classList.remove('mute')
        el.classList.remove('glow')
      }))
      
      this.metric_Initials.K = this.heatValue

      const toC = eval(this.metricConvertion.C)
      const toF = eval(this.metricConvertion.F)

      this.metric_Initials.C = toC(Number(this.metric_Initials.K))
      this.metric_Initials.F = toF(Number(this.metric_Initials.K))

      const SELECTION = document.querySelector('.metricmenu_table').textContent
      this.heat_toDisplay_table = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;

      const BUTTON_UNCERTAIN = document.querySelector('#uncertain')
      const BUTTON_SOLID = document.querySelector('#solid')
      const BUTTON_LIQUID = document.querySelector('#liquid')
      const BUTTON_GAS = document.querySelector('#gas')

      document.querySelectorAll('.uncertain').length >= 1
      ? BUTTON_UNCERTAIN.classList.remove('inactive') : BUTTON_UNCERTAIN.classList.add('inactive')
      document.querySelectorAll('.liquid').length >= 1
      ? BUTTON_LIQUID.classList.remove('inactive') : BUTTON_LIQUID.classList.add('inactive')
      document.querySelectorAll('.gas').length >= 1
      ? BUTTON_GAS.classList.remove('inactive') : BUTTON_GAS.classList.add('inactive')
      document.querySelectorAll('.solid').length >= 1
      ? BUTTON_SOLID.classList.remove('inactive') : BUTTON_SOLID.classList.add('inactive')
    },
    heatinputAction() {
      const INPUT_FIELD = document.querySelector('#heatinput_table')

      const SELECTION = document.querySelector('.metricmenu_table').textContent
      const SLIDER = document.querySelector('#heat_slider')

      if (SELECTION === 'C') {
        const toC = eval(this.convertToKelvin.C)
        SLIDER.value = toC(Number(INPUT_FIELD.value))
        SLIDER.dispatchEvent(new Event('input'));
      }
      else if (SELECTION === 'F') {
        const toF = eval(this.convertToKelvin.F)
        SLIDER.value = toF(Number(INPUT_FIELD.value))
        SLIDER.dispatchEvent(new Event('input'));
      }
      else {
        SLIDER.value = +(INPUT_FIELD.value)
        SLIDER.dispatchEvent(new Event('input'));
      }

      this.sliderChange()
      return
    },
    formatNumber (value) {
      if (value >= 0.01) {
        return Number(value.toFixed(2))
      } else {
        if (value < 0.00001) {
          return Number.parseFloat(Number(value.toFixed(100)))
          .toExponential().toPrecision(2)
        }
        return value
      }
    },
    convertUnit($event) {
      const CLICKED = $event.target;
      const SELECTION = CLICKED.textContent
      document.querySelector('.metricmenu_table').textContent = SELECTION

      this.heatValue = this.metric_Initials.K
      document.querySelector('#heatinput_table').value = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;

      this.heat_toDisplay_table = SELECTION === 'C' ? this.metric_Initials.C : SELECTION === 'F' ? this.metric_Initials.F : this.metric_Initials.K;
    },
    async compoundAdd($event) {
      const d = $event.target.classList.contains('table_elementContainer') ? $event.target.cloneNode(true) : $event.target.closest('.table_elementContainer').cloneNode(true);

      const compoundBucket = document.querySelector('.compoundBucket')
      const compoundList = document.querySelector('.compoundResult')

      // İlk element olup olmadığını kontrol et
      let firstTime = 1; if (this.compounds_list.length !== 0) { firstTime = 0; }

      // İzin verilen element sayısı
      if (compoundBucket.children.length > 6) {console.log('Max. compound element limit.'); return;}

      // Bileşiğe eklenemeyecek olanları engelle
      if ($event.target.classList.contains('mute')) return
      
      // Başlangıç yazısı
      // const TUTOR = document.querySelector('.tutorial_CompoundModule_FirstTime')
      // if (TUTOR) TUTOR.remove()
      document.querySelector('.compoundSample').classList.add('inactive')
      
      // Seçilen elementi sembolünü al
      const selectedSymbol = d.querySelector('.table_symbol').textContent

      // Listelenmiş bileşikleri temizle
      compoundList.textContent = '';
      
      // Elementin görünüşünü bileşik kovasına sığacak şekilde düzenle
      const clone = d//.childNodes[0]//.childNodes[0]
      clone.classList.add('compoundElement')
      // clone.classList.add('highlight')
      // clone.childNodes.forEach((x) => {x.style.color = 'black'; x.style.fontWeight = '900'})
      clone.id = 'cmp'+selectedSymbol
      clone.setAttribute('data-count', 1)

      // const counter = document.createElement('div')
      // // counter.textContent = '+'
      // // counter.style.position = 'absolute'
      // // counter.style.bottom = '-1rem'
      // // counter.style.color = 'white'
      // // counter.style.left = '0'
      // counter.classList.add('compoundElementCounter')
      // let text = document.createTextNode('Test');
      // counter.appendChild(text);
      
      // d.appendChild(counter)

      const convertSubscript = (str) => {return str.replaceAll('0', '₀').replaceAll('1', '₁').replaceAll('2', '₂').replaceAll('3', '₃').replaceAll('4', '₄').replaceAll('5', '₅').replaceAll('6', '₆').replaceAll('7', '₇').replaceAll('8', '₈').replaceAll('9', '₉')}
        
      if (!compoundBucket.querySelector('#cmp'+selectedSymbol)) {
        // Seçilen elementi bileşik kovasına ekle
        compoundBucket.appendChild(d);
      }
      else {
        const cmp = compoundBucket.querySelector('#cmp'+selectedSymbol)

        const newCount = Number(cmp.getAttribute('data-count'))+1
          cmp.setAttribute('data-count', newCount)
          cmp.querySelector('.table_symbol').textContent = convertSubscript(selectedSymbol + cmp.getAttribute('data-count'))
      }

      // Eklenen ilk element için veritabanından veri çek
      if (firstTime) {
        await fetch('http://localhost:3000/compounds/?symbol=' + selectedSymbol)
          .then(r => r.json())
          .then(data => {

            data.forEach(element => {
              this.compounds_list.push(element.formula)
            });
          },
          response => {
            console.log('Error loading json:', response)
        });
      }
      
      // Sonradan eklenen tüm elementleri önceden alınan veri içinden filtrele
      if (!firstTime) {
        this.compounds_list = this.compounds_list.filter(compound => compound.includes(selectedSymbol))
      }
      
      // Bulunan bileşikleri listele
      // let listNode = document.createElement('h6');
      // listNode.appendChild(document.createTextNode(convertSubscript(this.compounds_list.join('\n'))));
      // compoundList.appendChild(listNode)

      
      // Bulunan bileşikleri listele
      let listNode = document.createElement('p');
      this.compounds_list.forEach((x) => {
        compoundList.insertAdjacentHTML("beforeend", `<a href="google.com">${convertSubscript(x)+'\n'}</a>`);
      })
      compoundList.appendChild(listNode)

      // İçerilen tüm sembolleri ayıkla
      let SYMBOLS = []
      this.compounds_list.forEach((comp) => {
        const Elements = [...comp.replaceAll('+','').replaceAll('?','')].filter(x => isNaN(x));
              
        Elements.forEach(function(el, i) {

          const listOfSubscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉']
          const subCheck = (x) => {return listOfSubscript.includes(x)}

          const nextElement = i !== Elements.length-1 ? Elements[i+1] : Elements[i]
          if (el === el.toUpperCase() && nextElement === nextElement.toLowerCase() && !subCheck(nextElement)) {
            SYMBOLS.push(el + nextElement)
          }
          else if (el === el.toUpperCase() && nextElement !== nextElement.toLowerCase() && !subCheck(nextElement)) {
            SYMBOLS.push(el)
          }
          else {
            true
          }
        })
      })

      // İçerilen sembollerin dışındaki elementleri seçilemez duruma getir
      document.querySelectorAll('.table_elementContainer').forEach(function(element) {
        SYMBOLS.includes(element.querySelector('.table_symbol').textContent)
        ? element.classList.remove('mute')
        : element.classList.add('mute')
      })

      document.querySelector('.compoundBucket').childNodes.forEach(el => el.classList.remove('mute'))
      
      // get common elements
      // const getCommon = res => [...new Set(res.flat())].filter(a => res.every(c => c.includes(a)));
    },
    tableSearching($event) {
      const INPUT = $event.target.value.toLowerCase()
      const KEY = document.querySelector('.table_demo_element')
      
      const CONDITIONS = function(el) {
        let searchIn = []
        if (INPUT.includes('.')) {
          searchIn = [
            el.querySelector('.table_atomicMass').textContent
          ].join('').toLowerCase()
        }
        else if (INPUT.includes('#')) {
          searchIn = [
            el.querySelector('.table_atomicNumber').textContent
          ].join('').toLowerCase()
        }
        else {
          searchIn = [
            el.querySelector('.table_atomicNumber').textContent,
            el.querySelector('.table_symbol').textContent,
            el.querySelector('.table_name').textContent,
            el.querySelector('.table_atomicMass').textContent.split('.')[0]
          ].join('').toLowerCase()
        }
        
        return INPUT !== ''
        && INPUT.includes('#') ? searchIn == (INPUT.replace('#', '')) : INPUT !== '' && searchIn.includes(INPUT)
      }

      document.querySelectorAll('.element').forEach(function(element) {
        element.style.removeProperty('filter');
        if (CONDITIONS(element)) {
          element.style.filter = 'drop-shadow(0 0 .3vw white)'
          element.classList.remove('mute')
        }
        else {
          if (INPUT === '') {
            element.classList.remove('mute')
            KEY.classList.remove('mute')
          }
          else {
            element.style.removeProperty('filter');
            element.classList.add('mute')
            KEY.classList.add('mute')
          }
        }
      })
    },
  },
  mounted() {
    this.viewGroupStylizer()
    
    if (!/\?=/.test(window.location.href)) return

    this.$nextTick(function () {
      const refID = '#' + window.location.href.split('?=')[1].split('_')[0]
      document.querySelector('#tableSearch').value = refID
      document.querySelector('#tableSearch').dispatchEvent(new Event('input'));
    })
  },
}
</script>

<style lang="scss" scoped>
  .infoBar {
    position: relative;
  }
  .thanks {
    position: relative;
    margin-top: .7vw;
    width: 20rem;
    word-wrap: break-word;
    span {
      font-size: .6vw;
      display: none;
      color: white;
      transition: all 1000ms linear;
    }
    
    #thanks-bionluk {
      position: absolute;
      top: -4vw;
      left: .8vw;
      width: 3vw;
    }

    &:hover {
      span {
        position: absolute;
        display: block;
      }
      opacity: 1;
    }
  }

  .search {
    grid-row-start: 1; grid-column-start: 13; grid-column-end: 18;
    #tableSearch {
      height: 2vw;

      margin-top: 1vw;
      
      width: 98%;
      font-size: .7vw;
    }
    z-index: 1;
  }

  .element {
    padding: .113vw;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(18, 1fr);
    grid-template-rows: repeat(8, 1fr);
  }
  .table_tabs {
    grid-row-start: 1; grid-row-end: 1; grid-column-start: 3; grid-column-end: 13;
    align-self: center;
    z-index: 0;
  }
  .switch {
    margin-top: 1.3vw;
    margin-left: .5vw;
    position: relative;
    display: inline-block;
    grid-row-start: 1; grid-column-start: 2;
    width: 3.5vw;
    height: 2vw;
  }
  .btn {
    border-radius: .3rem;
    padding: .5vw;

    margin: .3vw;
    min-width: 2vmax;
    max-height: 2vmax;
    align-self: center;
    
    &:hover {
      cursor: pointer;
      box-shadow: 0 0 .2vw black;
      // border: 1px solid black;
    }
  }

  .slider-label-right {
    size: 1vw;
    align-self: flex-end;
  }
  

  .modules {
    grid-row-start: 2; grid-row-end: 4; grid-column-start: 3; grid-column-end: 13;
    padding: 1vw;
    margin-left: .2rem; margin-right: .2rem; margin-bottom: .2vw;
    border-radius: .3rem;
    background-color: transparent;
    background-color: #242b3a;
    // background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);
    // display: inline-block;

    h2 {
      font-size: 1vw;
    }

    h5 {
      font-size: .6vw;
    }

    .element-summary-description {
      font-size: .7vw;
    }

    .states {
    /* grid-row-start: 3; grid-column-start: 4; grid-column-end: 7; */
      #solid {
        background-image: linear-gradient(135deg, #acbdff, rgba(82, 101, 185, 0.4));
        // background-image: linear-gradient(135deg, #d5b7ff, rgba(185, 148, 250, 0.4));
      }
      #liquid {
        // background-image: linear-gradient(135deg, #acbdff, rgba(136, 158, 255, 0.4));
        background-image: linear-gradient(135deg, #46b4b2, #2b807e);
      }
      #gas {
        background-image: linear-gradient(135deg, #FF44CC, #df25ad);
        // background-image: linear-gradient(135deg, #46b4b2, #56d9d7);
      }
      #uncertain {
        background-image: linear-gradient(135deg, #fd7b2f, #ee9038 100%);
      }
      
      img {
        height: 1vmax; width: 1vmax; margin-top: -.1vmax;
      }

      // .state {
      //   border-radius: .3vw;

      //   margin-right: 1vw;
      //   height: 2vmax;
      //   width: 2vmax;
      //   text-align:center;
        
      //   box-shadow: 0 0 0 .1vw #343f54;
      //   background-image: linear-gradient(135deg, #343f54, #232a38);
      //   &:hover {
      //     cursor: pointer;
      //     box-shadow: 0 0 .2vw black;
      //   }
      // }
    }

    .groupFilter {
      position: absolute;
      // left: 7vw;
      // width: 7.03vw;
      height: 6vw;
      margin-top: -.3vw;
      margin-left: 2.5vw;

      .s-block {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 4.8vw;
        // width: 29vw;
        left: -1vw;
      }
      .d-block {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 2.4vw;
        left: 1.2vw;
        top: 2.4vw;
      }
      .p-block {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 3.8vw;
        right: -9.5vw;
        top: 1.1vw;
      }
      .f-block {
        object-fit: contain;
        position: absolute;
        cursor: pointer;
        height: 1.4vw;
        bottom: -.5vw;
        right: -9.5vw;
      }
    }
    .compoundContainer {
      position: relative;
      height: 100%;
    }
    .compoundBucket {
      width: 60%;
    }
    .compoundBucket > * {
      // margin-right: .1vw;
      float:left;
    }

    .compoundSample {
      height: 4.1vmax;
      width: 4.1vmax;
      
      border: 2px dashed #ccc;
      border-radius: .3rem;
      
      background: rgb(39,47,63);
      background-image: linear-gradient(136deg, #272f3f 0%, #1d232f 100%);

      position: relative;
      &::after {
        content: '+';
        font-size: 2vmax;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(110%, 20%);
      }
    }

    .compoundResult {
      height: 100%;
      min-width: 25%;
      word-wrap: break-word;
      white-space: pre-wrap;
      word-break: break-word;

      position:absolute;
      overflow:scroll;
      overflow-x: hidden;
      right: 0;

      border-left: 1px solid rgba($color: #fff, $alpha: .2);
      padding-left: 1vw;
      font-size: 1vw;
    }

    .table_categoricalFilter_container {
      margin-top: -.8vmax;
      margin-left: 14.8vw;

      height: 1vw;
      width: 26vw;

      .table_categoricalFilter {
        list-style: none;
        margin-left: 1.4vw;
        float: left;

        // text-align: center;
        font-size: .65vmax;

        .mainFilter {
          color:#e5bb09;
          font-size: .6vmax;
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }

        li {
          margin: .1vw 0;
          left:20vw;
          
          background-color: #1d2330;
          padding: 0 .5vw;
          border-radius: .3vw;
          
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        // li::before {
        //   content: '• ';
        // }
      }
    }
    .checkBox {
      font-size: 1vw;
      margin-left: .3vw;
    }

    // #heat {
    //   transition: all 2s ease;
    // }
    
    #heatinput_table {
      width: 6vw;
      border: 1px solid #343f54;
      margin-right: .2vw;
      font-size: 1vw;
      text-align: right;
      
      display: inline-block;
      border: none;
      position: relative;
    }
  }
  
  .compoundElement {
    width: 5vw;
    transform: scale(.7);
    transform-origin: left top;
    margin-right: -1vw !important;

    &:hover {
      filter: unset !important;
      cursor: unset !important;
    }

    &::after,&::before {
      min-width: 1.5vw;
      height: 1.5vw;
      line-height: 1.5vw;
      
      font-size: larger;
      text-align: center;
      
      border-radius: .3vw;
      background: rgba($color: #222, $alpha: .7);
      border: 1px solid rgba($color: #fff, $alpha: .2);
      
      position: absolute;
      right: .1vw;
    }

    &::before {
      bottom: .2vw;
      content: '-';
    }
    &::after {
      top: .2vw;
      content: '+';
    }
  }
  .compoundElementCounter {
    position: absolute !important;
    top: 0 !important;
    right: 0 !important;
    color: white !important;
    font-size: 2rem !important;
  }

  .table_demo_element {
    margin-top: -7.3vw;
    margin-left: 5.3vw;
    width: 7vw;
    height: 7vw;
    padding: .3vw;

    border-radius: 6px;
    background-image: linear-gradient(136deg, #80fffc 0%, #5ab3b0);
    background-image: linear-gradient(136deg, #272f3f 0%, #1d2330);

    color: #ccc;
    
    .table_demo_block {
      justify-self: flex-start;
      cursor: default;
    }
    .table_demo_number {
      font-weight: bolder;
      font-size: .8vw;
      margin-top: .2rem;
      opacity: .7;
    }
    .table_demo_symbol {
      font-size: 1.1vmax;
      font-weight: bold;
      letter-spacing: normal;
    }
    .table_demo_name {
      text-align: left;
      margin-top: 2vw;
      font-size: .62vw;
    }
    .table_demo_atomic {
      float: left;
      font-weight: 100;
      font-size: .6vw;
      opacity: .5;
    }
  }
  

  .dropdown-content {
    bottom: 2.2rem;
    height: 6rem;
    width: 1.5rem;
    img {
      width: 1.5rem;
    }
  }

  #tableLanguagemenu {
    position: absolute;
    display: inline-block;
    top: 5vw;
    left: 50vw;
    transform: translateX(-50%);
    .dropdown-button {
      background-color: rgba($color: #000, $alpha: .1);;
      color: #fff;
      padding: .1rem .5rem;
      height: auto;
      min-width: 5rem;
      border-radius: .3rem;
      font-size: 1rem;
      border: none;
      cursor: pointer;
      text-align: left;
    }
    #langmenu_table {
      // grid-row-start: 1; grid-row-end: 4; grid-column-start: 3; grid-column-end: 13;

      margin-left: 2rem;
      // color: #e5bb09;
      align-self: center;
      img {
        width: 2vw;
      }
      
      min-width: 1.5vw;
      &::before {
        // content: "⮟ ";
        content: "";
        
        color: #e5bb09;
      }
    }
  }
</style>