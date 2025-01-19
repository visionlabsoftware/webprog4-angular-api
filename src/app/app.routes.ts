import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './post-list/post-list.component';
import { ErrorComponent } from './error/error.component';
import { AddPostComponent } from './add-post/add-post.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { UpdateCommentComponent } from './update-comment/update-comment.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';

export const routes: Routes = [
    
    {path: '', component: HomeComponent},
    {path: 'posts', component: PostListComponent},
    {path: 'posts/add', component: AddPostComponent},
    {path: 'posts/update', component: UpdatePostComponent},
    {path: 'comments', component: CommentListComponent},
    {path: 'comments/add', component: AddCommentComponent},
    {path: 'comments/update', component: UpdateCommentComponent},
    {path: 'todos', component: TodoListComponent},
    {path: 'todos/add', component: AddTodoComponent},
    {path: 'todos/update', component: UpdateTodoComponent},
 
    {path: '**', component: ErrorComponent}
];
