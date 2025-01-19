import { Component, inject, OnInit } from '@angular/core';
import { TodosService } from '../services/todos.service';
import { CommonModule } from '@angular/common';
import { Todos } from '../models/todos.model';
import { Todo } from '../models/todo.model';
import { Router, RouterModule } from '@angular/router';
import { LoadingComponent } from "../loading/loading.component";

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, RouterModule, LoadingComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit  {

postsService = inject(TodosService);
  data? : Todos;

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

    this.postsService.getTodos(limit, skip).subscribe({
        next: (value) => {
          this.data = value;;
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

  update(item: Todo): void {
    this.router.navigate(['todos/update'], {
      queryParams: {
        id: item.id,
        todo: item.todo,
        completed: item.completed,
        userId: item.userId
      },
    });
  }

  delete(item : Todo) {
    this.postsService.deleteTodo(item).subscribe(
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
