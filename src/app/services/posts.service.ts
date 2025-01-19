import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DUMMYJSON_API_BASE_URL } from '../constants'
import { Posts } from '../models/posts.model';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private readonly POSTS_URL = '/posts';
  private readonly ADD_URL = '/add';
  private readonly CONTENT_TYPE = {'Content-Type' : 'application/json'};

  httpClient = inject(HttpClient);

  constructor() { }

  // GET Post
  getPost(post : Post) :Observable<Post> {
    return this.httpClient.get<Post>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${post.id}`);
  }


  // GET Posts
  getPosts(limit: number = 30, skip: number = 0) : Observable<Posts> {
    return this.httpClient.get<Posts>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}?limit=${limit}&skip=${skip}`);
  }

  // CREATE Post
  createPost(post : Post) :Observable<Post> {

    const body = JSON.stringify({
      userId: post.userId,
      title: post.title,
      body: post.body,
      reactions: post.reactions,
      tags: post.tags,
      views: post.views
    });
    
    return this.httpClient.post<Post>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}${this.ADD_URL}`,body, {headers: this.CONTENT_TYPE});
  }

    // UPDATE Post
    updatePost(post : Post) :Observable<Post> {

      const body = JSON.stringify({
        userId: post.userId,
        title: post.title,
        body: post.body,
        reactions: post.reactions,
        tags: post.tags,
        views: post.views
      });
  
      return this.httpClient.patch<Post>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${post.id}`,body, {headers: this.CONTENT_TYPE});
    }

  //DELETE Post
  deletePost(post : Post) : Observable<boolean> {
    return this.httpClient.delete<{isDeleted: boolean, deletedOn : Date}>(`${DUMMYJSON_API_BASE_URL}${this.POSTS_URL}/${post.id}`)
    .pipe(
      map((value) => {
        return value.isDeleted;
      })
    );
  }

}
