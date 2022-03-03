<template>
  <div class="sidebar-container">
    <el-drawer size="300px" :append-to-body="false" custom-class="sidebar" :visible.sync="drawer" :modal="false" direction="ltr" :before-close="handleClose">
      <template #title>
        <div>
          <img class="logo" src="~/assets/icons/logo.png" />
        </div>
      </template>
      <ElementInfo />
    </el-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'SideBar',
  data() {
    return {
      drawer: false,
    }
  },
  computed: {
    ...mapGetters(['selectedElement']),
  },
  watch: {
    selectedElement(value) {
      this.drawer = !!value
    },
  },
  methods: {
    handleClose() {
      this.$store.commit('SET_SELECTED_ELEMENT', null)
    },
  },
}
</script>

<style lang="scss">
.sidebar-container .el-drawer__wrapper {
  width: 300px !important;
  .sidebar {
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    background-color: rgba(10, 12, 16, 0.6);
    .el-drawer__header {
      margin-bottom: 0;
      max-height: 60px;
    }
  }
  .logo {
    height: 45px;
  }
}
</style>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.mobile-sidebar {
  height: calc(100vh - 104px);
  width: 300px;
  padding: 20px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  z-index: 8;
  position: absolute;
  top: 53px;
  left: 0;
}

.oriented-sidebar {
  height: calc(100vw - 76px);
  width: 300px;
  padding: 20px 0 36px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  z-index: 8;
  position: absolute;
  top: 53px;
  left: 0;
  .wrapper {
    position: relative;
    overflow: auto;
    max-height: calc(100vw - 94px) !important;
  }
}

.close-btn {
  position: absolute;
  cursor: pointer;
  width: 34px;
  height: 34px;
  padding: 10px 10px 21px;
  border-radius: 0 12px 12px 0;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  background-color: rgba(10, 12, 16, 0.6);
  right: -34px;
  top: 0;
  font-size: 12px;
  color: $white;
}

@supports not (backdrop-filter: blur()) {
  .sidebar,
  .mobile-sidebar,
  .oriented-sidebar,
  .close-btn {
    background-color: rgba(10, 12, 16, 1);
  }
}
</style>
