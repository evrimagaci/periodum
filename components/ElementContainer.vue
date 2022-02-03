<template>
  <div ref="element" class="periodic-element-container" :style="{ ...gridStyles }">
    <div v-if="canShowRowNumber" class="row-number">{{ element.ypos }}</div>
    <div v-if="canShowColumnNumber" class="column-number">{{ element.xpos }}</div>
    <Element :element="element" />
  </div>
</template>

<script>
export default {
  name: 'ElementContainer',
  props: {
    element: {
      type: Object,
      default: () => ({}),
    },
  },

  computed: {
    gridStyles() {
      return {
        gridArea: `${this.element.ypos} / ${this.element.xpos} / span 1 / span 1`,
      }
    },

    canShowRowNumber() {
      return this.element.xpos === 1
    },

    canShowColumnNumber() {
      return [1, 2, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].includes(this.element.number)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.periodic-element-container {
  height: $elementBoxSize;
  width: $elementBoxSize;
  position: relative;
  .row-number {
    left: -(calc($elementBoxSize/3));
    top: 50%;
    transform: translateY(-50%);
  }
  .column-number {
    top: -(calc($elementBoxSize/3));
    left: 50%;
    transform: translateX(-50%);
  }
  .row-number,
  .column-number {
    position: absolute;
    font-size: 16px;
    line-height: normal;
    font-weight: 600;
    color: #59637a;
  }
  &.draggable-mirror {
    z-index: 100;
    .row-number,
    .column-number {
      display: none;
    }
  }
}
</style>
