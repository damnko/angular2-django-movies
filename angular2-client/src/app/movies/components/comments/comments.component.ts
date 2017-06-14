import { HelpersService } from './../../../core/services/helpers.service';
import { UserService } from './../../../core/services/user.service';
import { Observable } from 'rxjs/Observable';
import { MoviesService } from './../../../core/services/movies.service';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as _ from 'lodash';

@Component({
  selector: 'comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})

export class CommentsComponent implements OnInit {
  @Input() movieId: string;
  @Input() width: number;
  comments: any[];
  commentForm: FormGroup;
  postingComment: boolean = false;
  newComments$ = new BehaviorSubject<any>([]);

  constructor(
    private ms: MoviesService,
    private fb: FormBuilder,
    public us: UserService,
    private helpers: HelpersService
  ) {
    this.commentForm = this.fb.group({
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    console.log('init', this.movieId, this.us.getOrSetUsername());
    Observable.combineLatest(
      this.ms.getComments(this.movieId).map(res => res.data.comments),
      this.newComments$.scan((comments, comment) => [...comments, ...comment], []),
      (comments, newComments) => [...comments, ...newComments]
    ).subscribe(comments => {
      console.log('comments are', comments);
      this.comments = comments;
    });
  }

  postComent(): void {
    if (!this.commentForm.valid) {
      return;
    }

    const commentBody = this.commentForm.value['comment'];
    this.postingComment = true;
    this.ms.postComment(this.movieId, commentBody)
      .subscribe(res => {
        this.postingComment = false;
        this.commentForm.reset();

        this.newComments$.next([{
          username: this.us.getOrSetUsername(),
          body: commentBody,
          id: res.data.id
        }]);
      });
  }

  removeComment(id: string): void {
    this.ms.removeComment(id)
      .subscribe(
        res => {
          const i = _.findIndex(this.comments, comment => comment.id === id);
          this.comments.splice(i, 1);
        },
        err => this.helpers.showMessage('The comment could not be removed')
      );
  }
}
