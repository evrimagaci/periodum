<template>
  <div class="filter-container">
    <div class="filter-title">Filtre</div>
    <BlockFilters />
    <CategoryFilters />
  </div>
</template>

<script>
export default {
  name: 'Filters',
}
</script>

<style lang="scss">
@import '~@/assets/css/partials/variables';
.filter-container {
  grid-area: 1 / 19 / span 10 / span 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding-left: 15px;
}
.filter-title {
  font-size: 16px;
  font-weight: 800;
  color: $white;
}

.filter-sub-title {
  font-size: 14px;
  font-weight: 600;
  color: #cdcfd4;
}

.filter-sub-title-smaller {
  font-size: 12px;
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  color: #bec1c6;
}
</style>
