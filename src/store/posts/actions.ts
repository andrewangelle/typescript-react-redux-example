import { Dispatch } from 'redux';
import { ActionCreatorsMap } from '../helpers';
import { createAction } from 'redux-actions';
import * as postsApi from '../middleware/posts'

export const GET_POSTS_REQUEST = createAction('GET_POSTS_REQUEST');
export const GET_POSTS_SUCCESS = createAction('GET_POSTS_SUCCESS', (data: object) => data);
export const GET_POSTS_FAILURE = createAction('GET_POSTS_FAILURE', (err: Error) => err);
export const UPDATE_FILTER = createAction('UPDATE_FILTER', (options: object) => options)

export const PostActions: ActionCreatorsMap = {
  getPostsRequest: GET_POSTS_REQUEST,
  getPostsSuccess:  GET_POSTS_SUCCESS,
  getPostsFailure: GET_POSTS_FAILURE,
  updateFilter: UPDATE_FILTER,
}

export function fetchPostsData(): (dispatch: Dispatch<typeof PostActions>) => Promise<void> {
  return async (dispatch: Dispatch<typeof PostActions>) => {
    dispatch(PostActions.getPostsRequest());
    try {
      const data = await postsApi.fetchTableData()
      dispatch(PostActions.getPostsSuccess(data))
    } catch(err) {
      dispatch(PostActions.getPostsFailure(err))
    }
  }
}

export function setTableFilter(options: object): (Dispatch<typeof PostActions>) {
  return (dispatch: Dispatch<typeof PostActions>) => {
    dispatch(PostActions.updateFilter(options))
  }
}
