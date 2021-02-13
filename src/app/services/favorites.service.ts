import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DogApiService } from './dog-api.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  public cookiesArr: Array<string> = [];

  constructor(
    private cookie: CookieService,
    private apiService: DogApiService
  ) {}

  fetchFavoritesCookieArr() {
    if (this.cookie.check('favorite')) {
      this.cookiesArr = JSON.parse(this.cookie.get('favorite'));
    }
  }

  addFavorite(dogImage: string) {
    this.cookiesArr.push(dogImage);
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
    return true;
  }
  removeFavorite(dogImage: string) {
    this.cookiesArr = this.cookiesArr.filter((x) => x !== dogImage);
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
    return false;
  }
}
