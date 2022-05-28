import { Userplant } from 'src/app/models/userplant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../models/todo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private url = environment.baseUrl + 'api/todos';


  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  public index() {
    return this.http
      .get<Todo[]>(this.url, this.getHttpOptions())

      .pipe(
        catchError((err: any) => {
          return throwError('Check this- KABOOM!');
        })
      );
  }

  public create(todo: Todo, userPlantId : number) {
    console.log(todo, userPlantId);

    return this.http
      .post<Todo>(this.url + "/" + userPlantId,todo, this.getHttpOptions())

      .pipe(
        catchError((err: any) => {
          return throwError('Check this- KABOOM!');
        })
      );
  }

  public show(id: number) {
    return this.http.get<Todo>(this.url + '/' + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        return throwError('Check this- KABOOM!');
      })
    );
  }
}
