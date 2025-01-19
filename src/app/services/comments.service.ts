import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DUMMYJSON_API_BASE_URL } from '../constants'
import { Comments } from '../models/comments.model';
import { map, Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { CommentRequest } from '../models/commentRequest.model';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private readonly POSTS_URL = '/comments';
  private readonly ADD_URL = '/add';
  private readonly CONTENT_TYPE = {'Content-Type' : 'application/json'};

  httpClient = inject(HttpClient);

  constructor() { }

  // GET Comment
  getComment(comment : Comment) :Observable<Comment> {
    return this.httpClient.get<Comment>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${comment.id}`);
  }


  // GET Comments
  getComments(limit: number = 30, skip: number = 0) : Observable<Comments> {
    return this.httpClient.get<Comments>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}?limit=${limit}&skip=${skip}`);
  }

  // CREATE Comment
  createComment(comment : CommentRequest) :Observable<Comment> {

    const body = JSON.stringify({
      postId: comment.postId,
      body: comment.body,
      userId : comment.userId
    });
    
    return this.httpClient.post<Comment>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}${this.ADD_URL}`,body, {headers: this.CONTENT_TYPE});
  }

    // UPDATE Comment
    updateComment(comment : CommentRequest) :Observable<Comment> {

      const body = JSON.stringify({
        id: comment.id,
        postId: comment.postId,
        body: comment.body,
        userId : comment.userId
      });
  
      return this.httpClient.patch<Comment>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${comment.id}`,body, {headers: this.CONTENT_TYPE});
    }

  //DELETE Comment
  deleteComment(comment : Comment) : Observable<boolean> {
    return this.httpClient.delete<{isDeleted: boolean, deletedOn : Date}>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${comment.id}`)
    .pipe(
      map((value) => {
        return value.isDeleted;
      })
    );
  }

}

