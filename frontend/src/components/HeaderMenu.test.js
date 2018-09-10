import React from 'react'
import { shallow } from 'enzyme'
import { HeaderMenu } from './HeaderMenu'
import { Button } from 'semantic-ui-react'
import { HEADER_BUTTON_LABEL } from '../utils/constants.js'

describe('[Component] HeaderMenu', () => {
  let container

  const setup = {
    sortOrder: 'timestamp',
    addNewPost: jest.fn(),
    selectSortOrder: jest.fn()
  }

  const wrapper = shallow(<HeaderMenu {...setup} />)

  describe('render header menu', () => {
    beforeEach(() => {
      container = wrapper.find('Button')
    })

    it(`should have "${HEADER_BUTTON_LABEL}" Button`, () => {
      expect(container.props().content).toEqual(HEADER_BUTTON_LABEL)
    })

    it('should set "newPostModalOpen" state to true on button click', () => {
      container.simulate('click')
      expect(wrapper.state().newPostModalOpen).toBe(true)
    })

    it('should set "newPostModalOpen" state to false on closeNewPostModal call', () => {
      wrapper.setState({newPostModalOpen: true})
      wrapper.instance().closeNewPostModal()
      expect(wrapper.state().newPostModalOpen).toBe(false)
    })

    it('should call selectSortOrder with proper value on each menu click', () => {
      const sortOrder = ['timestamp', 'voteScore']
      sortOrder.map(order => {
        setup.selectSortOrder.mockClear()
        container = wrapper.find(`[name="${order}"]`)
        container.prop('onClick')(null, { name: order })
        expect(setup.selectSortOrder).toHaveBeenCalledWith(order)
      })
    })
  })
})
