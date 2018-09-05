import React from 'react'
import { mount } from 'enzyme'
import CommentEdit from './CommentEdit'
import { Header } from 'semantic-ui-react'

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
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_COMMENT_LABEL_NEW)
    })
  })

  describe('render modal to edit existing comment', () => {
    beforeEach(() => {
      wrapper = mount(<CommentEdit isNewComment={false} {...setup} />)
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_COMMENT_LABEL_EDIT)
    })
  })

})
