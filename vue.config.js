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
        {
          src: "./img/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "./img/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "./img/icons/android-chrome-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable"
        },
        {
          src: "./img/icons/android-chrome-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable"
        }
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
