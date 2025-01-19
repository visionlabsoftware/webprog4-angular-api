import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';
import { Comment } from '../models/comment.model';
import { CommentRequest } from '../models/commentRequest.model';

@Component({
  selector: 'app-add-comment',
  imports: [ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {

    addForm : FormGroup;

    constructor() {
      this.addForm = new FormGroup({
        body: new FormControl()
      });
    }

     commentService = inject(CommentsService);
     router = inject(Router);

     submit() {
         
         let comment : CommentRequest = {
           id: undefined,
           userId: 1,
           postId: 1,
           body: this.addForm.value.body
         }
     
         this.commentService.createComment(comment).subscribe({
           next: (value) => {
             if(value.id) {
               alert(`A bejegyzés felvétele sikeres id: ${value.id}`);
               this.router.navigate(['comments']);
             }
           },
           error: (error) => { 
             alert(`A bejegyzés felvétele sikertelen: ${error}`);
           },
           complete: () => {
     
           }
         });
       }
    



}
