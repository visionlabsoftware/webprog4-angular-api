import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TodosService } from '../services/todos.service';
import { Router } from '@angular/router';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-add-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {

    addForm : FormGroup;

    constructor() {
      this.addForm = new FormGroup({
        todo: new FormControl()
      });
    }

     todoService = inject(TodosService);
     router = inject(Router);

     submit() {
         
         let todo : Todo = {
           id: undefined,
           userId: 1,
           completed: false,
           todo: this.addForm.value.todo
         }
     
         this.todoService.createTodo(todo).subscribe({
           next: (value) => {
             if(value.id) {
               alert(`A bejegyzés felvétele sikeres id: ${value.id}`);
               this.router.navigate(['todos']);
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
