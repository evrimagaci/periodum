<template>
  <el-container>
    <el-header class="top-bar">
      <div class="flex items-center justify-between w-full h-full">
        <router-link to="/" class="h-full">
          <img class="logo" src="~/assets/icons/logo.png" />
        </router-link>
        <label v-if="$route.path === '/'">
          <input :value="$store.state.searchText" class="search-box" placeholder="Element adı, atom numarası veya bir özellikle arama" @input="onInput" />
        </label>
      </div>
    </el-header>
    <el-main>
      <Nuxt :search-text="searchText" />
    </el-main>
    <el-footer height="auto" class="bottom-bar">
      <div class="flex items-center justify-between">
        <div class="flex items-center justify-between">
          <a href="https://evrimagaci.org" target="_blank">
            <img src="../assets/images/sadece-siyah-logo@3x.png" style="width: 40px; height: 40px" />
          </a>
          <a href="https://bionluk.com" target="_blank">
            <img src="../assets/images/bilogo@3x.png" style="width: 40px; height: 40px; margin-left: 20px" />
          </a>
        </div>
        <div style="display: flex; color: white; font-size: 12px; font-weight: 800">
          <div style="cursor: pointer">
            <router-link to="/about" style="color: inherit; text-decoration: none">
              <div>Proje Hakkında</div>
              <div style="border-radius: 2px; height: 3px; background-color: #80fffc; margin-top: 2px; width: 20px"></div>
            </router-link>
          </div>
          <div style="margin-left: 50px; cursor: pointer">
            <router-link to="/credits" style="color: inherit; text-decoration: none">
              <div>Künye</div>
              <div style="border-radius: 2px; height: 3px; background-color: #80fffc; margin-top: 2px; width: 20px"></div>
            </router-link>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end text-custom-gray">
        <div>Tüm hakları saklıdır. Ticari amaç gütmeksizin, eğitim amaçlı olarak özgürce kullanılabilir.</div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
// import InfoModal from '../components/InfoModal'
// import DeviceOrientation from '../components/DeviceOrientation'
export default {
  // components: { DeviceOrientation, InfoModal },
  data() {
    return {
      showDeviceOrientationModal: false,
      searchText: null,
      timer: null,
    }
  },
  // mounted() {
  //   // eslint-disable-next-line nuxt/no-globals-in-created
  //   if (window.innerHeight > window.innerWidth) {
  //     this.showDeviceOrientationModal = true
  //   }

  //   window.addEventListener(
  //     'orientationchange',
  //     () => {
  //       if (window.orientation) {
  //         this.showDeviceOrientationModal = false
  //         this.$store.commit('SET_IS_ORIENTED', true)
  //       } else {
  //         this.$store.commit('SET_IS_ORIENTED', false)
  //       }
  //     },
  //     false
  //   )
  // },
  methods: {
    onInput($event) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.$store.commit('SET_SEARCH_TEXT', $event)
      }, 500)
    },
  },
}
</script>
<style lang="scss">
@import '~@/assets/css/partials/variables';
@font-face {
  font-family: Nunito;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  src: url(https://fonts.gstatic.com/s/nunito/v16/XRXW3I6Li01BKofAnsSUYevIWzgPDA.woff2) format('woff2');
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
}
html {
  font-family: Nunito, sans-serif, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: #1a1f2a;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  // min-width: 1280px;
  width: 100%;
  position: relative;
  font-size: 24px;
}
.top-bar {
  width: 100%;
  height: 60px;
  opacity: 0.9;
  z-index: 1;
  background-color: #050505;
  .search-box {
    width: 350px;
    height: 14px;
    padding: 0.9vw 0 0.9vw 1vw;
    border-radius: 16px;
    background-color: #0b0e13;
    display: block;
    font-size: 12px;
    font-weight: 800;
    color: $white;
    border: none;
    background-image: url('~@/assets/icons/search.svg');
    background-repeat: no-repeat;
    background-position: 320px;
    &:focus {
      outline: none;
    }
  }
  ::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    font-family: Nunito, sans-serif, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
    font-size: 1em;
    color: $gray;
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    font-size: 1em;
    color: $gray;
  }
  ::-ms-input-placeholder {
    /* IE 10+ */
    font-size: 1em;
    color: $gray;
  }
}
.bottom-bar {
  width: 100%;
  padding: 30px 30px 15px;
  opacity: 0.9;
  background-color: #0b0e13;
  z-index: 1;
}
.text-custom-gray {
  color: $gray;
}
</style>
