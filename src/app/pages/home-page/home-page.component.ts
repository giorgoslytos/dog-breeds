import { Component, OnInit } from '@angular/core';
import { of, Subject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ContentState } from 'src/app/types/ContentState';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogCeoService } from 'src/app/services/dog-ceo.service';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';

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
  dogImageState: any;
  dogInfoState: any;

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogCeoService) {}

  ngOnInit(): void {
    this.dogImageState = this.apiService.getRandomDog().pipe(
      map(
        (item: DogImage) => (
          (this.dogInfoState = this.apiService
            .getDogInfo(exportTitleFromURL(item.message).split(' ')[0])
            .pipe(
              map((item: DogInfo[]) => ({
                state: ContentState.LOADED,
                item: item[0],
              })),
              startWith({ state: ContentState.LOADING }),
              catchError((e) =>
                of({ state: ContentState.ERR, error: e.message })
              )
            )),
          {
            state: ContentState.LOADED,
            item,
            title: exportTitleFromURL(item.message),
          }
        )
      ),
      startWith({ state: ContentState.LOADING, title: '' }),
      catchError((e) => of({ state: ContentState.ERR, error: e.message }))
    );
  }
}
