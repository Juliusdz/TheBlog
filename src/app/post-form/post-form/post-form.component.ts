import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { PostsState } from 'src/app/reducers/posts.reducers';
import { selectPostById } from 'src/app/selectors/post.selectors';
import { tap, filter, first } from 'rxjs/operators';
import { RequestPost, UpdatePost, AddPost } from 'src/app/post.actions';
import { Post } from 'src/app/interfaces/post';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as uniqid from 'uniqid';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  post: Post;
  postForm: FormGroup;
  postId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<PostsState>,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      titleInput: new FormControl('', Validators.required),
      bodyTextArea: new FormControl('', Validators.required)
    });

    this.postId = this.route.snapshot.paramMap.get('postId');
    if (this.postId) {
      this.store.pipe(
        select(selectPostById(this.postId)),
        tap(post => {
          if (!post) {
            this.store.dispatch(new RequestPost({id: this.postId}));
          }
        }),
        filter(post => !!post),
        first()
      ).subscribe(post => {
        this.postForm.get('titleInput').setValue(post.title);
        this.postForm.get('bodyTextArea').setValue(post.body);
      });
    }

  }

  savePost() {
    if (this.postId) {
      const updatedPost = {
        id: this.postId,
        title: this.postForm.get('titleInput').value,
        body: this.postForm.get('bodyTextArea').value
      };
      this.store.dispatch(new UpdatePost({id: this.postId, changes: updatedPost }));
    } else {
      const post = {
        id: uniqid(),
        title: this.postForm.get('titleInput').value,
        body: this.postForm.get('bodyTextArea').value
      };
      this.store.dispatch(new AddPost({post}));
    }

    this.router.navigateByUrl('/');
  }

}
