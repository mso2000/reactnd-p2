import React from 'react'
import { shallow } from 'enzyme'
import { Post } from './Post'
import { posts } from '../utils/mockStore.js'
import { formatData } from '../utils/helpers.js'

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

  describe('render post header', () => {
    beforeEach(() => {
      setup = {
        match: {params: {}},
      }
    })

    it('should have title and no link in post details', () => {
      setup.showDetails = true
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('h1')
      expect(container.exists('Link')).toEqual(false)
      expect(container.text()).toEqual(defaultSetup.selectedPost.title)
    })

    it('should have title and link to details in post list', () => {
      setup.showDetails = false
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('h1')
      expect(container.exists('Link')).toEqual(true)

      container = container.find('Link')
      expect(container.props().children).toEqual(defaultSetup.selectedPost.title)

      const expectedLink = `/${defaultSetup.selectedPost.category}/${defaultSetup.selectedPost.id}`
      expect(container.props().to).toEqual(expectedLink)
    })

    it('should have date', () => {
      setup.showDetails = false
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('b')
      expect(container.at(0).text()).toEqual(formatData(defaultSetup.selectedPost.timestamp))
    })

    it('should have author', () => {
      setup.showDetails = false
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('b')
      expect(container.at(1).text()).toEqual(defaultSetup.selectedPost.author)
    })

    it('should have category and link to it', () => {
      setup.showDetails = true
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('Link')

      const expectedLink = `/${defaultSetup.selectedPost.category}`
      expect(container.props().to).toEqual(expectedLink)

      const renderedCategory = container.props().children.props.children.slice(-1)[0]
      expect(renderedCategory).toEqual(defaultSetup.selectedPost.category)
    })

    it('should have only vote count label in post details', () => {
      setup.showDetails = true
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('Label')

      expect(container).toHaveLength(1)
      expect(container.exists('Icon')).toEqual(true)
      expect(container.find('Icon').props().name).toEqual('thumbs up')
      const renderedVoteScore = container.props().children.slice(-1)[0]
      expect(renderedVoteScore).toEqual(defaultSetup.selectedPost.voteScore)
    })

    it('should have vote count and comment count labels in post list', () => {
      setup.showDetails = false
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('Label')

      expect(container).toHaveLength(2)

      const expectedLabels = ['thumbs up', 'comments']
      const expectedCounts = [
        defaultSetup.selectedPost.voteScore,
        defaultSetup.selectedPost.commentCount
      ]

      for(let i = 0; i < container.length; i++){
        expect(container.at(i).exists('Icon')).toEqual(true)
        expect(container.at(i).find('Icon').props().name).toEqual(expectedLabels[i])
        const renderedVoteScore = container.at(i).props().children.slice(-1)[0]
        expect(renderedVoteScore).toEqual(expectedCounts[i])
      }
    })

    it('should have body in post details', () => {
      setup.showDetails = false
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      expect(wrapper.exists('Segment')).toEqual(false)

      setup.showDetails = true
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      expect(wrapper.exists('Segment')).toEqual(true)

      container = wrapper.find('Segment')
      const renderedBody = container.props().children
      expect(renderedBody).toEqual(defaultSetup.selectedPost.body)
    })
  })

  describe('handle buttons actions and modal callbacks', () => {
    beforeEach(() => {
      setup = {
        match: {params: {}},
        showDetails: false
      }

      defaultSetup.fetchData.mockClear()
      defaultSetup.history.push.mockClear()
      defaultSetup.removePost.mockClear()
      defaultSetup.updatePost.mockClear()
      defaultSetup.votePost.mockClear()

      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('Button')
    })

    it('should call votePost with "upVote" on -1 button click', () => {
      container.at(0).simulate('click')
      expect(defaultSetup.votePost).toHaveBeenCalledWith(defaultSetup.selectedPost, 'upVote')
    })

    it('should call votePost with "downVote" on -1 button click', () => {
      container.at(1).simulate('click')
      expect(defaultSetup.votePost).toHaveBeenCalledWith(defaultSetup.selectedPost, 'downVote')
    })

    it('should set "editModalOpen" state to true on edit button click', () => {
      container.at(2).simulate('click')
      expect(wrapper.state().editModalOpen).toBe(true)
    })

    it('should set "editModalOpen" state to false on closeEditPostModal call', () => {
      wrapper.setState({editModalOpen: true})
      wrapper.instance().closeEditPostModal()
      expect(wrapper.state().editModalOpen).toBe(false)
    })

    it('should set "deleteModalOpen" state to true on delete button click', () => {
      container.at(3).simulate('click')
      expect(wrapper.state().deleteModalOpen).toBe(true)
    })

    it('should set "deleteModalOpen" state to false on closeDeleteModal call', () => {
      wrapper.setState({deleteModalOpen: true})
      wrapper.instance().closeDeleteModal()
      expect(wrapper.state().deleteModalOpen).toBe(false)
    })

    it('updatePost callback should call props.updatePost', () => {
      wrapper.instance().updatePost(posts[1])
      expect(defaultSetup.updatePost).toHaveBeenCalledWith(defaultSetup.selectedPost, posts[1])
    })

    it('handleDeleteModalAction callback should call props.updatePost and redirect to category list', () => {
      wrapper.instance().handleDeleteModalAction()
      expect(defaultSetup.removePost).toHaveBeenCalledWith(defaultSetup.selectedPost)
      expect(defaultSetup.history.push).toHaveBeenCalledWith('/')

      defaultSetup.history.push.mockClear()
      setup.match.params.category = 'react'
      wrapper = shallow(<Post {...defaultSetup} {...setup} />)
      container = wrapper.find('Button')

      wrapper.instance().handleDeleteModalAction()
      expect(defaultSetup.removePost).toHaveBeenCalledWith(defaultSetup.selectedPost)
      expect(defaultSetup.history.push).toHaveBeenCalledWith('/react')
    })
  })
})
