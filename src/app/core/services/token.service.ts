import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly _key = 'token';

  private _userFields = [
    'email',
    'nickname',
    'password',
    'todos',
    'id',
    'role',
  ];
  private _token: string;

  constructor() {
    this.init();
  }

  public get(): string {
    return this._token;
  }

  public remove() {
    window.localStorage.removeItem(this._key);
    this._token = null;
  }

  public set(token) {
    this._token = token;
    window.localStorage.setItem(this._key, token);
  }

  /* PRIVATE HELPERS */

  private init() {
    const token = window.localStorage.getItem(this._key);

    if (this.validate(token)) {
      this.set(token);
    }
  }

  private validate(token: string): boolean {
    if (!token) {
      return false;
    }

    const tokenData = JSON.parse(token);

    let keyArr = Object.keys(tokenData);

    for (let field of this._userFields) {
      if (!keyArr.includes(field)) {
        return false;
      }
    }

    return true;
  }
}
