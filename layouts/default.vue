<template>
  <el-container>
    <el-header class="top-bar">
      <div class="flex items-center justify-between w-full h-full">
        <router-link to="/" class="flex items-center">
          <img class="logo" src="~/assets/icons/logo.png" />
        </router-link>
        <Search />
      </div>
    </el-header>
    <el-main>
      <Nuxt :search-text="searchText" />
    </el-main>
    <InfoModal />
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
        <div class="text-sm flex flex-col justify-end">
          <div class="flex font-extrabold ml-auto mb-1">
            <router-link class="text-white no-underline" to="/about">
              <div class="text-xs">Proje Hakkında</div>
              <div style="border-radius: 2px; height: 3px; background-color: #80fffc; margin-top: 2px; width: 20px"></div>
            </router-link>
            <router-link class="text-white no-underline" to="/credits" style="margin-left: 50px">
              <div class="text-xs">Künye</div>
              <div style="border-radius: 2px; height: 3px; background-color: #80fffc; margin-top: 2px; width: 20px"></div>
            </router-link>
          </div>
          <div class="self-end text-custom-gray">Tüm hakları saklıdır. Ticari amaç gütmeksizin, eğitim amaçlı olarak özgürce kullanılabilir.</div>
        </div>
      </div>
    </el-footer>
  </el-container>
</template>
<script>
import Search from '~/components/Search.vue'
export default {
  components: {
    Search,
  },
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
}
</script>
<style lang="scss" scoped>
.logo {
  height: 45px;
}
</style>
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
  background-color: #1a1f2a;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.top-bar {
  width: 100%;
  height: 60px;
  opacity: 0.9;
  z-index: 1;
  background-color: #050505;
}
.bottom-bar {
  width: 100%;
  padding: 15px 20px !important;
  opacity: 0.9;
  background-color: #0b0e13;
}
.text-custom-gray {
  color: $gray;
}
</style>
