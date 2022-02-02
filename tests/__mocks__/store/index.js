import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const getters = {
  elements: jest.fn().mockReturnValue([]),
  temperature: jest.fn().mockReturnValue(100),
  compounds: jest.fn().mockReturnValue([]),
  isotopes: jest.fn().mockReturnValue([]),
  probableElements: jest.fn().mockReturnValue([]),
  isIsotopeFetched: jest.fn().mockReturnValue(true),
  isCompoundFetched: jest.fn().mockReturnValue(true),
  isMobile: jest.fn().mockReturnValue(false),
  isOriented: jest.fn().mockReturnValue(false),
}

export const mutations = {
  UPDATE_TEMPERATURE: jest.fn(),
  UPDATE_VIEW_TEMPERATURE: jest.fn(),
  DEACTIVATE_TEMPERATURE: jest.fn(),
  SET_TEMPERATURE_TYPE: jest.fn(),
  SET_ELEMENTS: jest.fn(),
  SET_COMPOUNDS: jest.fn(),
  SET_ISOTOPES: jest.fn(),
  SET_PROBABLE_ELEMENTS: jest.fn(),
  SET_COMPOUNDS_FETCHED: jest.fn(),
  SET_ISOTOPES_FETCHED: jest.fn(),
  SHOW_INFO_MODAL: jest.fn(),
  SET_SELECTED_CONTENT_ID: jest.fn(),
  SET_SEARCH_TEXT: jest.fn(),
  SET_IS_MOBILE: jest.fn(),
  SET_IS_ORIENTED: jest.fn(),
}

export const actions = {}

export const state = {
  app: {},
  elements: [],
  compounds: [],
  isotopes: [],
  probableElements: [],
  temperature: 0,
  selectedTemperatureType: 'c',
  isTemperatureTriggered: false,
  isIsotopeFetched: false,
  isCompoundFetched: false,
  showInfoModal: false,
  selectedContentId: null,
  searchText: null,
  isMobile: false,
  isOriented: false,
}

// eslint-disable-next-line no-underscore-dangle
export function __createMocks(custom = { getters: {}, mutations: {}, actions: {}, state: {} }) {
  const mockGetters = Object.assign({}, getters, custom.getters)
  const mockMutations = Object.assign({}, mutations, custom.mutations)
  const mockActions = Object.assign({}, actions, custom.actions)
  const mockState = Object.assign({}, state, custom.state)

  return {
    getters: mockGetters,
    mutations: mockMutations,
    actions: mockActions,
    state: mockState,
    store: new Vuex.Store({
      getters: mockGetters,
      mutations: mockMutations,
      actions: mockActions,
      state: mockState,
    }),
  }
}

export const store = __createMocks().store
