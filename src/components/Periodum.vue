<template>
  <div class="fade margin">
    <div class="header">
      <div class="navLeft"> <router-link to="/"> 
        <img  alt="Periodum Logo" src="../resources/img/periodum.svg" height="40"> 
       
      </router-link> </div>
      <div class="navRight"> 
        <router-link to="/kunye" class="navIcon">künye</router-link>
        <router-link to="/hakkinda" class="navIcon">hakkında</router-link>
        <a href="https://evrimagaci.org/destekol" target="_blank" class="navIcon">destek</a>
      </div>
    </div>
    
    <router-view v-if="!homepage" />
    <div v-if="homepage">
      <div class="fade list"> <ListDisplay :elements="elements" @getElement="setElement" /> </div>
      <div class="fade table"> <TableDisplay :elements="elements" @getElement="setElement" /> </div>
    </div>
  
    <div @click="toggleModal" class="modal" id="element_modal">
      <div :class="{
      'modal active': modalViewable === true,
      'modal inactive': modalViewable === false}">
        <ElementModal :element="currentElement"></ElementModal>
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
import ELEMENT from '@/resources/elements.json'
import TOUR from '@/addons/PageTour.vue'

export default {
  components: { ListDisplay, TableDisplay, ElementModal, TOUR },
  name: 'PeriodumPage',
  data() {
    return {
      elements: ELEMENT,
      currentElement: ELEMENT[0],
      modalViewable: false,
      social: {
        discord: require("../resources/img/credits/discord.svg")
      }
    }
  },
  computed: {
    homepage() {
      return this.$route.name === 'home'
    }
  },
  props: {
    mode: String
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
  .table  { 
    display: block;
    height: fit-content;
  }
  .list   { display: none;  }

  @media screen and (max-width: 720px) {
    .table { display: none; }
    .list {
      display: block;
      width: 85vw;
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

    width: 100%;
    
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