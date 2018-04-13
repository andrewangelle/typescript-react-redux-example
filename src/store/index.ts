import { RouterState } from 'react-router-redux';
import { PostData } from './posts/types';

export interface PostState {
  loading: boolean;
  error: null | Error;
  data: object;
  filters: {
    filterBy: string;
    currentValue: string | number;
    data: Array<PostData>;
  };
}

export interface RootState {
  router: RouterState;
  posts: PostState;
}