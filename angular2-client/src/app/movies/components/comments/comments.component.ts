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
  commentsData: {
    comments: any[],
    currentPage: number,
    totalPages: number,
    itemsPerPage: number
  };
  commentForm: FormGroup;
  postingComment: boolean = false;
  commentsPageNr$ = new BehaviorSubject<number>(1);

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

    this.commentsPageNr$
      .flatMap(page => this.ms.getComments(this.movieId, page))
      .map(res => res.data)
      .map(comments => {
        return {
          comments: comments.comments,
          currentPage: comments.current_page,
          totalPages: comments.total_pages,
          itemsPerPage: comments.items_per_page
        };
      }).subscribe(commentsObj => {
        this.commentsData = commentsObj;
      });
  }

  changePage(ev: number): void {
    this.commentsPageNr$.next(ev);
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

        // reload comments from page 1
        this.commentsPageNr$.next(1);
      });
  }

  removeComment(id: string): void {
    this.ms.removeComment(id)
      .subscribe(
        res => {
          // reload current comments page
          this.commentsPageNr$.next(this.commentsData.currentPage);
        },
        err => this.helpers.showMessage('The comment could not be removed')
      );
  }
}
