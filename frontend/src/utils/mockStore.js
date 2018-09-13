export const categories = [
  {
    name: "react",
    path: "react"
  },
  {
    name: "redux",
    path: "redux"
  },
  {
    name: "udacity",
    path: "udacity"
  }
]

export const posts = [
  {
    id: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1467166872634,
    title: "Udacity is the best place to learn React",
    body: "Everyone says so after all.",
    author: "thingtwo",
    category: "react",
    voteScore: 6,
    deleted: false,
    commentCount: 2
  },
  {
    id: "6ni6ok3ym7mf1p33lnez",
    timestamp: 1468479767190,
    title: "Learn Redux in 10 minutes!",
    body: "Just kidding. It takes more than 10 minutes to learn technology.",
    author: "thingone",
    category: "redux",
    voteScore: -5,
    deleted: false,
    commentCount: 1
  },
  {
    id: "5ui6ok3ym7mf1p33l472",
    timestamp: 1468479767190,
    title: "Just a Post With no Comments!",
    body: "I don't want comments here",
    author: "thingthree",
    category: "react",
    voteScore: -3,
    deleted: false,
    commentCount: 0
  }
]

export const comments = [
  {
		id: "894tuq4ut84ut8v4t8wun89g",
		parentId: "8xf0y6ziyjabvozdd253nd",
		timestamp: 1468166872634,
		body: "Hi there! I am a COMMENT.",
		author: "thingtwo",
		voteScore: 6,
		deleted: false,
		parentDeleted: false
	},
	{
		id: "8tu4bsun805n8un48ve89",
		parentId: "8xf0y6ziyjabvozdd253nd",
		timestamp: 1469479767190,
		body: "Comments. Are. Cool.",
		author: "thingone",
		voteScore: -5,
		deleted: false,
		parentDeleted: false
	},
  {
		id: "7v94bsun805n8un48ve78",
		parentId: "6ni6ok3ym7mf1p33lnez",
		timestamp: 1469479767190,
		body: "Just another comment",
		author: "thingthree",
		voteScore: -1,
		deleted: false,
		parentDeleted: false
	}
]
