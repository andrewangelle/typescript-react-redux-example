import { Reducer } from 'redux';
import { PostsActions } from './types';
import { PostState } from '../index';

const initialState: PostState = {
  loading: false,
  error: null,
  data: {},
  filters: {
    filterBy: 'none',
    currentValue: 'none',
    data: []
  }
}

const postsReducer: Reducer<PostState> = (state: PostState = initialState, action) => {
  switch ((action as PostsActions).type) {
    case 'GET_POSTS_REQUEST':
      return {
        ...state,
        loading: true
      };
    case 'GET_POSTS_SUCCESS':
      return {
        ...state,
        loading: false,
        data: {
          ...state.data,
          ...action.payload.data
        }
      };
    case 'GET_POSTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }
    case 'UPDATE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          currentValue: action.payload.options.currentValue,
          filterBy: action.payload.options.filterBy
        }
      }
    default:
      return initialState
  }
}

export default postsReducer