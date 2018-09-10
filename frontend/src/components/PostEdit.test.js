import React from 'react'
import { mount } from 'enzyme'
import { PostEdit } from './PostEdit'
import { Header, FormField } from 'semantic-ui-react'
import { categories } from '../utils/mockStore.js'

import {
  MODAL_POST_LABEL_NEW,
  MODAL_POST_LABEL_EDIT
} from '../utils/constants.js'


describe('[Component] PostEdit', () => {
  let container, wrapper

  const setup = {
    modalOpen: true,
    post: {},
    categories: categories,
    history: { push: jest.fn() },
    onCloseModal: jest.fn(),
    onChangePost: jest.fn(),
  }

  describe('render modal to create new post', () => {
    beforeEach(() => {
      wrapper = mount(<PostEdit isNewPost={true} {...setup} />)
      setup.onChangePost.mockClear()
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_POST_LABEL_NEW)
    })

    it('call onChangePost should not happen on form submit and empty', () => {
      container = wrapper.find('form')
      container.simulate('submit')
      expect(setup.onChangePost).not.toHaveBeenCalled()
    })

    it('call onChangePost should happen on form submit and filled up', () => {
      container = wrapper.find('FormField')
      wrapper.setState({category: 'react'})
      container.at(0).find('input').instance().value = 'New Title'
      container.at(1).find('input').instance().value = 'New Author'
      container.at(2).find('textarea').instance().value = 'New Body'
      wrapper.find('form').simulate('submit')
      expect(setup.onChangePost).toHaveBeenCalled()
    })
  })

  describe('render modal to edit new post', () => {
    beforeEach(() => {
      wrapper = mount(<PostEdit isNewPost={false} {...setup} />)
      setup.post.title = 'Test Title'
      setup.post.author = 'Test Author'
      setup.post.body = 'Test Body'
      setup.post.category = 'react'
      setup.onChangePost.mockClear()
      container = wrapper.find('Header')
    })

    it('should have <Header>', () => {
      expect(container).toHaveLength(1)
    })

    it('should have <Header> with proper label', () => {
      expect(container.prop('content')).toEqual(MODAL_POST_LABEL_EDIT)
    })

    it('call onChangePost should happen on form submit and filled up', () => {
      container = wrapper.find('form')
      container.simulate('submit')
      expect(setup.onChangePost).toHaveBeenCalled()
    })

    it('call onChangePost should not happen on form submit and no title', () => {
      container = wrapper.find('FormField')
      container.at(0).find('input').instance().value = ''
      wrapper.find('form').simulate('submit')
      expect(setup.onChangePost).not.toHaveBeenCalled()
    })

    it('call onChangePost should not happen on form submit and no author', () => {
      container = wrapper.find('FormField')
      container.at(1).find('input').instance().value = ''
      wrapper.find('form').simulate('submit')
      expect(setup.onChangePost).not.toHaveBeenCalled()
    })

    it('call onChangePost should not happen on form submit and no body', () => {
      container = wrapper.find('FormField')
      container.at(2).find('textarea').instance().value = ''
      wrapper.find('form').simulate('submit')
      expect(setup.onChangePost).not.toHaveBeenCalled()
    })
  })
})
