<template>
  <div class="fade container">
    <div class="content">
      <h3 class="text-primary">Projeye Destek Ol</h3>
      <hr class="divider">
      <p>-</p>
    </div>
  </div>
</template>

<script>
  import { version } from "../../package.json";
  export default {
    computed: {
      versionNumber() {
        return version
      } 
    },
    methods: {
      purgeSettings(sector) {
        if (sector === 'pagetour') {
          localStorage.setItem('visited_before', 'false')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .miniNav a {
    margin-right: 1rem;
  }
  .container {
    display: grid;
    color: whitesmoke;
    align-items: center;
    width: 60vw;

    @media screen and (max-width: 650px) {
      width: 25rem;
    }
  }
  .content {
    margin-bottom: .5rem;

    background-color: #232936;
    border-radius: .5rem;
    padding: 3rem;
  }
  .divider {
    margin: .5vw 0;
  }
  li {
    margin-bottom: .3vw;
  }
  a#mail::after {
    content: "✉";
    color:#e5bb09;
    margin: 0 3px 0 5px;
  }
  #mail {
    margin-top: 2vw;
  }
</style>