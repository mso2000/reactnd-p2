import React from 'react'
import { shallow } from 'enzyme'
import { CategoryMenu } from './CategoryMenu'
import { categories } from '../utils/mockStore.js'

describe('[Component] CategoryMenu', () => {
  let wrapper

  const setup = {
    categories: categories,
    fetchData: jest.fn()
  }

  const categoriesWithAll = [ {path: 'all'}, ...categories ]

  describe('render categories menu', () => {
    it(`should have categories items`, () => {
      wrapper = shallow(<CategoryMenu match={{url: '/'}} {...setup} />)
      categoriesWithAll.map(c => {
        expect(wrapper.exists(`[name="${c.path}"]`)).toEqual(true)
      })
    })

    it('should match url and activate proper item only', () => {
      categoriesWithAll.map(c => {
        wrapper = shallow(<CategoryMenu match={{url: `/${c.path === 'all' ? '' : c.path}`}} {...setup} />)
        expect(wrapper.find(`[name="${c.path}"]`)).toHaveLength(1)
        expect(wrapper.find(`[name="${c.path}"]`).props().active).toEqual(true)
      })
    })

    it('should unmatch invalid url and activate nothing', () => {
      wrapper = shallow(<CategoryMenu match={{url: '/invalid'}} {...setup} />)
      expect(wrapper.exists(`[active=true]`)).toEqual(false)
    })

    it('should call fetchData on each item click', () => {
      wrapper = shallow(<CategoryMenu match={{url: '/'}} {...setup} />)
      categoriesWithAll.map(c => {
        setup.fetchData.mockClear()
        wrapper.find(`[name="${c.path}"]`).simulate('click')
        expect(setup.fetchData).toHaveBeenCalled()
      })
    })
  })
})
