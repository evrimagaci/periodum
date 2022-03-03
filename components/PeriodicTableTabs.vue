<template>
  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane label="Sıcaklık" name="temp">
      <Temperature />
    </el-tab-pane>
    <el-tab-pane label="Filtre" name="second">
      <Filters />
    </el-tab-pane>
    <el-tab-pane label="Bileşikler" name="third">
      <CompoundContainer />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import Temperature from './Temperature.vue'
export default {
  name: 'PeriodicTableTabs',
  components: { Temperature },
  data() {
    return {
      activeName: 'temp',
    }
  },
}
</script>

<style lang="scss" scoped>
.tabs {
  grid-area: 1 / 3 / span 3 / span 10;
}
</style>
