import { Component, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  shareReplay,
  startWith,
} from 'rxjs/operators';
import { ContentState } from 'src/app/types/ContentState';
import { ApiDogBreedsInfo } from 'src/app/interfaces/ApiDogBreedsInfo.interface';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { ApiDogBreedsInfoState } from 'src/app/interfaces/ApiDogBreedsInfoState.interface';
import { DogCeoImageState } from 'src/app/interfaces/DogCeoImageState.interface';
import { DogApiService } from 'src/app/services/dog-api.service';
import { Dog } from 'src/app/interfaces/Dog.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public dogImageState$: Observable<DogCeoImageState> = new Observable<{
    state: ContentState.LOADING;
  }>();

  public dogState$: Observable<Dog> = new Observable();
  public dog: Dog = { state: ContentState.LOADING };

  public dogInfoState$: Observable<ApiDogBreedsInfoState> = new Observable<{
    state: ContentState.LOADING;
  }>();
  public dogImageState: DogCeoImageState = { state: ContentState.LOADING };
  public dogInfoState: ApiDogBreedsInfoState = { state: ContentState.LOADING };

  private subscriptions: Subscription = new Subscription();

  constructor(private apiService: DogApiService) {}

  ngOnInit(): void {
    this.dogState$ = this.getDogFromApi();
    this.subscriptions.add(this.dogState$.subscribe((dog) => (this.dog = dog)));
  }

  getDogFromApi() {
    return this.apiService.getRandomDog().pipe(
      map((dogImage) => ({
        title: exportTitleFromURL(dogImage?.message),
        image: dogImage.message,
      })),
      mergeMap((dogImage) =>
        this.apiService.getDogInfo(dogImage.title?.split(' ')[0] || '').pipe(
          map((dogInfo: ApiDogBreedsInfo[]) => ({
            title: dogImage.title,
            image: dogImage.image,
            dogInfo: {
              info:
                dogInfo.filter(
                  (dog) =>
                    dog.breedName ===
                    dogImage?.title.split(' ').reverse().join(' ').toLowerCase()
                )[0] ||
                dogInfo.filter(
                  (dog) =>
                    dog.breedName ===
                    dogImage?.title.split(' ')[0].toLowerCase()
                )[0] ||
                dogInfo.filter(
                  (dog) => dog.dogInfo.breedGroup !== 'mixed breed dogs'
                )[0] ||
                dogInfo[0],
              state: ContentState.LOADED,
            },
            state: ContentState.LOADED,
          })),
          catchError(() => {
            return of({
              title: dogImage.title,
              image: dogImage.image,
              dogInfo: { state: ContentState.ERR },
              state: ContentState.LOADED,
            });
          })
        )
      ),
      shareReplay(),
      startWith({ state: ContentState.LOADING }),
      catchError((e) => of({ state: ContentState.ERR, error: e.message }))
    );
  }

  getAnotherDog() {
    console.log('getAnotherDog');
    this.subscriptions.add(
      this.getDogFromApi().subscribe(
        (dog) => (this.dog = dog),
        (error) => console.log(error),
        () => console.log('complete')
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
