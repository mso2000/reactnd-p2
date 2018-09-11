import React from 'react'
import { shallow } from 'enzyme'
import { CategoryMenu } from './CategoryMenu'
import { MenuItem } from 'semantic-ui-react'
import { categories } from '../utils/mockStore.js'

describe('[Component] CategoryMenu', () => {
  let wrapper, container

  const setup = {
    categories: categories,
    fetchData: jest.fn()
  }

  describe('render categories menu', () => {
    beforeEach(() => {
      wrapper = shallow(<CategoryMenu match={{url: '/'}} {...setup} />)
      container = wrapper.find('MenuItem')
    })

    it(`should have "all" item`, () => {
      expect(container.at(0).props().name).toEqual('all')
    })

    it(`should have categories items`, () => {
      categories.map(c => {
        expect(wrapper.find(`[name="${c.path}"]`)).toHaveLength(1)
      })
    })

    it('should set "newPostModalOpen" state to true on button click', () => {
      console.log(wrapper.find(`[name="react"]`).debug())
    })

    // TODO: Testar match e testar onClick
  })
})
