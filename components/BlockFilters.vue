<template>
  <div>
    <div class="filter-sub-title" style="margin-top: 23px">Bloğa Göre</div>
    <div class="group-container" style="margin-top: 6px">
      <img v-for="block in Object.keys(blocks)" :key="`filter-${block}`" :class="`${block}-block`" :src="blocks[block][block === selectedBlock ? 1 : 0]" @click="selectBlock(block)" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'BlockFilters',
  data() {
    return {
      blocks: {
        s: [require('~/assets/icons/s-block.svg'), require('~/assets/icons/s-block-active.svg')],
        d: [require('~/assets/icons/d-block.svg'), require('~/assets/icons/d-block-active.svg')],
        p: [require('~/assets/icons/p-block.svg'), require('~/assets/icons/p-block-active.svg')],
        f: [require('~/assets/icons/f-block.svg'), require('~/assets/icons/f-block-active.svg')],
      },
    }
  },

  computed: {
    ...mapGetters(['selectedBlock']),
  },

  methods: {
    selectBlock(block) {
      this.$store.commit('SET_SELECTED_BLOCK', block)
    },
  },
}
</script>

<style lang="scss">
.group-container {
  position: relative;
  width: 7.03vw;
  height: 4.32vw;
  .s-block {
    height: 3.15vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .d-block {
    height: 1.61vw;
    left: 1.47vw;
    top: 1.54vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .p-block {
    height: 2.49vw;
    left: 4.61vw;
    top: 0.66vw;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
  .f-block {
    height: 0.88vw;
    bottom: 0.15vw;
    right: 0;
    object-fit: contain;
    position: absolute;
    cursor: pointer;
  }
}
</style>
