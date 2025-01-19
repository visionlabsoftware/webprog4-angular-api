import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DUMMYJSON_API_BASE_URL } from '../constants'
import { Todos } from '../models/todos.model';
import { map, Observable } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  private readonly TODOS_URL = '/todos';
  private readonly ADD_URL = '/add';
  private readonly CONTENT_TYPE = {'Content-Type' : 'application/json'};
  
  httpClient = inject(HttpClient);

  constructor() { }

  // GET Todo
  getTodo(todo : Todo) :Observable<Todo> {
    return this.httpClient.get<Todo>(`${DUMMYJSON_API_BASE_URL}${this.TODOS_URL}/${todo.id}`);
  }


  // GET Todos
  getTodos(limit: number = 30, skip: number = 0) : Observable<Todos> {
    return this.httpClient.get<Todos>(`${DUMMYJSON_API_BASE_URL}${this.TODOS_URL}?limit=${limit}&skip=${skip}`);
  }

  // CREATE Todo
  createTodo(todo : Todo) :Observable<Todo> {

    const body = JSON.stringify({
      userId: todo.userId,
      todo: todo.todo,
      completed: todo.completed
    });
    
    return this.httpClient.post<Todo>(`${DUMMYJSON_API_BASE_URL}${this.TODOS_URL}${this.ADD_URL}`,body, {headers: this.CONTENT_TYPE});
  }

    // UPDATE Todo
    updateTodo(todo : Todo) :Observable<Todo> {

      const body = JSON.stringify({
        userId: todo.userId,
        todo: todo.todo,
        completed: todo.completed
      });
  
      return this.httpClient.patch<Todo>(`${DUMMYJSON_API_BASE_URL}${this.TODOS_URL}/${todo.id}`,body, {headers: this.CONTENT_TYPE});
    }

  //DELETE Post
  deleteTodo(todo : Todo) : Observable<boolean> {
    return this.httpClient.delete<{isDeleted: boolean, deletedOn : Date}>(`${DUMMYJSON_API_BASE_URL}${this.TODOS_URL}/${todo.id}`)
    .pipe(
      map((value) => {
        return value.isDeleted;
      })
    );
  }
}
