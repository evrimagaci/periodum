<template>
  <div class="sample-container">
    <div class="title">Anahtar</div>
    <div class="sample yellow-active">
      <div class="number">Atom No</div>
      <div class="symbol">Sembol</div>
      <div class="name">İsim</div>
      <div class="atomic-mass">Atom Ağırlığı</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sample',
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/partials/variables';

.sample-container {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  grid-area: 9 / 1 / span 2 / span 3;
  position: relative;
  flex-direction: column;
  color: #222938;
  .title {
    color: #878c97;
    font-size: 16px;
    font-weight: 600;
  }
  .sample {
    width: $elementBoxSize * 1.5;
    height: $elementBoxSize * 1.5;
    border-radius: 12.5%;
    padding: 6px;
    .number {
      opacity: 0.6;
      font-size: 15px;
    }
    .symbol {
      font-size: 20px;
      font-weight: 800;
      color: #222938;
    }
    .name {
      font-size: 15px;
      font-weight: 600;
      color: #222938;
    }
    .atomic-mass {
      opacity: 0.6;
      font-size: 15px;
    }
  }
}
</style>
