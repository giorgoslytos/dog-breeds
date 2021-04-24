import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { ContentState } from 'src/app/types/ContentState';
import { DogCeoImage } from 'src/app/interfaces/DogCeoImage.interface';
import { ApiDogBreedsInfo } from 'src/app/interfaces/ApiDogBreedsInfo.interface';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { ApiDogBreedsInfoState } from 'src/app/interfaces/ApiDogBreedsInfoState.interface';
import { DogCeoImageState } from 'src/app/interfaces/DogCeoImageState.interface';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public dogImageState$: Observable<DogCeoImageState> | undefined;
  public dogInfoState$: Observable<ApiDogBreedsInfoState> | undefined;

  constructor(private apiService: DogApiService) {}

  ngOnInit(): void {
    this.getDogFromApi();
  }

  getDogFromApi() {
    this.dogImageState$ = this.apiService.getRandomDog().pipe(
      map(
        (dogImage: DogCeoImage) => (
          (this.dogInfoState$ = this.apiService
            .getDogInfo(exportTitleFromURL(dogImage.message).split(' ')[0])
            .pipe(
              map((dogInfo: ApiDogBreedsInfo[]) => ({
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
