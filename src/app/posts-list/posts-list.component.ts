import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { PostsState } from '../reducers/posts.reducers';
import { Post } from '../interfaces/post';
import { LoadPosts, AddPost } from '../post.actions';
import { selectAllPosts } from '../selectors/post.selectors';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {


  currentPosts$: Observable<Post[]>;

  constructor(private store: Store<PostsState>) { }

  ngOnInit() {
    this.currentPosts$ = this.store.pipe(
      select(selectAllPosts),
    );
  }

}
