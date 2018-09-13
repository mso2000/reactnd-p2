import React from 'react'
import { shallow } from 'enzyme'
import { PostDetails } from './PostDetails'
import { posts, comments } from '../utils/mockStore.js'
import { POST_NOT_FOUND_ERROR, COMMENT_LIST_ERROR_BODY } from '../utils/constants.js'

describe('[Component] PostDetails', () => {
  let wrapper, container, setup
  const sortOder = ['voteScore', 'timestamp']

  const defaultSetup = {
    addNewComment: jest.fn(),
    comments,
    fetchPostComments: jest.fn(),
    posts,
    removeComment: jest.fn(),
    updateComment: jest.fn(),
    voteComment: jest.fn()
  }

  describe('handle errors', () => {
    beforeEach(() => {
      setup = {
        match: {params: {id: posts[2].id, category: posts[2].category}},
        sortOrder: sortOder[0]
      }
    })

    it('should display error on invalid post id matched', () => {
      setup.match.params.id = 'xpto'
      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      container = wrapper.find('Segment')
      expect(container.childAt(0).text()).toEqual(POST_NOT_FOUND_ERROR)
    })

    it('should display error on invalid category matched', () => {
      setup.match.params.category = 'xpto'
      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      expect(container.childAt(0).text()).toEqual(POST_NOT_FOUND_ERROR)
    })

    it('should have proper comment count when no comments', () => {
      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      container = wrapper.find('Header')
      expect(container.props().children[2]).toEqual(0)
    })

    it('should display message when no comments', () => {
      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      container = wrapper.find('Message')
      expect(container.childAt(1).text()).toEqual(COMMENT_LIST_ERROR_BODY)
    })
  })

  describe('render post details', () => {
    beforeEach(() => {
      setup = {
        comments,
        match: {params: {id: posts[0].id, category: posts[0].category}},
        sortOrder: sortOder[0]
      }

      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
    })

    it('should pass current post to Post component via props', () => {
      container = wrapper.find('Segment')
      expect(container.childAt(0).props().selectedPost).toEqual(posts[0])
    })

    it('should have proper comment count', () => {
      container = wrapper.find('Header')
      expect(container.props().children[2]).toEqual(posts[0].commentCount)
    })

    it('should display proper comment quantity', () => {
      container = wrapper.find('Comment')
      expect(container).toHaveLength(posts[0].commentCount)
    })

    it('teste', () => {
      container = wrapper.find('Comment')
      console.log(container.at(0).find('CommentAuthor').childAt(0).text())
      console.log(container.at(0).find('CommentMetadata').childAt(0).text())
      console.log(container.at(0).find('CommentText').childAt(0).text())
      console.log(container.at(0).find('Label').children().last().text())
//      expect(container.props().content).toEqual(HEADER_BUTTON_LABEL)
    })
  })
})
