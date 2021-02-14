import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogsAllInfo } from 'src/app/interfaces/DogsAllInfo.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  dogsAllArr: DogsAllInfo[] | undefined;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.dogsAllArr = this.favoritesService.initializeDogsAllArr();
    this.favoritesService.dogsAllArrChange.subscribe(
      (arr: DogsAllInfo[]) => (this.dogsAllArr = arr)
    );
  }
}
