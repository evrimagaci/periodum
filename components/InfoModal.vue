<template>
  <el-dialog :visible="$store.state.showInfoModal" :show-close="false" :before-close="beforeClose" :close-on-click-modal="false" @open="getContent">
    <img src="../assets/icons/icons-close.svg" class="close-btn" @click="beforeClose" />
    <div slot="title">
      <div style="display: flex">
        <img :src="content.image" class="element-image" />
        <div style="margin-left: 15px">
          <div class="title">
            {{ content.title }}
          </div>
          <div class="description">
            {{ content.subtitle }}
          </div>
          <div style="margin-top: 20px">
            <a class="url" :href="content.url" target="_blank">{{ content.url }}</a>
          </div>
        </div>
      </div>
    </div>
    <div v-loading="loading" class="dialog-body">
      <p style="color: #878c97; word-break: break-word" v-html="content.html" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'InfoModal',
  data() {
    return {
      loading: false,
      show: false,
      info: null,
      content: {
        contentId: null,
        title: null,
        subtitle: null,
        image: null,
        html: null,
      },
    }
  },
  methods: {
    beforeClose() {
      this.$store.commit('SHOW_INFO_MODAL', false)
    },
    async getContent() {
      this.loading = true
      try {
        const result = await this.$axios.get(`/api/contents/${this.$store.state.selectedContentId}`)
        if (result.data.status) {
          this.content = result.data.content
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '~@/assets/css/partials/variables';
.close-btn {
  cursor: pointer;
  top: -24px;
  right: 0;
  position: absolute;
}
.el-dialog {
  background-color: #272f3f !important;
}
.el-dialog__header {
  background-image: url('../assets/images/rectangle.png');
  background-repeat: no-repeat;
  background-size: 100% 150px;
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
