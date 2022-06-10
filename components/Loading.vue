<template>
  <div class="loading" v-html="PeriodumLoadingSvg" />
</template>

<script>
import PeriodumLoadingSvg from '~/assets/images/Periodum.svg?raw'

export default {
  name: 'Loading',
  data() {
    return {
      PeriodumLoadingSvg,
    }
  },
}
</script>

<style>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 9999;
  background-color: #000;
}
</style>
