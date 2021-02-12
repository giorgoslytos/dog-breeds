import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogApiService } from 'src/app/services/dog-api.service';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  cookiesArr: string[] = [];
  dogImageState: Observable<DogImageState> | undefined;
  dogInfoState: Observable<DogInfoState> | undefined;
  dogsAllArr: any;

  constructor(
    private cookie: CookieService,
    private apiService: DogApiService
  ) {}

  ngOnInit() {
    if (this.cookie.check('favorite')) {
      this.cookiesArr = JSON.parse(this.cookie.get('favorite'));
    }
    this.dogsAllArr = this.cookiesArr.map((dogLink: string) => {
      const title: string = exportTitleFromURL(dogLink).split(' ')[0];
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
      const dogInfoState = this.apiService.getDogInfo(title).pipe(
        map((item: DogInfo[]) => ({
          state: ContentState.LOADED,
          item:
            item.filter((dog) => dog.breedName === title.toLowerCase())[0] ||
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
}
