import reducer from '../reducers/index.js'
import { categories, posts } from '../utils/mockStore.js'

import {
  addAllCategories,
  addAllPosts,
  addComment,
  addPost,
  categoriesAreLoading,
  deleteComment,
  deletePost,
  postsAreLoading,
  resetPost,
  selectSortOrder
} from '../actions'

describe('[Reducer]', () => {
  let store, initialState

  describe('"categories" actions', () => {
    it('call ADD_CATEGORIES should reset categories', () => {
      initialState = {categories: [categories[0]]}
      store = reducer(initialState, addAllCategories(categories))
      expect(store.categories).toEqual(categories)
    })
  })

  describe('"categoriesAreLoading" actions', () => {
    it('call CATEGORIES_ARE_LOADING should change state to true or false', () => {
      initialState = {categoriesAreLoading: false}
      store = reducer(initialState, categoriesAreLoading(true))
      expect(store.categoriesAreLoading).toEqual(true)
      initialState = {categoriesAreLoading: true}
      store = reducer(initialState, categoriesAreLoading(false))
      expect(store.categoriesAreLoading).toEqual(false)
    })
  })

  describe('"sortOrder" actions', () => {
    it('call SELECT_SORT_ORDER should change the sort order', () => {
      initialState = {sortOrder: 'timestamp'}
      store = reducer(initialState, selectSortOrder('voteScore'))
      expect(store.sortOrder).toEqual('voteScore')
      initialState = {sortOrder: 'voteScore'}
      store = reducer(initialState, selectSortOrder('timestamp'))
      expect(store.sortOrder).toEqual('timestamp')
    })
  })

  describe('"posts" actions', () => {
    it('call ADD_ALL_POSTS should reset posts', () => {
      initialState = { posts: [posts[0]]}
      store = reducer(initialState, addAllPosts(posts))
      expect(store.posts).toEqual(posts)
    })

    it('call ADD_POST should add a new post', () => {
      initialState = {posts: [posts[0]]}
      store = reducer(initialState, addPost(posts[1]))
      expect(store.posts).toEqual(posts)
    })

    it('call DELETE_POST should delete a post', () => {
      initialState = { posts }
      store = reducer(initialState, deletePost(posts[0]))
      expect(store.posts).toEqual([posts[1]])
    })

    it('call UPDATE_POST should delete a post and re-add updated one', () => {
      initialState = { posts }
      const updatedPost = {...posts[0]}
      updatedPost.title = 'Another Title'
      store = reducer(initialState, resetPost(updatedPost))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })

    it('call ADD_COMMENT should re-add post with updated comment count', () => {
      initialState = { posts }
      const updatedPost = {...posts[0]}
      updatedPost.commentCount++
      const comment = { parentId: posts[0].id }
      store = reducer(initialState, addComment(comment))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })

    it('call DELETE_COMMENT should re-add post with updated comment count', () => {
      initialState = { posts }
      const updatedPost = {...posts[0]}
      updatedPost.commentCount--
      const comment = { parentId: posts[0].id }
      store = reducer(initialState, deleteComment(comment))
      expect(store.posts).toEqual([posts[1], updatedPost])
    })
  })

  describe('"postsAreLoading" actions', () => {
    it('call POSTS_ARE_LOADING should change state to true or false', () => {
      initialState = {postsAreLoading: false}
      store = reducer(initialState, postsAreLoading(true))
      expect(store.postsAreLoading).toEqual(true)
      initialState = {postsAreLoading: true}
      store = reducer(initialState, postsAreLoading(false))
      expect(store.postsAreLoading).toEqual(false)
    })
  })
})
