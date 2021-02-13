import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { from, Observable, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  reduce,
  scan,
  startWith,
} from 'rxjs/operators';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogApiService } from 'src/app/services/dog-api.service';
import { FavoritesService } from 'src/app/services/favorites.service';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  cookiesArr: string[] | undefined;
  dogImageState: Observable<DogImageState> | undefined;
  dogInfoState: Observable<DogInfoState> | undefined;
  dogsAllArr:
    | {
        dogImageState: Observable<DogImageState>;
        dogInfoState: Observable<DogInfoState>;
      }[]
    | undefined;

  constructor(
    private apiService: DogApiService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit() {
    if (!this.cookiesArr) {
      this.favoritesService.fetchFavoritesCookieArr();
    }
    this.cookiesArr = this.favoritesService.cookiesArr;
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
  }

  removeFromFavorites(imgUrl: string) {
    // timeout is not need it. It just adds allows the heart of favorited
    // to be emptied, thus offering a better UX
    setTimeout(() => {
      this.dogsAllArr = this.dogsAllArr?.filter((x) => {
        let result;
        x.dogImageState.subscribe(
          (dogImage) => (result = dogImage.item?.message !== imgUrl)
        );
        return result;
      });
    }, 200);
  }
}
