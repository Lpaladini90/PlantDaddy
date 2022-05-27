import { AuthService } from 'src/app/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Plant } from '../models/plant';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantService {
  private url = environment.baseUrl + 'api/plants';

  constructor(private http: HttpClient, private auth: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }
  index() {
    return this.http.get<Plant[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('Create post has an error- kaboom');
      })
    );
  }
  create(newPlant: Plant) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + this.auth.getCredentials(),
      },
    };
    return this.http.post<Plant>(this.url, newPlant, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('PlantService: error creating Plant');
      })
    );
  }
  update(updatePlant: Plant) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + this.auth.getCredentials(),
      },
    };
    return this.http
      .put<Plant>(this.url + updatePlant.id, updatePlant, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('PlantService: error creating Plant');
        })
      );
  }
  deactivate(deactivate: Plant) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + this.auth.getCredentials(),
      },
    };
    return this.http
      .put<Plant>(this.url + deactivate.id, deactivate, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('PlantService: error creating Plant');
        })
      );
  }
  show(id: number) {
    return this.http.get<Plant>(this.url + id, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('PlantService: error retrieving plant list');
      })
    );
  }
}