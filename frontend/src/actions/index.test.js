import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './';
import { posts } from '../utils/mockStore.js'

jest.mock('../utils/ServerAPI')

const mockStore = configureMockStore([ thunk ]);
const store = mockStore({
  posts: [],
})

beforeEach(() => store.clearActions());

it('addPost should dispatch ADD_POST action', () => {
    const expectedActions = [
      { type: actions.ADD_POST, post: posts[0] }
    ]

    store.dispatch(actions.addPost(posts[0]))
    expect(store.getActions()).toEqual(expectedActions)
})

it('addNewPost should add valid post', () => {
    const expectedActions = [
      { type: actions.ADD_POST, post: posts[0] }
    ]

    store.dispatch(actions.addNewPost(posts[0]))
    expect(store.getActions()).toEqual(expectedActions)
})

it('addNewPost should rollback changes on server error', () => {
    const invalidPost = {reject: 'invalid'}
    const expectedActions = [
      { type: actions.ADD_POST, post: invalidPost },
      { type: actions.DELETE_POST, post: invalidPost },
    ]

    console.log = jest.fn(console.log).mockImplementationOnce(null)

    return store.dispatch(actions.addNewPost(invalidPost))
    .then(() => expect(store.getActions()).toEqual(expectedActions))
})

it('addNewPost should rollback changes on insertion error', () => {
    const invalidPost = {invalid: 'invalid'}
    const expectedActions = [
      { type: actions.ADD_POST, post: invalidPost },
      { type: actions.DELETE_POST, post: invalidPost },
    ]

    console.log = jest.fn(console.log).mockImplementationOnce(null)

    return store.dispatch(actions.addNewPost(invalidPost))
    .then(() => expect(store.getActions()).toEqual(expectedActions))
})

it('addNewPost should add proper post', () => {
    const expectedActions = [
      { type: actions.ADD_POST, post: posts[0] }
    ]

    console.log('voltei!')

  //  store.dispatch(actions.addNewPost(posts[0]))
//    expect(store.getActions()).toEqual(expectedActions)
})
