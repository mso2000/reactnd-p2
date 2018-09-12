import React from 'react'
import { shallow } from 'enzyme'
import { Post } from './Post'
import { Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { posts } from '../utils/mockStore.js'

describe('[Component] Post', () => {
  let wrapper, container, match, setup
  const sortOder = ['voteScore', 'timestamp']

  const defaultSetup = {
    fetchData: jest.fn(),
    history: { push: jest.fn() },
    removePost: jest.fn(),
    selectedPost: posts[0],
    updatePost: jest.fn(),
    votePost: jest.fn()
  }
// match pode ser vazio ou ter uma categoria
// match: {params: { category: posts[0].category }},

  describe('render post header', () => {
    beforeEach(() => {

    })

    it('should have title and no link in post details', () => {
      setup = {
        match: {params: { category: '' }},
        showDetails: true,
      }

      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('h1')
      expect(container.exists('Link')).toEqual(false)
      expect(container.text()).toEqual(defaultSetup.selectedPost.title)
    })

    it('should have title and link to details in post list', () => {
      setup = {
        match: {params: { category: '' }},
        showDetails: false,
      }

      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('h1')
      expect(container.exists('Link')).toEqual(true)

      container = container.find('Link')
      expect(container.props().children).toEqual(defaultSetup.selectedPost.title)

      const expectedLink = `/${defaultSetup.selectedPost.category}/${defaultSetup.selectedPost.id}`
      expect(container.props().to).toEqual(expectedLink)
    })
  })
})
