<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    width="90vw"
    data-testid="device-orientation"
    style="padding: 10px"
  >
    <img src="../assets/icons/icons-close.svg" class="close-btn" @click="beforeClose" />
    <div style="text-align: center">
      <img src="../assets/images/group-26@3x.png" style="width: 100px; height: 100px; margin: auto" />
    </div>
    <div class="do-dialog-body">
      <span class="do-dialog-title"
        ><span>Yan Çevir</span> <span style="display: inline-block; width: 100%; font-size: 1.1rem; font-weight: 600; padding: 15px 0">veya</span> <span>PC'ye Geç</span></span
      >
    </div>
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

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';
.close-btn {
  cursor: pointer;
  top: 24px;
  right: 24px;
  position: absolute;
}
.do-dialog-body {
  position: relative;
  display: inline-block;
  text-align: center;
  margin: 20px;
  padding-top: 25px;
}
.do-dialog-title {
  font-size: 1.6rem;
  color: $white;
  font-weight: 900;
  span {
    white-space: nowrap;
  }
}
</style>
