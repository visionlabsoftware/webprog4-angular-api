import { Todo } from "./todo.model";

export interface Todos{
    limit : number;
    todos : Todo[];
    skip : number;
    total : number;
}