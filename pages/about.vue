<template>
  <div>
    <div class="about-header">
      <div class="header-title">{{ title }}</div>
    </div>
    <div class="about-body" style="padding: 0 158px">
      <div v-if="subtitle" class="title">{{ subtitle }}</div>
      <div class="description" v-html="description" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  layout: 'info',
  asyncData({ error, params, app, store }) {
    return app.$axios
      .get(`/api/about`)
      .then(({ data }) => {
        if (!data) {
          return error({ statusCode: 404 })
        }
        return {
          title: data.title,
          subtitle: data.subtitle,
          description: data.html,
        }
      })
      .catch((err) => {
        return error({ statusCode: 404, message: err })
      })
  },
  data() {
    return {
      title: null,
      subtitle: null,
      description: null,
    }
  },
}
</script>

<style lang="scss" scoped>
.about-header {
  background: url('../assets/images/rectangle-kunye.png') no-repeat;
  background-size: 100% 200px;
  height: 298px;
  object-fit: contain;
}
.about-body {
  height: calc(100vh - 351px);
}
.title {
  font-size: 12px;
  font-weight: 800;
  color: white;
}
.description {
  font-size: 0.8em;
  color: #878c97;
  font-weight: normal;
}
.header-title {
  font-size: 24px;
  font-weight: 800;
  color: white;
  padding-top: 145px;
  padding-left: 180px;
}
</style>

<style>
p {
  margin-top: 10px !important;
}
li {
  margin-top: 5px;
}
</style>
