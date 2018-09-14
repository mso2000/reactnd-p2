import React from 'react'
import { shallow } from 'enzyme'
import { PostDetails } from './PostDetails'
import { posts, comments } from '../utils/mockStore.js'
import { formatData } from '../utils/helpers.js'
import {
  POST_NOT_FOUND_ERROR,
  COMMENT_LIST_ERROR_BODY,
  POST_ADD_COMMENT_BUTTON_LABEL,
  COMMENT_ANSWER_LABEL,
  COMMENT_EDIT_LABEL,
  COMMENT_DELETE_LABEL
} from '../utils/constants.js'

describe('[Component] PostDetails', () => {
  let wrapper, container, setup
  const sortOrder = ['voteScore', 'timestamp']

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
        sortOrder: sortOrder[0]
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
        match: {params: {id: posts[0].id, category: posts[0].category}},
        sortOrder: sortOrder[0]
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

    it('should display proper comments values ordered by vote', () => {
      container = wrapper.find('Comment')
      for(let i = 0; i < container.length; i++){
        let expectedValue = container.at(i).find('CommentAuthor').childAt(0).text()
        expect(expectedValue).toEqual(comments[i].author)
        expectedValue = container.at(i).find('CommentMetadata').childAt(0).text()
        expect(expectedValue).toEqual(formatData(comments[i].timestamp))
        expectedValue = container.at(i).find('CommentText').childAt(0).text()
        expect(expectedValue).toEqual(comments[i].body)
        expectedValue = container.at(i).find('Label').children().last().text()
        expect(Number(expectedValue)).toEqual(comments[i].voteScore)
      }
    })

    it('should display proper comments values ordered by date', () => {
      setup.sortOrder = sortOrder[1]
      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      const dateSortedComments = [comments[1], comments[0]]

      container = wrapper.find('Comment')
      for(let i = 0; i < container.length; i++){
        let expectedValue = container.at(i).find('CommentAuthor').childAt(0).text()
        expect(expectedValue).toEqual(dateSortedComments[i].author)
        expectedValue = container.at(i).find('CommentMetadata').childAt(0).text()
        expect(expectedValue).toEqual(formatData(dateSortedComments[i].timestamp))
        expectedValue = container.at(i).find('CommentText').childAt(0).text()
        expect(expectedValue).toEqual(dateSortedComments[i].body)
        expectedValue = container.at(i).find('Label').children().last().text()
        expect(Number(expectedValue)).toEqual(dateSortedComments[i].voteScore)
      }
    })
  })

  describe('handle buttons actions and modal callbacks', () => {
    beforeEach(() => {
      setup = {
        match: {params: {id: posts[0].id, category: posts[0].category}},
        sortOrder: sortOrder[0]
      }

      defaultSetup.addNewComment.mockClear()
      defaultSetup.fetchPostComments.mockClear()
      defaultSetup.removeComment.mockClear()
      defaultSetup.updateComment.mockClear()
      defaultSetup.voteComment.mockClear()

      wrapper = shallow(<PostDetails {...defaultSetup} {...setup} />)
      container = wrapper.find('CommentAction')
    })

    it(`should set proper state on "${ POST_ADD_COMMENT_BUTTON_LABEL }" button click`, () => {
      container = wrapper.find('Button')
      container.at(0).simulate('click')
      expect(wrapper.state().editModalOpen).toEqual(true)
      expect(wrapper.state().currentComment).toEqual({parentId: posts[0].id})
    })

    it('should call voteComment with "upVote" on "UP" arrow click', () => {
      container.at(0).simulate('click')
      expect(defaultSetup.voteComment).toHaveBeenCalledWith(comments[0], 'upVote')
    })

    it('should call voteComment with "downVote" on "DOWN" arrow click', () => {
      container.at(1).simulate('click')
      expect(defaultSetup.voteComment).toHaveBeenCalledWith(comments[0], 'downVote')
    })

    it(`should set proper state on "${ COMMENT_ANSWER_LABEL }" link click`, () => {
      container.at(2).simulate('click')
      expect(wrapper.state().editModalOpen).toEqual(true)
      expect(wrapper.state().currentComment).toEqual({parentId: posts[0].id})
    })

    it(`should set proper state on "${ COMMENT_EDIT_LABEL }" link click`, () => {
      container.at(3).simulate('click')
      expect(wrapper.state().editModalOpen).toEqual(true)
      expect(wrapper.state().currentComment).toEqual(comments[0])
    })

    it(`should set proper state on "${ COMMENT_DELETE_LABEL }" link click`, () => {
      container.at(4).simulate('click')
      expect(wrapper.state().deleteModalOpen).toEqual(true)
      expect(wrapper.state().currentComment).toEqual(comments[0])
    })

    it('should reset state on closeEditCommentModal call', () => {
      wrapper.setState({editModalOpen: true})
      wrapper.instance().closeEditCommentModal()
      expect(wrapper.state().editModalOpen).toBe(false)
      expect(wrapper.state().currentComment).toEqual({})
    })

    it('should reset state on closeDeleteModal call', () => {
      wrapper.setState({deleteModalOpen: true})
      wrapper.instance().closeDeleteModal()
      expect(wrapper.state().deleteModalOpen).toBe(false)
      expect(wrapper.state().currentComment).toEqual({})
    })

    it('updateComment callback should call props.updateComment', () => {
      wrapper.setState({currentComment: comments[0]})
      wrapper.instance().updateComment(comments[1])
      expect(defaultSetup.updateComment).toHaveBeenCalledWith(comments[0], comments[1])
    })

    it('handleDeleteModalAction callback should call props.removeComment', () => {
      wrapper.setState({currentComment: comments[0]})
      wrapper.instance().handleDeleteModalAction()
      expect(defaultSetup.removeComment).toHaveBeenCalledWith(comments[0])
    })
  })
})
