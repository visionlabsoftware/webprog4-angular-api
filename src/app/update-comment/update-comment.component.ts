import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../services/comments.service';
import { CommentRequest } from '../models/commentRequest.model';

@Component({
  selector: 'app-update-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './update-comment.component.html',
  styleUrl: './update-comment.component.css'
})

export class UpdateCommentComponent {

   updateForm : FormGroup;
   comment: any;

   commentService = inject(CommentsService);
   router = inject(Router);

   constructor(private route: ActivatedRoute) {
    this.updateForm = new FormGroup({
    id: new FormControl(),
        body: new FormControl(),
      });
    }

     ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.comment = {
          id: params['id'],
          body: params['body'],
          postId: params['postId'],
          userId: params['userId'],
        };
      });
    }

    submit() {
      
      let comment : CommentRequest = {
        id: this.comment.id,
        userId: this.comment.userId,
        body: this.updateForm.value.body,
        postId: this.comment.postId
      }

      this.commentService.updateComment(comment).subscribe({
        next: (value) => {
          if(value.id) {
            alert(`A bejegyzés modósítása sikeres volt id: ${value.id}`);
            this.router.navigate(['comments']);
          }
        },
        error: (error) => { 
          alert(`A bejegyzés modósítása sikertelen: ${error}`);
        },
        complete: () => {

        }
      });
    }
}


