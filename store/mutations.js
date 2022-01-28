export default {
  UPDATE_TEMPERATURE(state, temperature = 0) {
    state.temperature = temperature
    state.isTemperatureTriggered = true
  },
  UPDATE_VIEW_TEMPERATURE(state, temperature = 0) {
    state.temperature = temperature
    state.isTemperatureTriggered = true
  },
  DEACTIVATE_TEMPERATURE(state) {
    state.isTemperatureTriggered = false
  },
  SET_TEMPERATURE_TYPE(state, type) {
    state.selectedTemperatureType = type
  },
  SET_ELEMENTS(state, elements = []) {
    state.elements = elements
  },
  SET_COMPOUNDS(state, compounds = []) {
    state.compounds = compounds
  },
  SET_ISOTOPES(state, isotopes = []) {
    state.isotopes = isotopes
  },
  SET_PROBABLE_ELEMENTS(state, elements = []) {
    state.probableElements = elements
  },
  SET_COMPOUNDS_FETCHED(state, isFetched) {
    state.isCompoundFetched = isFetched
  },
  SET_ISOTOPES_FETCHED(state, isFetched) {
    state.isIsotopeFetched = isFetched
  },
  SHOW_INFO_MODAL(state, isVisible) {
    state.showInfoModal = isVisible
  },
  SET_SELECTED_CONTENT_ID(state, id) {
    state.selectedContentId = id
  },
  SET_SEARCH_TEXT(state, text) {
    state.searchText = text ? text.target.value : null
  },
  SET_IS_MOBILE(state, isMobile) {
    state.isMobile = isMobile
  },
  SET_IS_ORIENTED(state, isOriented) {
    state.isOriented = isOriented
  },
  SET_DRAG_START(state, isDragStart) {
    state.isDragStart = isDragStart
  },
}
