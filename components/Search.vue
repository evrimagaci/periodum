<template>
  <label v-if="$route.path === '/'">
    <input v-model="input" class="search-box" placeholder="Element adı, atom numarası veya bir özellikle arama" @input="onInput" />
  </label>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      input: '',
    }
  },

  computed: {
    ...mapGetters(['searchText']),
  },

  watch: {
    searchText: {
      handler() {
        if (this.input !== this.searchText) {
          this.input = this.searchText
        }
      },
      immediate: true,
    },
  },

  methods: {
    onInput() {
      clearTimeout(this.timer)
      this.search()
    },

    async search() {
      this.$store.commit('SET_SEARCH_TEXT', this.input)
      const results = await this.$search(this.input, this.$store.state.reducedElements, {
        keys: ['symbol', 'name_tr', 'name_en', 'number'],
        threshold: 0.3,
      })
      this.$store.commit('SET_SEARCH_RESULTS', results)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';
.search-box {
  width: 350px;
  height: 14px;
  padding: 0.9vw 0 0.9vw 1vw;
  border-radius: 16px;
  background-color: #0b0e13;
  display: block;
  font-size: 12px;
  font-weight: 800;
  color: $white;
  border: none;
  background-image: url('~@/assets/icons/search.svg');
  background-repeat: no-repeat;
  background-position: 320px;
  &:focus {
    outline: none;
  }
}
::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-family: Nunito, sans-serif, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial;
  font-size: 1em;
  color: $gray;
}
::-moz-placeholder {
  /* Firefox 19+ */
  font-size: 1em;
  color: $gray;
}
::-ms-input-placeholder {
  /* IE 10+ */
  font-size: 1em;
  color: $gray;
}
</style>
