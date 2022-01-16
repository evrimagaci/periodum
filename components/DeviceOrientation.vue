<template>
  <el-dialog
    :visible="visible"
    :show-close="false"
    class="device-orientation"
    :before-close="beforeClose"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    width="90vw"
    style="padding: 10px"
  >
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

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';
.close-btn {
  cursor: pointer;
  top: -24px;
  right: 0;
  position: absolute;
}
</style>
