import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { from, Observable, of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogCeoService } from 'src/app/services/dog-ceo.service';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';

@Component({
  selector: 'app-dog-from-url',
  templateUrl: './dog-from-url.component.html',
  styleUrls: ['./dog-from-url.component.scss'],
})
export class DogFromUrlComponent implements OnInit {
  dogLink: string | undefined;
  cookiesArr: string[] = [];
  favorited: boolean = false;
  title: string | undefined;

  ContentState = ContentState;
  // private mockData: string =
  //   'https://images.dog.ceo/breeds/pomeranian/n02112018_3812.jpg';
  dogInfoState: Observable<DogInfoState> | undefined;
  dogImageState: Observable<DogImageState> | undefined;

  constructor(
    private route: ActivatedRoute,
    private apiService: DogCeoService,
    private cookie: CookieService
  ) {
    this.route.params.subscribe((params) => (this.dogLink = atob(params.id)));
  }

  ngOnInit(): void {
    const title: string = exportTitleFromURL(this.dogLink).split(' ')[0];
    this.dogImageState = from([
      {
        state: ContentState.LOADED,
        item: { message: this.dogLink, status: 'success' },
        title,
      },
    ]).pipe(
      startWith({ state: ContentState.LOADING }),
      catchError((e) => of({ state: ContentState.ERR, error: e.message }))
    );
    this.dogInfoState = this.apiService.getDogInfo(title).pipe(
      map((item: DogInfo[]) => ({
        state: ContentState.LOADED,
        item: item[0],
      })),
      startWith({ state: ContentState.LOADING }),
      catchError((e) => of({ state: ContentState.ERR, error: e.message }))
    );
  }
  handleFavorite() {
    if (!this.favorited) {
      this.cookiesArr.push(this.dogLink || '');
      this.favorited = true;
    } else {
      this.cookiesArr = this.cookiesArr.filter((x) => x !== this.dogLink);
      this.favorited = false;
    }
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
  }
}
