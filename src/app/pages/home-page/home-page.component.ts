import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ContentState } from 'src/app/types/ContentState';
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
    this.getDogFromApi();
    this.subscriptions.add(this.dogState$.subscribe((dog) => (this.dog = dog)));
  }

  getDogFromApi() {
    this.subscriptions.add(
      this.apiService.getRandomDogSpecs().subscribe((dog) => (this.dog = dog))
    );
  }

  getAnotherDog() {
    console.log('getAnotherDog');
    this.getDogFromApi();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
