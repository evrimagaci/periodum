<template>
  <div>
    <div class="filter-sub-title" style="margin-top: 20px">Kategoriye Göre</div>
    <div v-for="group in Object.keys(categories)" :key="`category-group-${group}`">
      <div class="filter-sub-title-smaller">{{ categories[group].text }}</div>
      <div
        v-for="filter in categories[group].filters"
        :key="`category-group-${group}-type${filter.type}`"
        class="category-type-filter-wrapper"
        :class="filter.type"
        @click="selectCategory(filter.type)"
      >
        <div class="round" />
        <div class="category-type-filter" :class="selectedCategory === filter.type ? 'active' : null">{{ filter.text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CategoryFilters',
  data() {
    return {
      categories: {
        metals: {
          text: 'Metaller',
          filters: [
            {
              type: 'alkalineMetal',
              text: 'Alkali Metaller',
            },
            {
              type: 'alkalineEarthMetal',
              text: 'Toprak Alkali Metaller',
            },
            {
              type: 'transitionMetal',
              text: 'Geçiş Metali',
            },
            {
              type: 'metal',
              text: 'Geçiş Sonrası Metali',
            },
            {
              type: 'lanthanide',
              text: 'Lantanitler',
            },
            {
              type: 'actinide',
              text: 'Aktinitler',
            },
          ],
        },
        halfMetals: {
          text: 'Metalsiler',
          filters: [
            {
              type: 'halfMetal',
              text: 'Metalsi',
            },
          ],
        },
        nonmetals: {
          text: 'Ametaller',
          filters: [
            {
              type: 'nobleGas',
              text: 'Soygazlar',
            },
            {
              type: 'nonmetallic',
              text: 'Reaktif Ametal',
            },
          ],
        },
        other: {
          text: 'Diğer',
          filters: [
            {
              type: 'other',
              text: 'Bilinmiyor',
            },
          ],
        },
      },
    }
  },

  computed: {
    ...mapGetters(['selectedCategory']),
  },

  methods: {
    selectCategory(category) {
      this.$store.commit('SET_SELECTED_CATEGORY', category)
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';
.category-type-filter-wrapper {
  display: flex;
  margin-bottom: 10px;
  cursor: pointer;
  .round {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: auto 0;
  }
  .category-type-filter {
    margin-left: 5px;
    font-size: 12px;
    line-height: 10px;
    font-weight: normal;
    color: $gray;
  }
}
</style>
