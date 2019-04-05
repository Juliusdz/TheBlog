import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducers';

import * as fromPosts from '../reducers/posts.reducers';
import { PageQuery } from '../post.actions';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

export const selectPostById = (postId: string) => createSelector(
  selectPostsState,
  postsState => postsState.entities[postId]
);

export const selectAllPosts = createSelector(
  selectPostsState,
  fromPosts.selectAll
);

export const selectPostsPage = (page: PageQuery) => createSelector(
  selectAllPosts,
  posts => {
    const start = page.pageIndex * page.pageSize;
    const end = start + page.pageSize;
    return posts.slice(start, end);
  }
);
