const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '',
  pwa: {
    manifestOptions: {
      name: "Periodum by Evrim Ağacı",
      short_name: "Periodum",
      start_url: "./",
      display: "standalone",
      theme_color: "#1A1F2A",
      icons: [
        {
          src: "./favicon.svg",
          sizes: "512x512",
          type: "image/svg+xml",
          purpose: "any maskable",
        },
      ],
    },

    themeColor: "#1A1F2A",
    msTileColor: "#1A1F2A",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#1A1F2A",
    iconPaths: {
      maskicon: null,
      favicon32: "./favicon.svg",
      favicon16: "./favicon.svg",
      appleTouchIcon: null,
      msTileImage: null,
    },
    // configure the workbox plugin
    workboxPluginMode: "GenerateSW",
  },
})
