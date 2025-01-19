import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../services/todos.service';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-update-todo',
  imports: [ReactiveFormsModule],
  templateUrl: './update-todo.component.html',
  styleUrl: './update-todo.component.css'
})

export class UpdateTodoComponent {

   updateForm : FormGroup;
   todo: any;

   todoService = inject(TodosService);
   router = inject(Router);

   constructor(private route: ActivatedRoute) {
    this.updateForm = new FormGroup({
    todo: new FormControl(),
    completed: new FormControl(),
    });
  }

     ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.todo = {
          id: params['id'],
          todo: params['todo'],
          completed: params['completed'] === 'true' || false,
          userId: params['userId'],
        };
      });
    }

    submit() {
      
      let todo : Todo = {
        id: this.todo.id,
        userId: this.todo.userId,
        todo: this.updateForm.value.todo,
        completed: this.todo.completed
      }
      
      this.todoService.updateTodo(todo).subscribe({
        next: (value) => {
          if(value.id) {
            alert(`A bejegyzés modósítása sikeres volt id: ${value.id}`);
            this.router.navigate(['todos']);
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


