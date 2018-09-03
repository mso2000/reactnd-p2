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


export function fetchData() {
  return (dispatch, getState) => {
    if(getState().categoriesAreLoading) return
    dispatch(categoriesAreLoading(true))

    ServerAPI.getAllCategories()
    .then(c => {
      dispatch(addAllCategories(c))
      dispatch(categoriesAreLoading(false))

      if(getState().postsAreLoading) return
      dispatch(postsAreLoading(true))

      ServerAPI.getAllPosts()
      .then(p => {
        dispatch(addAllPosts(p))
        dispatch(postsAreLoading(false))
      })
      .catch(error => console.log(`Server error: ${error}.`))
    })
    .catch(error => console.log(`Server error: ${error}.`))
  }
}

export function addNewPost(post) {
  return (dispatch) => {
    dispatch(addPost(post))

    ServerAPI.addPost(post)
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

export function updatePost(oldPost, newPost) {
  return (dispatch) => {
    dispatch(resetPost(newPost))

    ServerAPI.editPost(newPost)
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

export function removePost(post) {
  return (dispatch, getState) => {
    const postComments = getState().comments.filter(c => c.parentId === post.id)
    dispatch(deletePost(post))

    ServerAPI.deletePost(post)
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

export function votePost(post, option) {
  return (dispatch) => {
    dispatch(updatePostVoteScore(post, option))

    ServerAPI.votePost(post, option)
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

export function fetchPostComments(post) {
  return (dispatch, getState) => {
    if(getState().commentsAreLoading) return
    dispatch(commentsAreLoading(true))

    ServerAPI.getComments(post)
    .then(comments => {
      dispatch(addAllPostComments(post, comments))
      dispatch(commentsAreLoading(false))
    })
    .catch(error => console.log(`Server error: ${error}.`))
  }
}

export function removeComment(comment) {
  return (dispatch) => {
    dispatch(deleteComment(comment))

    ServerAPI.deleteComment(comment)
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

export function voteComment(comment, option) {
  return (dispatch) => {
    dispatch(updateCommentVoteScore(comment, option))

    ServerAPI.voteComment(comment, option)
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
      voteScore: option === 'upVote' ? comment.voteScore + 1 : comment.voteScore - 1
    }
  }
}
