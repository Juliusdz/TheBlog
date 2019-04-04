import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../interfaces/post';
import { Store } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducers';
import { DeletePost } from '../post.actions';

@Component({
  selector: 'app-posts-list-item',
  templateUrl: './posts-list-item.component.html',
  styleUrls: ['./posts-list-item.component.scss']
})
export class PostsListItemComponent implements OnInit {

  @Input() post: Post;

  constructor(
    private store: Store<PostsState>
  ) { }

  ngOnInit() {
  }

  deletePost(id) {
    this.store.dispatch(new DeletePost({id}));
  }

}
