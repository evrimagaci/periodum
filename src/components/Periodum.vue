<template>
  <div class="fade margin">
    <div class="header">
      <div class="navLeft"> <router-link to="/"> 
        <img  alt="Periodum Logo" src="../resources/img/periodum.svg" height="40"> 
      </router-link> </div>

      <div class="navRight"> 
        <router-link to="/kunye" class="navIcon">
          {{ loc.pages.credits.title }}
        </router-link>
        <router-link to="/hakkinda" class="navIcon">
          {{ loc.pages.about.title }}
        </router-link>
        <a :href="loc.pages.support.link_to" target="_blank" class="navIcon">
          {{ loc.pages.support.title }}
        </a>
        
        <button @click="languageSwitch()" class="navIcon" id="languageSwitcher"><img src="" alt=""></button>
      </div>
    </div>
    
    <router-view :loc="loc" v-if="!homepage" />
    <div v-if="homepage">
      <div class="fade list"> <ListDisplay :locale="loc" :elements="elements" @getElement="setElement" @changeLanguage="changeLanguage" /> </div>
      <div class="fade table"> <TableDisplay :locale="loc" :elements="elements" @getElement="setElement" @changeLanguage="changeLanguage" /> </div>
    </div>
  
    <div @click="toggleModal" class="modal" id="element_modal">
      <div :class="{
      'modal active': modalViewable === true,
      'modal inactive': modalViewable === false}">
        <ElementModal :locale="localization" :element="currentElement"></ElementModal>
      </div>
    </div>
  </div>

  <div v-if="visitedBefore() === 'false'" >
    <TOUR />
  </div>

  <footer v-if="!homepage">
    <a href="https://dar.vin/eadiscord_periodum" class="social">
      <img :src="social.discord" alt="discord logosu">Evrim Ağacı Discord Sunucusuna Katıl
    </a>
  </footer>
</template>

<script>
import ListDisplay from '@/components/ListModeDisplay.vue'
import TableDisplay from '@/components/TableModeDisplay.vue'
import ElementModal from '@/components/ElementModal.vue';
import TOUR from '@/addons/PageTour.vue'

import ELEMENT from '@/resources/elements_main.json'

const ELEMENT_LANGUAGE = require("../resources/locale/tr/elements_text.json");
const CONTENT_LANGUAGE = require("../resources/locale/tr/general.json");

const _ = require("lodash");
const objectsById = {};
// Store json1 objects by id.
for (const obj1 of ELEMENT) {
    objectsById[obj1.number] = obj1;
}

for (const obj2 of ELEMENT_LANGUAGE) {
    const id = obj2.number;

    if (objectsById[id]) {
        // Object already exists, need to merge.
        // Using lodash's merge because it works for deep properties, unlike object.assign.
        objectsById[id] = _.merge(objectsById[id], obj2)
    } else {
        // Object doesn't exist in merged, add it.
        objectsById[id] = obj2;
    }
}

// All objects have been merged or added. Convert our map to an array.
const ELEMENTS = Object.values(objectsById);

export default {
  components: { ListDisplay, TableDisplay, ElementModal, TOUR },
  name: 'PeriodumPage',
  data() {
    return {
      elements: ELEMENTS,
      currentElement: ELEMENTS[0],
      loc: CONTENT_LANGUAGE,
      modalViewable: false,
      social: {
        discord: require("../resources/img/credits/discord.svg")
      },
      locale: {
        tr: require("../resources/locale/tr/general.json"),
        en: require("../resources/locale/en/general.json")
      },
      elementLanguage: {
        tr:       require("../resources/locale/tr/elements_text.json"),
        tr_flag:  require("../resources/locale/flags/tr.svg"),
        en:       require("../resources/locale/en/elements_text.json"),
        en_flag:  require("../resources/locale/flags/en.svg"),
      },
      language: 'en'
    }
  },
  computed: {
    homepage() {
      return this.$route.name === 'home'
    },
    localization() {
      return this.loc
    }
  },
  props: {
    mode: String
  },
  methods: {
    changeLanguage(lang) {
      //#region Elements
      const objectsById = {};
      
      for (const obj1 of ELEMENTS) {
          objectsById[obj1.number] = obj1;
      }

      const LANGUAGE_FILE = this.elementLanguage[lang]

      for (const obj2 of LANGUAGE_FILE) {
          const id = obj2.number;

          if (objectsById[id]) {
              objectsById[id] = _.merge(objectsById[id], obj2)
          } else {
              objectsById[id] = obj2;
          }
      }

      this.elements = Object.values(objectsById);
      this.currentElement = ELEMENTS[118]
      //#endregion

      //#region Content
      this.loc = this.locale[lang]
    },
    languageSwitch() {
      if (this.language === 'en') {
        this.language = 'tr'
        document.querySelector('#languageSwitcher').innerHTML = `<img src="${this.elementLanguage[this.language + '_flag']}" alt="${this.language} Flag">`
        this.changeLanguage('tr')
        document.querySelector('#langmenu_list').innerHTML = `<img style="width: 1.5rem;" src="${this.elementLanguage[this.language + '_flag']}" alt="${this.language} Flag">` + " Türkçe"
        return
      }
      else {
        this.language = 'en'
        document.querySelector('#languageSwitcher').innerHTML = `<img src="${this.elementLanguage[this.language + '_flag']}" alt="${this.language} Flag">`
        this.changeLanguage('en')
        document.querySelector('#langmenu_list').innerHTML = `<img style="width: 1.5rem;" src="${this.elementLanguage[this.language + '_flag']}" alt="${this.language} Flag">` + " English"
        return
      }
    },
    getUserLanguage() {
      this.language = navigator.language.split('-')[0]
      document.querySelector('#languageSwitcher').innerHTML = `<img src="${this.elementLanguage[this.language + '_flag']}" alt="${this.language} Flag">`
      this.changeLanguage(this.language)
      return this.language
    },
    setElement(el) {
      this.modalViewable = !this.modalViewable
      this.currentElement = el
    },
    toggleModal($event) {
      let eventTarget = $event.target

      if (eventTarget.classList.contains('close-modal') || eventTarget.classList.contains('overlay')) { 
        // document.body.classList.remove('active_modal');
        document.body.removeAttribute('class')

        //Arama kutusunu temizle
        document.querySelector('#modalSearch').value = ''

        this.modalViewable = false;
        return
      }
      if (!eventTarget.closest('.block')) return

      this.modalViewable = !this.modalViewable
    },
    // pageChange(state) {
    //   this.appView = state
    // },
    toggleTablePanel() {
      document.querySelector('.tabbedNav').classList.remove('inactive')
      document.querySelector('.modules').classList.remove('inactive')
      document.querySelector('#tablePanelBtn').classList.add('inactive')
    },
    visitedBefore() {
      return localStorage.getItem('visited_before')
    }
  },
  mounted() {
    this.getUserLanguage()
    // const _loc = navigator.language.split('-')[0]
    
    // const objectsById = {};
    
    // for (const obj1 of ELEMENTS) {
    //     objectsById[obj1.number] = obj1;
    // }


    // const LANGUAGE_FILE = this.elementLanguage[_loc]

    // for (const obj2 of LANGUAGE_FILE) {
    //     const id = obj2.number;

    //     if (objectsById[id]) {
    //         objectsById[id] = _.merge(objectsById[id], obj2)
    //     } else {
    //         objectsById[id] = obj2;
    //     }
    // }

    // this.elements = Object.values(objectsById);
    
    // //#region Content
    // this.loc = this.locale[_loc]
  }
}
</script>

<style lang="scss" scoped>
#languageSwitcher {
  min-height: 2.5rem;
  min-width: 2.5rem;
  align-items: center;
}
  .flags {
    img {
      height: 2vw;
      min-width: 1.2vw;
      margin-right: 1vw;
    }
  }
  .table  { 
    display: block;
    height: fit-content;
  }
  .list   { display: none;  }

  @media screen and (max-width: 720px) {
    .table { display: none; }
    .list {
      display: block;
      width: 90vw;
      // width: 85vw;
    }

    // list modunda en alttaki element görünsün diye
    .margin { // margin -> Periodum.vue
      padding-bottom: 30vw;
      // margin-top: -2rem;
    }
  }

  .margin {
    margin-bottom: 5vw;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2.5vw;
    margin-top: 1rem;

    
    align-items: center;
    
    @media screen and (max-width: 720px) {
      flex-direction: column;
      margin-top: 1rem;
      padding-bottom: .5rem;
    }
  }

  span {
    font-size: 4rem;
  }

  .title {
    color:white
  }

  .navLeft {
    img {
      @media screen and (max-width: 720px) {
        max-width: 17rem;
      }
    }
    // &:hover {
    //   img {
    //     filter: grayscale(1) brightness(5);
    //   }
    // }
  }
  .navRight {
    border-radius: .5rem;
    right: 0;
    
    @media screen and (max-width: 720px) {
      padding: 1rem 0;
    }
  }
  .navIcon {
    color: #e5bb09;
    font-size: 1rem;
    margin: 0 .2rem;
    transition: all 100ms ease-in-out;

    background-color: #1a1f2a;
    border: 1px solid #232a38;
    border-radius: .3rem;

    padding: .5rem .6rem;
    &:hover {
      text-decoration: underline;
      color: white;
    }
  }

  .navIcon:hover {
    cursor: pointer;
  }

  #tablePanelBtn {
    animation: tilt-shaking 0.82s cubic-bezier(.36,.07,.19,.97) both;
  }

  @keyframes tilt-shaking {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(5deg); }
    50% { transform: rotate(0eg); }
    75% { transform: rotate(-5deg); }
    100% { transform: rotate(0deg); }
  }

  .active {
    color: whitesmoke;
    display: block;
  }
  .inactive {
    display: none;
  }

  footer {
    display: flex;
    justify-content: center;

    .social {
      color: white;
      padding: 1rem;
      background-color: #232a38;
      border-radius: .3rem;
      img {
        width: 24px; height: 24px;
        float: left;
        margin-right: 1rem;
      }
      &:hover {
        opacity: 1;
        word-break:break-all;
      }
    }
    margin: 2rem 0;
  }

</style>