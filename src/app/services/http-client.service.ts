import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../domain/Todo';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  username = 'myjavablog';
  password = 'secure';

  getTodos() {
  
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.httpClient.get<Todo[]>('http://localhost:8081/api/todos', { headers });
  }


  public deleteTodo(todo) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.httpClient.delete<Todo>("http://localhost:8081/api/todo" + "/" + todo.id, { headers });
  }

  public createTodo(todo) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(this.username + ':' + this.password) });
    return this.httpClient.post<Todo>("http://localhost:8081/api/todo", todo, { headers });
  }
}
