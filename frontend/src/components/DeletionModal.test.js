import React from 'react'
import { shallow } from 'enzyme'
import DeletionModal from './DeletionModal'
import { Button } from 'semantic-ui-react'


describe('[Component] DeletionModal', () => {
  let container

  const setup = {
    onCancel: jest.fn(),
    onConfirm: jest.fn(),
    modalBody: 'teste',
    modalOpen: true
  }

  const wrapper = shallow(<DeletionModal {...setup} />)

  describe('render modal body', () => {
    beforeEach(() => {
      container = wrapper.find('h4')
    })

    it('should have <h4>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <h4> with proper text', () => {
      expect(container.text()).toEqual('teste')
    })
  })

  describe('render modal buttons', () => {
    beforeEach(() => {
      container = wrapper.find('Button')
      setup.onCancel.mockClear()
      setup.onConfirm.mockClear()
    })

    it('should have 2 Buttons', () => {
      expect(container).toHaveLength(2)
    })

    it('call onCancel on red button click', () => {
      container.at(0).simulate('click')
      expect(setup.onCancel).toHaveBeenCalled()
    })

    it('call onConfirm on green button click', () => {
      container.at(1).simulate('click')
      expect(setup.onConfirm).toHaveBeenCalled()
    })
  })
})
