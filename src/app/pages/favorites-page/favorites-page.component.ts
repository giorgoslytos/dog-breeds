import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogCeoService } from 'src/app/services/dog-ceo.service';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  cookiesArr: string[] = [];
  // dogInfoState: Observable<DogInfoState[]> | undefined;
  dogInfoState: Observable<any>[] = [];

  constructor(
    private cookie: CookieService,
    private apiService: DogCeoService
  ) {}

  ngOnInit() {
    if (this.cookie.check('favorite')) {
      this.cookiesArr = JSON.parse(this.cookie.get('favorite'));
    }
    this.cookiesArr.forEach((imageURL) =>
      this.apiService
        .getDogInfo(exportTitleFromURL(imageURL).split(' ')[0])
        .pipe(
          map((item: DogInfo[]) => ({
            state: ContentState.LOADED,
            item: item[0],
          })),
          startWith({ state: ContentState.LOADING }),
          catchError((e) => of({ state: ContentState.ERR, error: e.message }))
        )
        .subscribe((dogInfo) => console.log(dogInfo))
    );
    console.log(this.dogInfoState);
  }
}
