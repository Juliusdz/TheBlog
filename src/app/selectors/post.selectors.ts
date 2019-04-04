import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducers';

import * as fromPosts from '../reducers/posts.reducers';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPostById = (postId: string) => createSelector(
  selectPostsState,
  postsState => postsState.entities[postId]
);

export const selectAllPosts = createSelector(
  selectPostsState,
  fromPosts.selectAll
);
