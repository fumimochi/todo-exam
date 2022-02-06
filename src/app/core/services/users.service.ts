import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';
import { AuthModels } from 'src/app/modules/auth/models';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private readonly _baseApiRoute = 'http://localhost:3000/users';

    constructor(private readonly _http: HttpClient) { }

    public getAllUsers(): Observable<AuthModels.User.IUser[]> {
        return this._http.get<AuthModels.User.IUser[]>(this._baseApiRoute);
    }

    public putUser(id: number, user: AuthModels.User.IUser) {
      return this._http.put(`${this._baseApiRoute}/${id}`, user)
    }

    public getUserById(id: number) {
      return this._http.get(`${this._baseApiRoute}/${id}`);
    }

    public getUser(dto: Partial<AuthModels.User.IUser>): Observable<AuthModels.User.IUser> {
        let params = new HttpParams();
    
        for (const key in dto) {
          params = params.append(key, dto[key]);
        }
    
        return this._http.get<AuthModels.User.IUser[]>(this._baseApiRoute, { params }).pipe(
          map((users: AuthModels.User.IUser[]) => {
            if (users?.length) {
              return users[0];
            }
    
            throw new Error('404 => User not found!');
          })
        );
      }
}