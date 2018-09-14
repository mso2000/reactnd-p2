export function addPost(post) {
  return new Promise((resolve, reject) => {
    process.nextTick(
      () =>
        post.hasOwnProperty('reject')
          ? reject('Some server error')
          : resolve(post)
    )
  })
}
