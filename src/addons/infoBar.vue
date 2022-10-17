<template>
  <div v-if="displayCondition" class="infobar">
    <p>{{ infoText }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      vis: {
        default: "both",
        type: String
      },
      infoText: {
        default: "Bilgilendirici yazı",
        type: String
      },
      fontSize: {
        default: 'small',
        type: String
      }
    },
    computed: {
      isTable() {
        return window.innerWidth > window.innerHeight
      },
      displayCondition() {
        let state = false
        if (this.vis === 'both') {
          state = true
        }
        if (this.vis === 'table') {
          state = this.isTable ? true : false
        }
        if (this.vis === 'list') {
          state = this.isTable ? false : true
        }
        return state
      }
    }
  }
</script>

<style lang="scss" scoped>
  .infobar {
    position: relative;
    width: 100%;
    padding: .1vw 0;
    font-size: v-bind(fontSize);
    color: #e5bb09;
    background-color: #1A1F2A;
    margin-bottom: 2px;

    border-radius: .3rem .3rem 0 0;

    p {
      margin-left: 25px;
    }
    &::before {
      font-family: 'Emoji';
      content: "ℹ";
      position: absolute;
      left: 5px;
    }
  }
</style>