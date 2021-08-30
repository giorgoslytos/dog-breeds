import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CombinedDogInfoState$ } from '../interfaces/CombinedDogInfoState.interface';
import { Dog } from '../interfaces/Dog.interface';
import { DogApiService } from './dog-api.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  dogsChange: EventEmitter<Dog[]> = new EventEmitter();
  public cookiesArr: Array<Dog> = [];
  dogsAllArr: CombinedDogInfoState$[] | undefined;
  favorites: Dog[] = [];
  constructor(
    private cookie: CookieService,
    private apiService: DogApiService
  ) {}

  initializeDogsAllArr() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  fetchFavorites(): Dog[] {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  addFavorite(dog: Dog) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.find((x: Dog) => x.image === dog.image)) {
      return false;
    }
    localStorage.setItem('favorites', JSON.stringify([...favorites, dog]));
    return true;
  }

  removeFavorite(dog: Dog) {
    // this.cookiesArr = this.cookiesArr.filter((x) => x.image !== dog.image);
    // this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
    if (!dog) {
      return false;
    }
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter((x: Dog) => x.image !== dog.image);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    return true;
  }
}
