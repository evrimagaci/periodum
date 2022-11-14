<template>
  <div v-if="sizeWatch()">
    <img @click="shareTo('twitter')" :src="this.twitter" alt="Twitter">
    <img @click="shareTo('whatsapp')" :src="this.whatsapp" alt="WhatsApp">
    <img @click="shareTo('native')" :src="this.share" alt="Share">
  </div>
  <div v-else>
    <img @click="shareNative()" :src="this.share" alt="Share">
  </div>
  <!-- <a :href="'?=' + this.input"></a> -->
</template>

<script>
export default {
  props: {
    number: Number,
    name: String,
    locale: Object
  },
  data() {
    return {
      share: require("../resources/img/share/share.svg"),
      twitter: require("../resources/img/share/twitter.svg"),
      whatsapp: require("../resources/img/share/whatsapp.svg"),
    }
  },
  methods: {
    sizeWatch() {
      return window.innerWidth > window.innerHeight
    },
    shareTo(social) {
      let URL = ''

      if (social === 'twitter') {
        URL = `https://twitter.com/intent/tweet?text=` + this.locale.misc.sharing.text + ` https://periodum.com/?=${this.number}_${this.name}`
        window.open(URL, '_blank');
      }
      if (social === 'whatsapp') {
        URL = `whatsapp://send?text=` + this.locale.misc.sharing.text + ` https://periodum.com/?=${this.number}_${this.name}`
        window.open(URL, '_blank');
      }
      if (social === 'native') {
        this.shareNative()
      }
    },
    shareNative() {
      const elementName = this.name
      const elementNumber = this.number
      const deviceShare = function() {
        navigator.share({
          title: elementName,
          text: `Periodum'da ${elementNumber}. elementi inceledim.`,
          url: `https://periodum.com/?=${elementNumber}_${elementName}`
        })
        .catch(console.error);
      }

      if (navigator.share) {
        deviceShare()
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    height: 1.2rem;
    margin: 0 .5rem;

    &:hover {
      // filter: drop-shadow(0 0 5px black);
      filter: brightness(9000%);
      cursor: pointer;
    }
  }
</style>