import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-update-post',
  imports: [ReactiveFormsModule],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.css'
})

export class UpdatePostComponent {

   updateForm : FormGroup;
   post: any;

   postService = inject(PostsService);
   router = inject(Router);

   constructor(private route: ActivatedRoute) {
       this.updateForm = new FormGroup({
         title: new FormControl(),
         body: new FormControl()
       });
     }

     ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.post = {
          id: params['id'],
          title: params['title'],
          userId: params['userId'],
          body: params['body'],
          reactions: params['reactions']
          ? JSON.parse(params['reactions'])
          : { likes: 0, dislikes: 0 },
          tags: params['tags'],
          views: params['views']
        };
      });
    }

    submit() {

      let post : Post = {
            id: this.post.id,
            reactions: {
              likes: this.post.reactions.likes,
              dislikes: this.post.reactions.dislikes,
            },
            tags: this.post.tags,
            userId: this.post.userId,
            views: this.post.views,
            title : this.updateForm.value.title,
            body: this.updateForm.value.body
          }

          this.postService.updatePost(post).subscribe({
            next: (value) => {
              if(value.id) {
                alert(`A bejegyzés modósítása sikeres volt id: ${value.id}`);
                this.router.navigate(['posts']);
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


