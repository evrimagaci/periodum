import { createLocalVue } from '@vue/test-utils'
import { render } from '@testing-library/vue'
import Vuex from 'vuex'
// eslint-disable-next-line
import { __createMocks as createStoreMocks } from '../__mocks__/store'
import RightSideBar from '@/components/RightSideBar.vue'

jest.mock('../../store')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Compound Suggestion', () => {
  let storeMocks

  beforeEach(() => {
    storeMocks = createStoreMocks()
    render(RightSideBar, {
      store: storeMocks.store,
      localVue,
    })
  })

  it('parses compound formula', () => {
    // TODO: Write the body
  })

  it('loads compound formula after clicking on a sugestion', () => {
    // TODO: Write the body
  })
})
