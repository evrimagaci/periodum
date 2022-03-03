<template>
  <div class="main">
    <SideBar />
    <PeriodicTable />
  </div>
</template>

<script>
export default {
  asyncData({ error, params, app, store, req }) {
    return app.$axios
      .get(`/api/elements`)
      .then(({ data }) => {
        if (!data) {
          return error({ statusCode: 404 })
        }
        const reducedList = data.map((element) => ({
          symbol: element.symbol,
          name_tr: element.name_tr,
          name_en: element.name_en,
          number: element.number.toString(),
        }))
        store.commit('SET_SEARCH_ELEMENTS', reducedList)
        store.commit('SET_ELEMENTS', data)
      })
      .catch((err) => {
        return error({ statusCode: 404, message: err })
      })
  },
  async created() {
    try {
      // const { data: compounds } = await this.$axios.get(`/api/compounds`)
      const { data: isotopes } = await this.$axios.get(`/api/isotopes`)
      // this.$store.commit('SET_COMPOUNDS', compounds)
      this.$store.commit('SET_ISOTOPES', isotopes)
    } finally {
      this.$store.commit('SET_COMPOUNDS_FETCHED', true)
      this.$store.commit('SET_ISOTOPES_FETCHED', true)
    }
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';

.main {
  width: calc(100% - 200px);
  position: relative;
  display: flex;
  margin: 35px 0 30px 40px;
}

.cell-title {
  text-align: center;
  font-size: 10px;
  color: $gray;
}
</style>
