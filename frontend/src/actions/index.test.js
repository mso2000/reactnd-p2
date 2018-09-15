import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import { categories, posts, comments } from '../utils/mockStore.js'

jest.mock('../utils/ServerAPI')

describe('[Actions]', () => {
  const mockStore = configureMockStore([ thunk ])
  const store = mockStore({
    categories,
    posts,
    comments,
    sortOrder: 'voteScore',
    categoriesAreLoading: false,
    postsAreLoading: false,
    commentsAreLoading: false
  })

  beforeEach(() => store.clearActions());

  describe('Action Creators tests', () => {
    describe('loading control', () => {
      it('categoriesAreLoading should dispatch CATEGORIES_ARE_LOADING action', () => {
          const expectedActions = [
            { type: actions.CATEGORIES_ARE_LOADING, isLoading: true },
            { type: actions.CATEGORIES_ARE_LOADING, isLoading: false },
          ]

          store.dispatch(actions.categoriesAreLoading(true))
          store.dispatch(actions.categoriesAreLoading(false))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('postsAreLoading should dispatch POSTS_ARE_LOADING action', () => {
          const expectedActions = [
            { type: actions.POSTS_ARE_LOADING, isLoading: true },
            { type: actions.POSTS_ARE_LOADING, isLoading: false },
          ]

          store.dispatch(actions.postsAreLoading(true))
          store.dispatch(actions.postsAreLoading(false))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('commentsAreLoading should dispatch COMMENTS_ARE_LOADING action', () => {
          const expectedActions = [
            { type: actions.COMMENTS_ARE_LOADING, isLoading: true },
            { type: actions.COMMENTS_ARE_LOADING, isLoading: false },
          ]

          store.dispatch(actions.commentsAreLoading(true))
          store.dispatch(actions.commentsAreLoading(false))
          expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('posts', () => {
      it('addAllPosts should dispatch ADD_ALL_POSTS action', () => {
          const expectedActions = [
            { type: actions.ADD_ALL_POSTS, posts },
          ]

          store.dispatch(actions.addAllPosts(posts))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('addPost should dispatch ADD_POST action', () => {
          const expectedActions = [
            { type: actions.ADD_POST, post: posts[0] }
          ]

          store.dispatch(actions.addPost(posts[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('deletePost should dispatch DELETE_POST action', () => {
          const expectedActions = [
            { type: actions.DELETE_POST, post: posts[0] }
          ]

          store.dispatch(actions.deletePost(posts[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('resetPost should dispatch UPDATE_POST action', () => {
          const expectedActions = [
            { type: actions.UPDATE_POST, post: posts[0] }
          ]

          store.dispatch(actions.resetPost(posts[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('updatePostVoteScore should dispatch UPDATE_POST action with updated voteScore', () => {
          const expectedActions = [
            { type: actions.UPDATE_POST, post: {...posts[0], voteScore: posts[0].voteScore + 1} },
            { type: actions.UPDATE_POST, post: {...posts[0], voteScore: posts[0].voteScore - 1} },
          ]

          store.dispatch(actions.updatePostVoteScore(posts[0], 'upVote'))
          store.dispatch(actions.updatePostVoteScore(posts[0], 'downVote'))
          expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('comments', () => {
      it('addAllPostComments should dispatch ADD_ALL_POST_COMMENTS action', () => {
          const expectedActions = [
            { type: actions.ADD_ALL_POST_COMMENTS, post: posts[1], comments: comments[2]},
          ]

          store.dispatch(actions.addAllPostComments(posts[1], comments[2]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('addComment should dispatch ADD_COMMENT action', () => {
          const expectedActions = [
            { type: actions.ADD_COMMENT, comment: comments[0] }
          ]

          store.dispatch(actions.addComment(comments[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('deleteComment should dispatch DELETE_COMMENT action', () => {
          const expectedActions = [
            { type: actions.DELETE_COMMENT, comment: comments[0] }
          ]

          store.dispatch(actions.deleteComment(comments[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('resetComment should dispatch UPDATE_COMMENT action', () => {
          const expectedActions = [
            { type: actions.UPDATE_COMMENT, comment: comments[0] }
          ]

          store.dispatch(actions.resetComment(comments[0]))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('updateCommentVoteScore should dispatch UPDATE_COMMENT action with updated voteScore', () => {
          const expectedActions = [
            { type: actions.UPDATE_COMMENT, comment: {...comments[0], voteScore: comments[0].voteScore + 1} },
            { type: actions.UPDATE_COMMENT, comment: {...comments[0], voteScore: comments[0].voteScore - 1} },
          ]

          store.dispatch(actions.updateCommentVoteScore(comments[0], 'upVote'))
          store.dispatch(actions.updateCommentVoteScore(comments[0], 'downVote'))
          expect(store.getActions()).toEqual(expectedActions)
      })
    })

    describe('others', () => {
      it('addAllCategories should dispatch ADD_CATEGORIES action', () => {
          const expectedActions = [
            { type: actions.ADD_CATEGORIES, categories }
          ]

          store.dispatch(actions.addAllCategories(categories))
          expect(store.getActions()).toEqual(expectedActions)
      })

      it('selectSortOrder should dispatch SELECT_SORT_ORDER action', () => {
          const expectedActions = [
            { type: actions.SELECT_SORT_ORDER, sortOrder: 'timestamp' },
            { type: actions.SELECT_SORT_ORDER, sortOrder: 'voteScore' },
          ]

          store.dispatch(actions.selectSortOrder('timestamp'))
          store.dispatch(actions.selectSortOrder('voteScore'))
          expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('Async middleware tests', () => {
    describe('addNewPost', () => {
      it('should add valid post', () => {
          const expectedActions = [
            { type: actions.ADD_POST, post: posts[0] }
          ]

          return store.dispatch(actions.addNewPost(posts[0]))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on server error', () => {
          const invalidPost = {reject: 'invalid'}
          const expectedActions = [
            { type: actions.ADD_POST, post: invalidPost },
            { type: actions.DELETE_POST, post: invalidPost },
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.addNewPost(invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on insertion error', () => {
          const invalidPost = {invalid: 'invalid'}
          const expectedActions = [
            { type: actions.ADD_POST, post: invalidPost },
            { type: actions.DELETE_POST, post: invalidPost },
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.addNewPost(invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })
    })

    describe('updatePost', () => {
      it('should properly edit current post when valid', () => {
          const expectedActions = [
            { type: actions.UPDATE_POST, post: posts[1] }
          ]

          return store.dispatch(actions.updatePost(posts[0], posts[1]))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on server error', () => {
          const invalidPost = {reject: 'invalid'}
          const expectedActions = [
            { type: actions.UPDATE_POST, post: invalidPost },
            { type: actions.UPDATE_POST, post: posts[0] }
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.updatePost(posts[0], invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on edit error', () => {
          const invalidPost = {error: 'invalid'}
          const expectedActions = [
            { type: actions.UPDATE_POST, post: invalidPost },
            { type: actions.UPDATE_POST, post: posts[0] }
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.updatePost(posts[0], invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })
    })

    describe('removePost', () => {
      it('should properly remove post', () => {
          const expectedActions = [
            { type: actions.DELETE_POST, post: posts[0] }
          ]

          return store.dispatch(actions.removePost(posts[0]))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on server error', () => {
          const invalidPost = {...posts[1], reject: 'invalid'}
          const expectedActions = [
            { type: actions.DELETE_POST, post: invalidPost },
            { type: actions.ADD_POST, post: invalidPost },
            { type: actions.ADD_ALL_POST_COMMENTS, post: invalidPost, comments: [comments[2]] },
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.removePost(invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on delete error', () => {
          const invalidPost = {...posts[1], error: 'invalid'}
          const expectedActions = [
            { type: actions.DELETE_POST, post: invalidPost },
            { type: actions.ADD_POST, post: invalidPost },
            { type: actions.ADD_ALL_POST_COMMENTS, post: invalidPost, comments: [comments[2]] },
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.removePost(invalidPost))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })
    })

    describe('votePost', () => {
      it('should properly update current post voteScore', () => {
          const expectedActions = [
            { type: actions.UPDATE_POST, post: {...posts[0], voteScore: posts[0].voteScore + 1} },
          ]

          return store.dispatch(actions.votePost(posts[0], 'upVote'))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on server error', () => {
          const invalidPost = {...posts[0], reject: 'invalid'}
          const expectedActions = [
            { type: actions.UPDATE_POST, post: {...invalidPost, voteScore: invalidPost.voteScore + 1} },
            { type: actions.UPDATE_POST, post: invalidPost }
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.votePost(invalidPost, 'upVote'))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })

      it('should rollback changes on edit error', () => {
          const invalidPost = {...posts[0], error: 'invalid'}
          const expectedActions = [
            { type: actions.UPDATE_POST, post: {...invalidPost, voteScore: invalidPost.voteScore + 1} },
            { type: actions.UPDATE_POST, post: invalidPost }
          ]

          console.log = jest.fn(console.log).mockImplementationOnce(null)

          return store.dispatch(actions.votePost(invalidPost, 'upVote'))
          .then(() => expect(store.getActions()).toEqual(expectedActions))
      })
    })

    describe('test', () => {

    })
  })
})
