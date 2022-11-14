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
    display: flex;
    align-items: center;
    
    width: 100%;
    padding: .2rem 0;
    font-size: v-bind(fontSize);
    color: #e5bb09;
    background-color: #1A1F2A;
    margin-bottom: .3rem;

    border-radius: .3rem;

    p {
      margin-left: 2rem;
    }
    &::before {
      font-family: 'Emoji';
      content: "ℹ";
      position: absolute;
      left: .5rem;
    }
  }
</style>