import { Userplant } from './../models/userplant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserplantService {

  private baseUrl = environment.baseUrl + 'api/userPlants';
  private url2 = this.baseUrl + 'api/search';

  constructor(private http: HttpClient, private auth: AuthService) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.auth.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  public indexTopics() {
    return this.http.get<Userplant[]>(this.baseUrl).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => {
          new Error('index posts has an error- KABOOM!');
        });
      })
    );
  }
  public indexUserPlants() {
    return this.http.get<Userplant[]>(this.baseUrl).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => {
          new Error('index user plants has an error- KABOOM!');
        });
      })

    );
  }

  public create(newUserPlant: Userplant) {
    return this.http.post<Userplant>(this.baseUrl, newUserPlant, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError('UserPlantService: error creating Plant');
      })
    );
  }
  public update(updateUserPlant: Userplant, id : number) {
    const httpOptions = {
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Basic ' + this.auth.getCredentials(),
      },
    };
    return this.http
      .put<Userplant>(this.url2 + "/" + id, updateUserPlant, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('PlantService: error creating Plant');
        })
      );
  }
public deactivate(deactivate: Userplant, id : number) {
  return this.http
      .put<Userplant>(this.baseUrl + "/deactivate/" + id, deactivate, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError('PlantService: error creating Plant');
        })
      );
}
show(id: number) {
  return this.http.get<Userplant>(this.baseUrl + "/" + id, this.getHttpOptions()).pipe(
    catchError((err: any) => {
      console.log(err);
      return throwError('PlantService: error retrieving plant list');
    })
  );
}

}
