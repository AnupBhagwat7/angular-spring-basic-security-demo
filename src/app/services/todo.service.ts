import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';
import { Todo } from './../domain/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  endpoint = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  // To Get List Of Todos
  getTodoList(): Observable<any> {
    return this.http.get(this.endpoint + '/todos')
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  // HttpClient API get() method => Fetch Todo
  getTodo(id): Observable<Todo> {
    return this.http.get<Todo>(this.endpoint + '/todos/' + id)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Create Todo
  createTodo(todo): Observable<Todo> {
    return this.http.post<Todo>(this.endpoint + '/todo', JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => Update Todo
  updateTodo(id, todo): Observable<Todo> {
    return this.http.put<Todo>(this.endpoint + '/todo' , JSON.stringify(todo), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API delete() method => Delete Todo
  deleteTodo(id):Observable<Todo[]> {
    console.log("Delete id "+ id);
    return this.http.delete<Todo[]>(this.endpoint+ '/todo/' + id);

  }

  // Error handling 
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
