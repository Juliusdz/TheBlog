import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostsState } from './reducers/posts.reducers';
import { Post } from './interfaces/post';
import { LoadPosts } from './post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: Post[] = [
    {id: '1', title: 'Sed ut perspiciatis unde omnis iste et iusto odio?', body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    {id: '2', title: 'Ut enim ad minima veniam', body: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'},
    {id: '3', title: 'Et harum quidem rerum facilis est et expedita distinctio!', body: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus, voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga'}
  ]
  constructor(private store: Store<PostsState>) {
    this.store.dispatch(new LoadPosts({posts: this.posts}));
  }
}
