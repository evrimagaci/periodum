<template>
  <el-dialog :visible="!!selectedContentId" class="info-modal" :show-close="false" :before-close="beforeClose" modal :close-on-click-modal="false" @open="getContent">
    <div v-if="!loading" slot="title" style="display: flex; align-items: center">
      <img src="../assets/icons/icons-close.svg" class="close-btn" @click="beforeClose" />
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
    <div>
      <Loading :active="loading" :is-full-page="false" />
      <InfoModalContent v-if="!loading" :html="content.html" />
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
export default {
  name: 'InfoModal',
  components: {
    Loading,
  },
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
  computed: {
    ...mapGetters(['selectedContentId']),
  },
  methods: {
    beforeClose() {
      this.$store.commit('SET_SELECTED_CONTENT_ID', null)
    },
    async getContent() {
      this.loading = true
      try {
        const result = await this.$axios.get(`/api/contents/${this.selectedContentId}`)
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

.element-image {
  width: 250px;
}

.el-dialog__body {
  padding: 15px 20px;
  height: 320px;
  overflow: auto;
}

.title {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
}
.description {
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  margin-top: 5px;
}
.url {
  font-size: 14px;
  font-weight: 600;
  color: #aa80ff;
  margin-top: 25px;
}
</style>
