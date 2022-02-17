import { Injectable } from '@angular/core';
import { TokenService } from 'src/app/core/services/token.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private readonly _tokenService: TokenService) {}

  public get() {
    return JSON.parse(this._tokenService.get());
  }
}
