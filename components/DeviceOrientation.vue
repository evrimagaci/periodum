<template>
  <el-dialog :visible="visible" :show-close="false" :before-close="beforeClose" :close-on-click-modal="false" :modal-append-to-body="false" width="90vw" style="padding: 10px">
    <img src="../assets/icons/icons-close.svg" class="close-btn" @click="beforeClose" />
    <div slot="title" style="text-align: center">
      <img src="../assets/images/group-26@3x.png" style="width: 100px; height: 100px; margin: auto" />
    </div>
    <div class="dialog-body"></div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DeviceOrientation',
  props: {
    visible: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    beforeClose() {
      this.$emit('close')
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';
.close-btn {
  cursor: pointer;
  top: -24px;
  right: 0;
  position: absolute;
}
.el-dialog {
  background-color: #272f3f !important;
  margin: 15vh 0 0 4vw !important;
}
.el-dialog__header {
  height: 210px;
  padding: 20px;
  .title {
    font-size: 24px;
    font-weight: 800;
    color: #fff;
    margin-top: 68px;
  }
  .description {
    font-size: 12px;
    font-weight: 800;
    color: #fff;
    margin-top: 5px;
  }

  .url {
    font-size: 10px;
    font-weight: 600;
    color: #aa80ff;
    margin-top: 25px;
  }
}
.el-dialog__body {
  padding: 15px 20px;
  height: 320px;
  overflow: auto;
}
.dialog-body {
  padding: 30px;
  position: relative;
}
.element-image {
  width: 250px;
  height: 180px;
}
</style>
