import React from 'react'
import { shallow } from 'enzyme'
import { PostList } from './PostList'
import { posts } from '../utils/mockStore.js'
import { POST_LIST_ERROR } from '../utils/constants.js'

describe('[Component] PostList', () => {
  let wrapper, container, setup
  const sortOrder = ['voteScore', 'timestamp']

  describe('render posts list', () => {
    it('Should display error when no posts', () => {
      setup = {
        match: {url: '/'},
        posts: [],
        sortOrder: sortOrder[0]
      }

      wrapper = shallow(<PostList {...setup} />)
      container = wrapper.find('Segment')
      expect(container).toHaveLength(1)
      expect(container.childAt(0).text()).toEqual(POST_LIST_ERROR)
    })

    it('Should list all posts from store', () => {
      setup = {
        match: {url: '/'},
        posts,
        sortOrder: sortOrder[0]
      }

      wrapper = shallow(<PostList {...setup} />)
      container = wrapper.find('Segment')
      expect(container).toHaveLength(setup.posts.length)
    })

    it('Should list all posts from store ordered by vote', () => {
      setup = {
        match: {url: '/'},
        posts,
        sortOrder: sortOrder[0]
      }

      wrapper = shallow(<PostList {...setup} />)
      container = wrapper.find('Segment')

      const sortedPosts = []
      container.forEach(node => {
        sortedPosts.push(node.childAt(0).props().selectedPost)
      })

      expect(sortedPosts).toEqual(posts)
    })

    it('Should list all posts from store ordered by date', () => {
      setup = {
        match: {url: '/'},
        posts,
        sortOrder: sortOrder[1]
      }

      wrapper = shallow(<PostList {...setup} />)
      container = wrapper.find('Segment')

      const sortedPosts = []
      container.forEach(node => {
        sortedPosts.push(node.childAt(0).props().selectedPost)
      })

      expect(sortedPosts).toEqual([posts[1], posts[2], posts[0]])
    })

    it('Should list posts from selected category', () => {
      setup = {
        match: {url: '/redux'},
        posts,
        sortOrder: sortOrder[0]
      }

      wrapper = shallow(<PostList {...setup} />)
      container = wrapper.find('Segment')
      expect(container).toHaveLength(1)
      expect(container.first().childAt(0).props().selectedPost)
        .toEqual(posts[1])
    })
  })
})
