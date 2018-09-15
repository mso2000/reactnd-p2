/**
 * Arquivo de mock com os métodos de manipulação do backend
 */
import { categories, posts, comments } from '../mockStore.js'

/**
 * Método genérico para simular a maioria dos métodos da API que implementam uma
 * Promise que recebe um objeto e retorna um JSON. Para provocar um reject, basta
 * adicionar um atributo "reject" no objeto de entrada
 */
export const standardApiPromise = (data = null, option = null) => {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        data.hasOwnProperty('reject')
          ? reject('Some server error')
          : resolve(data)
    )
  })
}

export const getAllCategories = () => standardApiPromise(categories)
export const getAllPosts = () => standardApiPromise(posts)
export const addPost = (post) => standardApiPromise(post)
export const editPost = (post) => standardApiPromise(post)
export const deletePost = (post) => standardApiPromise(post)
export const votePost = (post, option) => standardApiPromise(post)
export const addComment = (comment) => standardApiPromise(comment)
export const editComment = (comment) => standardApiPromise(comment)
export const deleteComment = (comment) => standardApiPromise(comment)
export const voteComment = (comment, option) => standardApiPromise(comment)

export const getComments = (post) => {
  return new Promise((resolve, reject) => {
    const fetchComments = comments.find(c => c.parentId === post.id)
    process.nextTick(
      () =>
        post.hasOwnProperty('reject')
          ? reject('Some server error')
          : resolve(fetchComments)
    )
  })
}
