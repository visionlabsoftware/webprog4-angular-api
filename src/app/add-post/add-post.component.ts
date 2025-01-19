import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css'
})
export class AddPostComponent {

  addForm : FormGroup;

  constructor() {
    this.addForm = new FormGroup({
      title: new FormControl(),
      body: new FormControl()
    });
  }

  postService = inject(PostsService);
  router = inject(Router);


  submit() {
    
    let post : Post = {
      id: undefined,
      reactions : {
        dislikes: 0,
        likes: 0,
      },
      tags: [],
      userId: 1,
      views: 0,
      title : this.addForm.value.title,
      body: this.addForm.value.body
    }

    this.postService.createPost(post).subscribe({
      next: (value) => {
        if(value.id) {
          alert(`A bejegyzés felvétele sikeres id: ${value.id}`);
          this.router.navigate(['posts']);
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
