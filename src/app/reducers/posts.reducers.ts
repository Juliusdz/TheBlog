import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Post } from '../interfaces/post';
import { PostActions, PostActionTypes } from '../post.actions';

// function sortBySeqNo(e1: Post, e2: Post) {
//   return e1.seqNo - e2.seqNo;
// }

export interface PostsState extends EntityState<Post> {
  posts: Post[];
}

export const adapter: EntityAdapter<Post> =
  createEntityAdapter<Post>();

export const initialPostsState: PostsState =
  adapter.getInitialState({
    posts: null
  });

export function postsReducer(
  state = initialPostsState, 
  action: PostActions): PostsState {
  switch (action.type) {
      case PostActionTypes.LoadPosts:
        return adapter.addAll(action.payload.posts, state);
      case PostActionTypes.AddPost:
        return adapter.addOne(action.payload.post, state);
      case PostActionTypes.UpdatePost:
        return adapter.updateOne(action.payload, state);
      case PostActionTypes.DeletePost:
        return adapter.removeOne(action.payload.id, state);
      default:
        return state;
  }
}

export const {
  selectAll
} = adapter.getSelectors();


