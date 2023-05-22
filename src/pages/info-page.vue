<template>
  <div class="fade container flex-column">
    <div class="content">
      <h3 class="text-primary">{{ loc.pages.info.what_is.title }}</h3>      
      <div v-for="text in loc.pages.info.what_is.content" :key="text[0]">
        <p>{{ text }}</p>
      </div>
    </div>

    <div class="content">
      <h3 class="text-primary">{{ loc.pages.info.history.title }}</h3>     
      <div v-for="text in loc.pages.info.history.content" :key="text[0]">
        <p>{{ text }}</p>
      </div>
    </div>

    <div class="content" id="history">
      <h3>{{ loc.misc.resources }}</h3>
      <p v-for="resource in loc.pages.info.resources" :key="resource">
        <a :href="resource.link" target="_blank" rel="noopener noreferrer">{{ resource.title }}</a>
      </p>
      <div class="flex-between">
        <div></div>
        <a id="info_suggestReportLink" href="mailto:info@evrimagaci.org">{{ loc.pages.about.updates.report }}</a>
        <div></div>
      </div>
    </div>

    <div class="flex-center">
      <a class="text-white" id="about_evrimagaciLink" href="https://evrimagaci.org">2023 © Evrim Ağacı, Tree of Evolution LLC'nin tescilli markasıdır.</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      loc: Object
    }
  }
</script>

<style lang="scss" scoped>
details > summary {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
.miniNav a {
    margin-right: 1rem;
  }
  .container {
    color: whitesmoke;
    align-items: center;
    width: 70vw;

    @media screen and (max-width: 720px) {
      width: 90vw;
    }
  }
  .content {
    margin-bottom: .5rem;

    list-style:disc;
    background-color: #232936;
    border-radius: .3rem;
    padding: 2rem;
    h3 {
      margin-bottom: .5rem;
    }
  }
  #history {
    h3 {
      color: #e5bb09;
    }
    .versionNumber {
      padding: .2rem .5rem;
      background-color: #e5bb09;
      width:max-content;
      border-radius: .3rem;
      font-size: smaller;

      color: black;
    }
  }
  .divider {
    margin: .2rem 0;
  }
  li {
    margin-bottom: .3vw;
  }
  a#info_suggestReportLink::after {
    content: "✉";
    color:#e5bb09;
    margin: 0 3px 0 5px;
  }
  #info_suggestReportLink {
    margin-top: 2vw;
  }
</style>