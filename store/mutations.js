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
    state.unit = type
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
  SET_SELECTED_ELEMENT(state, element) {
    state.selectedElement = element
    state.selectedBlock = null
    state.selectedCategory = null
    state.searchResults = []
    state.searchText = ''
  },
  SET_SELECTED_CATEGORY(state, category) {
    state.selectedCategory = category === state.selectedCategory ? null : category
    state.selectedBlock = null
    state.selectedElement = null
    state.searchResults = []
    state.searchText = ''
  },
  SET_SELECTED_BLOCK(state, block) {
    state.selectedBlock = block === state.selectedBlock ? null : block
    state.selectedCategory = null
    state.selectedElement = null
    state.searchResults = []
    state.searchText = ''
  },
  SET_SEARCH_TEXT(state, searchText) {
    state.selectedBlock = null
    state.selectedCategory = null
    state.selectedElement = null
    state.searchText = searchText
  },
  SET_SEARCH_ELEMENTS(state, elements) {
    state.reducedElements = elements
  },
  SET_SEARCH_RESULTS(state, searchResults) {
    state.searchResults = searchResults
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
