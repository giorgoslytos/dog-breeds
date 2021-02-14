import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ContentState } from 'src/app/types/ContentState';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogApiService } from 'src/app/services/dog-api.service';

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
  dogImageState: Observable<DogImageState> | undefined;
  dogInfoState: Observable<DogInfoState> | undefined;

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogApiService) {}

  ngOnInit(): void {
    this.getDogFromApi();
  }

  getDogFromApi() {
    this.dogImageState = this.apiService.getRandomDog().pipe(
      map(
        (dogImage: DogImage) => (
          (this.dogInfoState = this.apiService
            .getDogInfo(exportTitleFromURL(dogImage.message).split(' ')[0])
            .pipe(
              map((dogInfo: DogInfo[]) => ({
                state: ContentState.LOADED,
                item:
                  dogInfo.filter(
                    (dog) =>
                      dog.breedName ===
                      exportTitleFromURL(dogImage.message)
                        .split(' ')
                        .reverse()
                        .join(' ')
                        .toLowerCase()
                  )[0] ||
                  dogInfo.filter(
                    (dog) =>
                      dog.breedName ===
                      exportTitleFromURL(dogImage.message)
                        .split(' ')[0]
                        .toLowerCase()
                  )[0] ||
                  dogInfo.filter(
                    (dog) => dog.dogInfo.breedGroup !== 'mixed breed dogs'
                  )[0] ||
                  dogInfo[0],
              })),
              startWith({ state: ContentState.LOADING }),
              catchError((e) =>
                of({ state: ContentState.ERR, error: e.message })
              )
            )),
          {
            state: ContentState.LOADED,
            item: dogImage,
            title: exportTitleFromURL(dogImage.message),
          }
        )
      ),
      startWith({ state: ContentState.LOADING }),
      catchError((e) => of({ state: ContentState.ERR, error: e.message }))
    );
  }
  getAnotherDog() {
    this.getDogFromApi();
  }
}
