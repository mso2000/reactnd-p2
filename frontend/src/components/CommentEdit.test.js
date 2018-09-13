import React from 'react'
import { mount } from 'enzyme'
import CommentEdit from './CommentEdit'
import { Header, FormField } from 'semantic-ui-react'

import {
  MODAL_COMMENT_LABEL_NEW,
  MODAL_COMMENT_LABEL_EDIT
} from '../utils/constants.js'


describe('[Component] CommentEdit', () => {
  let container, wrapper

  const setup = {
    comment: { parentId: '123' },
    modalOpen: true,
    onChangeComment: jest.fn(),
    onCloseModal: jest.fn()
  }

  describe('render modal to create new comment', () => {
    beforeEach(() => {
      wrapper = mount(<CommentEdit isNewComment={true} {...setup} />)
      setup.onChangeComment.mockClear()
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_COMMENT_LABEL_NEW)
    })

    it('call onChangeComment should not happen on form submit and empty', () => {
      container = wrapper.find('form')
      container.simulate('submit')
      expect(setup.onChangeComment).not.toHaveBeenCalled()
    })

    it('call onChangeComment should not happen on form submit and no author', () => {
      container = wrapper.find('FormField')
      container.at(1).find('textarea').instance().value = 'New Body'
      wrapper.find('form').simulate('submit')
      expect(setup.onChangeComment).not.toHaveBeenCalled()
    })

    it('call onChangeComment should not happen on form submit and no body', () => {
      container = wrapper.find('FormField')
      container.at(0).find('input').instance().value = 'New Author'
      wrapper.find('form').simulate('submit')
      expect(setup.onChangeComment).not.toHaveBeenCalled()
    })

    it('call onChangeComment should happen on form submit and filled up', () => {
      container = wrapper.find('FormField')
      container.at(0).find('input').instance().value = 'New Author'
      container.at(1).find('textarea').instance().value = 'New Body'
      wrapper.find('form').simulate('submit')
      expect(setup.onChangeComment).toHaveBeenCalled()
    })

    it('should set proper state on handleFormInputChange call', () => {
      wrapper.instance().handleFormInputChange(null, {name: 'author', value: 'Some Author'})
      expect(wrapper.state().author).toEqual('Some Author')
    })
  })

  describe('render modal to edit existing comment', () => {
    beforeEach(() => {
      setup.comment.author = 'Test Author'
      setup.comment.body = 'Test Body'
      setup.onChangeComment.mockClear()
      wrapper = mount(<CommentEdit isNewComment={false} {...setup} />)
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_COMMENT_LABEL_EDIT)
    })

    it('call onChangeComment should happen on form submit and filled up', () => {
      container = wrapper.find('form')
      container.simulate('submit')
      expect(setup.onChangeComment).toHaveBeenCalled()
    })

    it('call onChangeComment should not happen on form submit and empty', () => {
      container = wrapper.find('FormField')
      container.at(0).find('input').instance().value = ''
      container.at(1).find('textarea').instance().value = ''
      wrapper.find('form').simulate('submit')
      expect(setup.onChangeComment).not.toHaveBeenCalled()
    })
  })
})
