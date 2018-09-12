import reducer from '../reducers/index.js'
import { categories, posts, comments } from '../utils/mockStore.js'

import {
  addAllCategories,
  addAllPostComments,
  addAllPosts,
  addComment,
  addPost,
  categoriesAreLoading,
  commentsAreLoading,
  deleteComment,
  deletePost,
  postsAreLoading,
  resetComment,
  resetPost,
  selectSortOrder
} from '../actions'

describe('[Reducer]', () => {
  let store, initialState

  describe('"categories" actions', () => {
    it('ADD_CATEGORIES should reload categories', () => {
      initialState = {categories: [categories[0]]}
      store = reducer(initialState, addAllCategories(categories))
      expect(store.categories).toEqual(categories)
    })
  })

  describe('"categoriesAreLoading" actions', () => {
    it('CATEGORIES_ARE_LOADING should change state to true or false', () => {
      initialState = {categoriesAreLoading: false}
      store = reducer(initialState, categoriesAreLoading(true))
      expect(store.categoriesAreLoading).toEqual(true)
      initialState = {categoriesAreLoading: true}
      store = reducer(initialState, categoriesAreLoading(false))
      expect(store.categoriesAreLoading).toEqual(false)
    })
  })

  describe('"sortOrder" actions', () => {
    it('SELECT_SORT_ORDER should change the sort order', () => {
      initialState = {sortOrder: 'timestamp'}
      store = reducer(initialState, selectSortOrder('voteScore'))
      expect(store.sortOrder).toEqual('voteScore')
      initialState = {sortOrder: 'voteScore'}
      store = reducer(initialState, selectSortOrder('timestamp'))
      expect(store.sortOrder).toEqual('timestamp')
    })
  })

  describe('"posts" actions', () => {
    it('ADD_ALL_POSTS should reload posts', () => {
      initialState = { posts: [posts[0]]}
      store = reducer(initialState, addAllPosts(posts))
      expect(store.posts).toEqual(posts)
    })

    it('ADD_POST should add a new post', () => {
      initialState = {posts: [posts[0]]}
      store = reducer(initialState, addPost(posts[1]))
      expect(store.posts).toEqual(posts)
    })

    it('DELETE_POST should delete a post', () => {
      initialState = { posts }
      store = reducer(initialState, deletePost(posts[0]))
      expect(store.posts).toEqual([posts[1]])
    })

    it('UPDATE_POST should delete a post and re-add updated one', () => {
      initialState = { posts }
      const updatedPost = {...posts[0]}
      updatedPost.title = 'Another Title'
      store = reducer(initialState, resetPost(updatedPost))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })

    it('ADD_ALL_POST_COMMENTS should re-add post with updated comment count', () => {
      initialState = { posts, comments }
      const updatedPost = {...posts[0]}
      updatedPost.commentCount = 1
      store = reducer(initialState, addAllPostComments(posts[0], [comments[0]]))
      expect(store.posts[1]).toEqual(updatedPost)
    })

    it('ADD_COMMENT should re-add post with updated comment count', () => {
      initialState = { posts, comments }
      const updatedPost = {...posts[0]}
      updatedPost.commentCount++
      const comment = { parentId: posts[0].id }
      store = reducer(initialState, addComment(comment))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })

    it('DELETE_COMMENT should re-add post with updated comment count', () => {
      initialState = { posts, comments }
      const updatedPost = {...posts[0]}
      updatedPost.commentCount--
      store = reducer(initialState, deleteComment(comments[0]))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })
  })

  describe('"postsAreLoading" actions', () => {
    it('POSTS_ARE_LOADING should change state to true or false', () => {
      initialState = {postsAreLoading: false}
      store = reducer(initialState, postsAreLoading(true))
      expect(store.postsAreLoading).toEqual(true)
      initialState = {postsAreLoading: true}
      store = reducer(initialState, postsAreLoading(false))
      expect(store.postsAreLoading).toEqual(false)
    })
  })

  describe('"comments" actions', () => {
    it('ADD_ALL_POST_COMMENTS should reload current post comments', () => {
      initialState = { posts, comments }
      store = reducer(initialState, addAllPostComments(posts[0], [comments[0]]))
      expect(store.comments).toEqual([comments[2], comments[0]])
    })

    it('ADD_COMMENT should and a new comment to current post', () => {
      initialState = { posts, comments: [comments[0], comments[1]] }
      store = reducer(initialState, addComment(comments[2]))
      expect(store.comments).toEqual(comments)
    })

    it('DELETE_POST should delete all comments from current post', () => {
      initialState = { posts, comments }
      store = reducer(initialState, deletePost(posts[0]))
      expect(store.comments).toEqual([comments[2]])
    })

    it('DELETE_COMMENT should delete a comment from current post', () => {
      initialState = { posts, comments }
      store = reducer(initialState, deleteComment(comments[1]))
      expect(store.comments).toEqual([comments[0], comments[2]])
    })

    it('UPDATE_COMMENT should delete a comment from current post and re-add updated one', () => {
      initialState = { posts, comments }
      const updatedComment = {...comments[0]}
      updatedComment.body = 'Comment edited'
      store = reducer(initialState, resetComment(updatedComment))
      expect(store.comments).toEqual([comments[1], comments[2], updatedComment])
    })
  })

  describe('"commentsAreLoading" actions', () => {
    it('COMMENTS_ARE_LOADING should change state to true or false', () => {
      initialState = {commentsAreLoading: false}
      store = reducer(initialState, commentsAreLoading(true))
      expect(store.commentsAreLoading).toEqual(true)
      initialState = {commentsAreLoading: true}
      store = reducer(initialState, commentsAreLoading(false))
      expect(store.commentsAreLoading).toEqual(false)
    })
  })
})
