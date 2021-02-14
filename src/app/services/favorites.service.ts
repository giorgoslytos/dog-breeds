import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DogImageState } from '../interfaces/DogImageState.interface';
import { DogInfo } from '../interfaces/DogInfo.interface';
import { DogInfoState } from '../interfaces/DogInfoState.interface';
import { DogsAllInfo } from '../interfaces/DogsAllInfo.interface';
import { ContentState } from '../types/ContentState';
import { exportTitleFromURL } from '../utils/exportTitleFromURL';
import { DogApiService } from './dog-api.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  dogsAllArrChange: EventEmitter<DogsAllInfo[]> = new EventEmitter();
  public cookiesArr: Array<string> = [];
  dogsAllArr: DogsAllInfo[] | undefined;

  constructor(
    private cookie: CookieService,
    private apiService: DogApiService
  ) {}

  initializeDogsAllArr() {
    console.log('initialize');
    if (this.cookiesArr.length === 0) {
      this.fetchFavoritesCookieArr();
    }
    this.dogsAllArr = this.cookiesArr.map((dogLink: string) => {
      const title: string = exportTitleFromURL(dogLink);
      const dogImageState = from([
        {
          state: ContentState.LOADED,
          item: { message: dogLink, status: 'success' },
          title,
        },
      ]).pipe(
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
      const dogInfoState = this.apiService.getDogInfo(title.split(' ')[0]).pipe(
        map((item: DogInfo[]) => ({
          state: ContentState.LOADED,
          item:
            item.filter(
              (dog) =>
                dog.breedName ===
                title.split(' ').reverse().join(' ').toLowerCase()
            )[0] ||
            item.filter(
              (dog) => dog.breedName === title.split(' ')[0].toLowerCase()
            )[0] ||
            item.filter(
              (dog) => dog.dogInfo.breedGroup !== 'mixed breed dogs'
            )[0] ||
            item[0],
        })),
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
      return {
        dogImageState,
        dogInfoState,
      };
    });
    return this.dogsAllArr;
  }

  fetchFavoritesCookieArr() {
    if (this.cookie.check('favorite')) {
      console.log('checked');
      this.cookiesArr = JSON.parse(this.cookie.get('favorite'));
    }
  }

  addFavorite(imgUrl: string) {
    this.cookiesArr.push(imgUrl);
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
    return true;
  }
  removeFavorite(imgUrl: string) {
    this.cookiesArr = this.cookiesArr.filter((x) => x !== imgUrl);
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
    this.dogsAllArr = this.dogsAllArr?.filter((x) => {
      let result;
      x.dogImageState.subscribe(
        (dogImage) => (result = dogImage.item?.message !== imgUrl)
      );
      return result;
    });
    setTimeout(() => {
      this.dogsAllArrChange.emit(this.dogsAllArr);
    }, 300);
    return false;
  }
}
