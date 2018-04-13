
export interface PostData {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface FilterOptions {
  filterBy: string;
  currentValue: string | number;
}

export interface FilterSelector extends FilterOptions {
  userIdValues: Array<number>;
  idValues: Array<number>;
  data: Array<PostData>;
}

export interface BaseAction {
  type: string;
  payload?: object;
}

export interface GetPostsRequestAction extends BaseAction {}
export interface GetPostsSuccessAction extends BaseAction {}
export interface GetPostsFailureAction extends BaseAction {}
export interface SetTableFilter extends BaseAction {}

export type PostsActions =
  GetPostsRequestAction |
  GetPostsSuccessAction |
  GetPostsFailureAction |
  SetTableFilter
;