import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  startWith,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';
import { ContentState } from 'src/app/models/ContentState';
import { DogImage } from 'src/app/models/DogImage.interface';
import { DogInfo } from 'src/app/models/DogInfo.interface';
import { DogCeoService } from 'src/app/services/dog-ceo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  randomImage: string = '';
  title: string = '';
  favorited: boolean = false;
  dogInfo: DogInfo | undefined;
  dogInfoError: string = '';

  readonly ContentState = ContentState;

  // readonly page$ = this.apiService.getRandomDog().pipe(
  //   take(1),
  //   switchMap((dogImage: DogImage, index: number) => {
  //     this.randomImage = dogImage.message;
  //     this.title = dogImage.message
  //       .slice(30)
  //       .replace(/\/[\w,.]+/, '')
  //       .split('-')
  //       .map((dogImage) => dogImage[0].toUpperCase() + dogImage.slice(1))
  //       .join(' ');
  //     return this.apiService.getDogInfo(this.title.split(' ')[0]).pipe(
  //       take(1),
  //       map((item) => ({ state: ContentState.LOADED, item })),
  //       startWith({ state: ContentState.LOADING }),
  //       catchError((e) => of({ state: ContentState.ERR, error: e.message }))
  //     );
  //   })
  // );

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogCeoService) {}

  ngOnInit(): void {
    this.apiService
      .getRandomDog()
      .pipe(
        take(1),
        switchMap((dogImage: DogImage, index: number) => {
          this.randomImage = dogImage.message;
          this.title = dogImage.message
            .slice(30)
            .replace(/\/[\w,.]+/, '')
            .split('-')
            .map((dogImage) => dogImage[0].toUpperCase() + dogImage.slice(1))
            .join(' ');
          return this.apiService
            .getDogInfo(this.title.split(' ')[0])
            .pipe(take(1));
        })
      )
      .subscribe(
        (dogInfoArr) => (this.dogInfo = dogInfoArr[0]),
        (err) => (this.dogInfoError = err.error.error)
      );
  }
}
