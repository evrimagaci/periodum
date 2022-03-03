export default {
  elements(state) {
    return state.elements.map((element) => ({
      ...element,
      ...calculatePropertiesByCategory(element.category),
    }))
  },
  temperature: (state) => state.temperature,
  isTemperatureTriggered: (state) => state.isTemperatureTriggered,
  unit: (state) => state.unit,
  compounds: (state) => state.compounds,
  isotopes: (state) => state.isotopes,
  probableElements: (state) => state.probableElements,
  isIsotopeFetched: (state) => state.isIsotopeFetched,
  isCompoundFetched: (state) => state.isCompoundFetched,
  isMobile: (state) => state.isMobile,
  isOriented: (state) => state.isOriented,
  searchText: (state) => state.searchText,
  searchResults: (state) => state.searchResults.map((element) => parseInt(element.number)),
  selectedElement: (state) => state.selectedElement,
  selectedCategory: (state) => state.selectedCategory,
  selectedBlock: (state) => state.selectedBlock,
  selectedContentId: (state) => state.selectedContentId,
}

function calculatePropertiesByCategory(category) {
  if (category === 'reaktif ametal') {
    return {
      type: 'nonmetallic',
      color: '#ff80d4',
      searchClass: 'pink-active',
      hoverClass: 'hover-pink',
    }
  } else if (category === 'toprak alkali metal') {
    return {
      type: 'alkalineEarthMetal',
      color: '#80ff8e',
      searchClass: 'green-active',
      hoverClass: 'hover-green',
    }
  } else if (category === 'alkali metal') {
    return {
      type: 'alkalineMetal',
      color: '#ffaf80',
      searchClass: 'orange-active',
      hoverClass: 'hover-orange',
    }
  } else if (category === 'geçiş metali') {
    return {
      type: 'transitionMetal',
      color: '#ffef80',
      searchClass: 'yellow-active',
      hoverClass: 'hover-yellow',
    }
  } else if (category === 'metalsi') {
    return {
      type: 'halfMetal',
      color: '#8095ff',
      searchClass: 'blue-active',
      hoverClass: 'hover-blue',
    }
  } else if (category === 'geçiş sonrası metali') {
    return {
      type: 'metal',
      color: '#80d5ff',
      searchClass: 'darkteal-active',
      hoverClass: 'hover-darkteal',
    }
  } else if (category === 'soy gaz') {
    return {
      type: 'nobleGas',
      color: '#aa80ff',
      searchClass: 'purple-active',
      hoverClass: 'hover-purple',
    }
  } else if (category === 'aktinit') {
    return {
      type: 'actinide',
      color: '#80fffc',
      searchClass: 'teal-active',
      hoverClass: 'hover-teal',
    }
  } else if (category === 'lantanit') {
    return {
      type: 'lanthanide',
      color: '#c3ff80',
      searchClass: 'coldgreen-active',
      hoverClass: 'hover-coldgreen',
    }
  } else if (category === 'bilinmiyor') {
    return {
      type: 'other',
      color: '#d4dadc',
      searchClass: 'gray-active',
      hoverClass: 'hover-gray',
    }
  }
}
