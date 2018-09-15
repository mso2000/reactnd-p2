import * as ServerAPI from '../utils/ServerAPI'

export const ADD_CATEGORIES = 'ADD_CATEGORIES'
export const CATEGORIES_ARE_LOADING = 'CATEGORIES_ARE_LOADING'
export const SELECT_SORT_ORDER = 'SELECT_SORT_ORDER'
export const ADD_ALL_POSTS = 'ADD_ALL_POSTS'
export const POSTS_ARE_LOADING = 'POSTS_ARE_LOADING'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const UPDATE_POST = 'UPDATE_POST'
export const ADD_ALL_POST_COMMENTS = 'ADD_ALL_POST_COMMENTS'
export const COMMENTS_ARE_LOADING = 'COMMENTS_ARE_LOADING'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'

/**
 * Busca todas as categorias e posts do backend
 * Para evitar concorrências desnecessárias, são setados flags na Store que
 * indicam que os dados ainda estão sendo buscados no servidor ou já retornaram.
 */
export function fetchData() {
  return (dispatch, getState) => {
    if(getState().categoriesAreLoading) return
    dispatch(categoriesAreLoading(true))

    return ServerAPI.getAllCategories()
    .then(c => {
      dispatch(addAllCategories(c))
      dispatch(categoriesAreLoading(false))

      if(getState().postsAreLoading) return
      dispatch(postsAreLoading(true))

      return ServerAPI.getAllPosts()
      .then(p => {
        dispatch(addAllPosts(p))
        dispatch(postsAreLoading(false))
      })
      .catch(error => {
        dispatch(postsAreLoading(false))
        console.log(`Server error: ${error}.`)
      })
    })
    .catch(error => {
      dispatch(categoriesAreLoading(false))
      console.log(`Server error: ${error}.`)
    })
  }
}

/**
 * Adiciona um novo post na store e no backend. Em caso de erro no servidor, é
 * realizado um rollback das alterações na UI
 */
 export function addNewPost(post) {
  return (dispatch) => {
    dispatch(addPost(post))

    return ServerAPI.addPost(post)
    .then(res => {
      if(!res.hasOwnProperty('id')){
        console.log('Insertion error. Rolling back changes...')
        dispatch(deletePost(post))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(deletePost(post))
    })
  }
}

/**
 * Atualiza um post na store e no backend. Em caso de erro no servidor, é
 * realizado um rollback das alterações na UI
 */
export function updatePost(oldPost, newPost) {
  return (dispatch) => {
    dispatch(resetPost(newPost))

    return ServerAPI.editPost(newPost)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Edit error. Rolling back changes...')
        dispatch(resetPost(oldPost))
      }
    })
    .catch(error => {
      console.log(`Edit error: ${error}.\n\nRolling back changes...`)
      dispatch(resetPost(oldPost))
    })
  }
}

/**
 * Remove um post da store e do backend. Em caso de erro no servidor, é
 * realizado um rollback das alterações na UI
 * OBS: Esta ação também remove os respectivos comentários de um post
 */
export function removePost(post) {
  return (dispatch, getState) => {
    const postComments = getState().comments.filter(c => c.parentId === post.id)
    dispatch(deletePost(post))

    return ServerAPI.deletePost(post)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Delete error. Rolling back changes...')
        dispatch(addPost(post))
        dispatch(addAllPostComments(post, postComments))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(addPost(post))
      dispatch(addAllPostComments(post, postComments))
    })
  }
}

/**
 * Atualiza o score de votos de um post na store e no backend. Em caso de erro
 * no servidor, é realizado um rollback das alterações na UI
 */
export function votePost(post, option) {
  return (dispatch) => {
    dispatch(updatePostVoteScore(post, option))

    return ServerAPI.votePost(post, option)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Vote error. Rolling back changes...')
        dispatch(resetPost(post))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(resetPost(post))
    })
  }
}

export function addAllCategories (categories) {
  return {
    type: ADD_CATEGORIES,
    categories
  }
}

export function categoriesAreLoading (isLoading) {
  return {
    type: CATEGORIES_ARE_LOADING,
    isLoading
  }
}

export function selectSortOrder (sortOrder) {
  return {
    type: SELECT_SORT_ORDER,
    sortOrder
  }
}

export function addAllPosts (posts) {
  return {
    type: ADD_ALL_POSTS,
    posts
  }
}

export function postsAreLoading (isLoading) {
  return {
    type: POSTS_ARE_LOADING,
    isLoading
  }
}

export function addPost (post) {
  return {
    type: ADD_POST,
    post
  }
}

export function deletePost (post) {
  return {
    type: DELETE_POST,
    post
  }
}

export function resetPost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function updatePostVoteScore(post, option) {
  return {
    type: UPDATE_POST,
    post: {
      ...post,
      voteScore: option === 'upVote' ? post.voteScore + 1 : post.voteScore - 1
    }
  }
}

/**
 * Busca todas os comentários de um post do backend
 * Para evitar concorrências desnecessárias, são setados flags na Store que
 * indicam que os dados ainda estão sendo buscados no servidor ou já retornaram.
 */
 export function fetchPostComments(post) {
  return (dispatch, getState) => {
    if(getState().commentsAreLoading) return
    dispatch(commentsAreLoading(true))

    return ServerAPI.getComments(post)
    .then(comments => {
      dispatch(addAllPostComments(post, comments))
      dispatch(commentsAreLoading(false))
    })
    .catch(error => {
      dispatch(commentsAreLoading(false))
      console.log(`Server error: ${error}.`)
    })
  }
}

/**
 * Adiciona um novo comentário na store e no backend. Em caso de erro no
 * servidor, é realizado um rollback das alterações na UI
 * OBS: Esta ação também atualiza a contagem de comentários do post pai
 */
export function addNewComment(comment) {
  return (dispatch) => {
    dispatch(addComment(comment))

    return ServerAPI.addComment(comment)
    .then(res => {
      if(!res.hasOwnProperty('id')){
        console.log('Insertion error. Rolling back changes...')
        dispatch(deleteComment(comment))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(deleteComment(comment))
    })
  }
}

/**
 * Atualiza um comentário na store e no backend. Em caso de erro no servidor, é
 * realizado um rollback das alterações na UI
 * OBS: Esta ação também atualiza a contagem de comentários do post pai
 */
export function updateComment(oldComment, newComment) {
  return (dispatch) => {
    dispatch(resetComment(newComment))

    return ServerAPI.editComment(newComment)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Edit error. Rolling back changes...')
        dispatch(resetComment(oldComment))
      }
    })
    .catch(error => {
      console.log(`Edit error: ${error}.\n\nRolling back changes...`)
      dispatch(resetComment(oldComment))
    })
  }
}

/**
 * Remove um comentário da store e do backend. Em caso de erro no servidor, é
 * realizado um rollback das alterações na UI
 * OBS: Esta ação também atualiza a contagem de comentários do post pai
 */
export function removeComment(comment) {
  return (dispatch) => {
    dispatch(deleteComment(comment))

    return ServerAPI.deleteComment(comment)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Delete error. Rolling back changes...')
        dispatch(addComment(comment))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(addComment(comment))
    })
  }
}

/**
 * Atualiza o score de votos de um comentário na store e no backend. Em caso de
 * erro no servidor, é realizado um rollback das alterações na UI
 */
export function voteComment(comment, option) {
  return (dispatch) => {
    dispatch(updateCommentVoteScore(comment, option))

    return ServerAPI.voteComment(comment, option)
    .then(res => {
      if(res.hasOwnProperty('error')){
        console.log('Vote error. Rolling back changes...')
        dispatch(resetComment(comment))
      }
    })
    .catch(error => {
      console.log(`Server error: ${error}.\n\nRolling back changes...`)
      dispatch(resetComment(comment))
    })
  }
}

export function addAllPostComments(post, comments) {
  return {
    type: ADD_ALL_POST_COMMENTS,
    post,
    comments
  }
}

export function commentsAreLoading (isLoading) {
  return {
    type: COMMENTS_ARE_LOADING,
    isLoading
  }
}

export function addComment (comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function deleteComment (comment) {
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function resetComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function updateCommentVoteScore(comment, option) {
  return {
    type: UPDATE_COMMENT,
    comment: {
      ...comment,
      voteScore: option === 'upVote' ?
        comment.voteScore + 1 : comment.voteScore - 1
    }
  }
}
