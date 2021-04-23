import { Component, OnInit } from '@angular/core';
import { CombinedDogInfoState } from 'src/app/interfaces/CombinedDogInfoState.interface';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  dogsAllArr: CombinedDogInfoState[] | undefined;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.dogsAllArr = this.favoritesService.initializeDogsAllArr();
    this.favoritesService.dogsAllArrChange.subscribe(
      (arr: CombinedDogInfoState[]) => (this.dogsAllArr = arr)
    );
  }
}
