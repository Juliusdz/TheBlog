import { Action } from '@ngrx/store';
import { Post } from './interfaces/post';

export enum PostActionTypes {
  LoadPosts = '[Post] Load Posts',
  AddPost = '[Post] Add Post',
  AddPostSuccess = '[Post] Add Post Success',
  RequestPost = '[Post] Request Post',
  RequestPostSuccess = '[Post] Request Post Success',
  DeletePost = '[Post] Delete Post',
  DeletePostSuccess = '[Post] Delete Post Success',
  UpdatePost = '[Post] Update Post',
  UpdatePostSuccess = '[Post] Update Post Success',
}

export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
  constructor(public payload: {posts: Post[]}) {}
}

export class AddPost implements Action {
  readonly type = PostActionTypes.AddPost;
  constructor(public payload: {post: Post}) {}
}

export class AddPostSuccess implements Action {
  readonly type = PostActionTypes.AddPostSuccess;
}

export class RequestPost implements Action {
  readonly type = PostActionTypes.RequestPost;
  constructor(public payload: {id: string}) {}
}

export class RequestPostSuccess implements Action {
  readonly type = PostActionTypes.RequestPostSuccess;
}

export class DeletePost implements Action {
  readonly type = PostActionTypes.DeletePost;
  constructor(public payload: {id: string}) {}
}

export class DeletePostSuccess implements Action {
  readonly type = PostActionTypes.DeletePostSuccess;
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UpdatePost;
  constructor(public payload: {id: string, changes: Post}) {}
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActionTypes.UpdatePostSuccess;
}


export type PostActions =
  LoadPosts | AddPost | AddPostSuccess | RequestPost | RequestPostSuccess |
  DeletePost | DeletePostSuccess | UpdatePost | UpdatePostSuccess;
