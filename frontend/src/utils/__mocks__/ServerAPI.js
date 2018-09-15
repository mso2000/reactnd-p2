import { categories, posts, comments } from '../mockStore.js'

const standardApiPromise = (data = null, option = null) => {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        data.hasOwnProperty('reject')
          ? reject('Some server error')
          : resolve(data)
    )
  })
}

export const getAllPosts = () => standardApiPromise(posts)
export const addPost = (post) => standardApiPromise(post)
export const editPost = (post) => standardApiPromise(post)
export const deletePost = (post) => standardApiPromise(post)
export const votePost = (post, option) => standardApiPromise(post)
