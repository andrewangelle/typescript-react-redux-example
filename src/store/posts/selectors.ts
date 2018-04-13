import { createSelector } from 'reselect';
import { RootState, PostState } from '../index';
import { PostFilter } from './types';
import uniq from 'lodash/uniq'

interface FilterSelector extends PostFilter {
  userIdValues: Array<number>;
  idValues: Array<number>;
}

const getPosts = (state: RootState): PostState['data'] => state.posts.data;
const getFilters = (state: RootState): PostState['filters'] => state.posts.filters;

export const filterSelector = createSelector(
  [ getPosts, getFilters ],
  (posts: PostState['data'], filters: PostState['filters']) => {
    const currentState = (Object as any).values(posts).map(post => Object.assign({}, post));

    const nextState: FilterSelector = {
      ...filters,
      data: currentState,
      userIdValues: [...uniq(currentState.map(post => post.userId))],
      idValues: [...uniq(currentState.map(post => post.id))]
    };

    switch(filters.filterBy) {
      case 'none':
        return {
          ...nextState
        }
      case 'User Id':
        return {
          ...nextState,
          data: currentState.filter(post => post.userId === filters.currentValue)
        }
      case 'Id':
        return {
          ...nextState,
          data: currentState.filter(post => post.id === filters.currentValue)
        }
      case 'Title':
        if(filters.currentValue === 'A-Z') {
          return {
            ...nextState,
            data: currentState.sort((a,b) => {
              if(a.title < b.title) {return -1};
              if(a.title > b.title) {return 1};
              return 0;
            })
          }
        }

        if(filters.currentValue === 'Z-A') {
          return {
            ...nextState,
            data: currentState.sort((a,b) => {
              if(a.title < b.title) {return 1};
              if(a.title > b.title) {return -1};
              return 0;
            })
          }
        }
        break;
      case 'Body':
        if(filters.currentValue === 'A-Z') {
          return {
            ...nextState,
            data: currentState.sort((a,b) => {
              if(a.body < b.body) {return -1};
              if(a.body > b.body) {return 1};
              return 0;
            })
          }
        }

        if(filters.currentValue === 'Z-A') {
          return {
            ...nextState,
            data: currentState.sort((a,b) => {
              if(a.body < b.body) {return 1};
              if(a.body > b.body) {return -1};
              return 0;
            })
          }
        }
        break
      default:
        return {...nextState}
    }
  }
);
