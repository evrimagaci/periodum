<template>
  <div class="periodic-table">
    <Slider />
    <ElementContainer v-for="element in elements" :key="element.number" :element="element" />
    <Sample />
    <Filters />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PeriodicTable',

  data() {
    return {
      draggable: {},
    }
  },

  computed: {
    ...mapGetters(['elements']),
  },

  async mounted() {
    const { Draggable, Plugins } = await import('@shopify/draggable')
    this.draggable = new Draggable(document.querySelectorAll('.periodic-table'), {
      draggable: '.periodic-element-container',
      mirror: {
        appendTo: '.periodic-table',
        constrainDimensions: true,
      },
      plugins: [Plugins.ResizeMirror],
    })
  },
}
</script>

<style lang="scss" scoped>
.periodic-table {
  display: grid;
  width: 100%;
  grid-template-areas:
    'col-1 . . . . . . . . . . . . . . . . col-18 col-19'
    'col-1 col-2 . . . . . . . . . . col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 . . . . . . . . . . col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 col-2 col-3 col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    'col-1 . . . . . . . . . . . . . . . . . .'
    '. . . col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19'
    '. . . col-4 col-5 col-6 col-7 col-8 col-9 col-10 col-11 col-12 col-13 col-14 col-15 col-16 col-17 col-18 col-19';
  column-gap: 10px;
  row-gap: 10px;
}
</style>
