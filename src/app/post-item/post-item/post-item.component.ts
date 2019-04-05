import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectPostById } from 'src/app/selectors/post.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { RequestPost, DeletePost } from 'src/app/post.actions';
import { PostsState } from 'src/app/reducers/posts.reducers';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent implements OnInit {

  post: Post;
  postId: string;

  constructor(
    private store: Store<PostsState>,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.store.pipe(
      select(selectPostById(this.postId)),
      tap(post => {
        if (!post) {
          this.store.dispatch(new RequestPost({id: this.postId}));
        }
      }),
      filter(post => !!post),
      first(),
    ).subscribe(post => this.post = post);
  }

  deletePost() {
    this.store.dispatch(new DeletePost({id: this.postId}));
    this.router.navigateByUrl('/');
  }

}
