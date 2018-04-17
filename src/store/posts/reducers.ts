import * as Actions from './actions';
import { PostState } from './types';
import { ActionsUnion } from '../helpers';
import { Reducer } from 'redux';

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

type Actions = ActionsUnion<typeof Actions.PostActions>

const postsReducer: Reducer<Actions> = (state: PostState = initialState, action: Actions = Actions.PostActions) => {
  switch (action.type as string) {
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
          ...action.payload
        }
      };
    case 'GET_POSTS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case 'UPDATE_FILTER':
      return {
        ...state,
        filters: {
          ...state.filters,
          currentValue: action.payload.currentValue,
          filterBy: action.payload.filterBy
        }
      }
    default:
      return initialState
  }
}

export default postsReducer