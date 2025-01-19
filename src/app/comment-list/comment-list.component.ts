import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comments } from '../models/comments.model';
import { Comment } from '../models/comment.model';
import { Router, RouterModule } from '@angular/router';
import { CommentsService } from '../services/comments.service';
import { LoadingComponent } from '../loading/loading.component';

@Component({
  selector: 'app-post-list',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent implements OnInit {

  commentsService = inject(CommentsService);
  data? : Comments;

  currentPage : number = 1;
  startIndex : number = 0;

  limits = [10, 20, 50];
  selectedValue : number = 10;

  isLoading = false;

  router = inject(Router);

  ngOnInit(): void {
    this.loadData(this.selectedValue, this.startIndex);
  }

  loadData(limit : number = 10, skip : number = 0) : void {

    if (this.isLoading) { return; }
    this.isLoading = true;

    this.commentsService.getComments(limit, skip).subscribe({
        next: (value) => {
          this.data = value;
        },
        error: (error) => { 
          this.isLoading = false;
          console.log(error);
        },
        complete: () => {
          this.isLoading = false;
        },  
      }
    )
  }

  get totalPages() {
    return Math.ceil((this.data?.total || 0) / this.selectedValue);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage ++;
      this.startIndex = this.startIndex + this.selectedValue;
      this.loadData(this.selectedValue, this.startIndex);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage --;
      this.startIndex = this.startIndex - this.selectedValue;
      this.loadData(this.selectedValue, this.startIndex);
    }
  }

  onValueChange(event: Event): void {
    this.startIndex = 0;
    this.currentPage = 1;
    const target = event.target as HTMLSelectElement;
    this.selectedValue = parseInt(target.value, 10);
    this.loadData(this.selectedValue, this.startIndex);
  }

  update(item: Comment): void {
    this.router.navigate(['comments/update'], {
      queryParams: {
        id: item.id,
        postId: item.postId,
        body: item.body,
        likes: item.likes,
        userId: item.user.id
      },
    });
  }

  delete(item : Comment) {
    this.commentsService.deleteComment(item).subscribe(
      {
        error: (error) => {console.log(error);},
        next: (result) => {
          if(result) {
            alert("Sikeres a törlés!");
            this.loadData(this.selectedValue, this.startIndex);
          }
          else {   
            alert("A törlés sikertelen!");
          }
        },
      }
    )
  }
}
