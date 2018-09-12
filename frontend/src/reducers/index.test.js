import reducer from '../reducers/index.js'
import { categories, posts } from '../utils/mockStore.js'

import {
  addPost, addAllCategories
} from '../actions'

describe('[Reducer]', () => {
  let store
  it('call ADD_CATEGORIES should reset categories', () => {
    const initialState = {categories: [categories[0]]}
    store = reducer(initialState, addAllCategories(categories))
    expect(store.categories).toEqual(categories)
  })

  it('call ADD_POST should add a new post', () => {
    const initialState = {posts: [posts[0]]}
    store = reducer(initialState, addPost(posts[1]))
    expect(store.posts).toEqual(posts)
  })
})
