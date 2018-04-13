import { Dispatch, ActionCreator } from 'redux';
import {
  GetPostsRequestAction,
  GetPostsSuccessAction,
  GetPostsFailureAction,
  SetTableFilter,
  PostData,
  PostsActions,
  PostFilter
} from './types';
import * as postsApi from '../middleware/posts'

export const getPostsRequest: ActionCreator<GetPostsRequestAction> = (type: string) => ({
  type: 'GET_POSTS_REQUEST'
})

export const getPostsSuccess: ActionCreator<GetPostsSuccessAction> = (data: PostData) => ({
  type: 'GET_POSTS_SUCCESS',
  payload: {
    data
  }
})

export const getPostsFailure: ActionCreator<GetPostsFailureAction> = (error: Error) => ({
  type: 'GET_POSTS_FAILURE',
  payload: {
    error
  }
})

export const setTableFilter: ActionCreator<SetTableFilter> = (options: PostFilter) => ({
  type: 'UPDATE_FILTER',
  payload: {
    options
  }
})

export function fetchPostsData(): (dispatch: Dispatch<PostsActions>) => Promise<void> {
  return async (dispatch: Dispatch<PostsActions>) => {
    dispatch(getPostsRequest());
    try {
      const data = await postsApi.fetchTableData()
      dispatch(getPostsSuccess(data))
    } catch(err) {
      dispatch(getPostsFailure(err))
    }
  }
}

export function setFilter(value: PostFilter): (Dispatch<PostsActions>) {
  return (dispatch: Dispatch<PostsActions>) => {
    dispatch(setTableFilter(value))
  }
}
