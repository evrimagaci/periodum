import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default ({ app }) => {
  Vue.use(
    VueGtag,
    {
      config: { id: 'G-8532FJ3033' },
      appName: 'Periodum',
      pageTrackerScreenviewEnabled: true,
    },
    app.router
  )
}
