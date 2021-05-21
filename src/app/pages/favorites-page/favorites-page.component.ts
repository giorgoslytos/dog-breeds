import { Component, OnInit } from '@angular/core';
import { CombinedDogInfoState$ } from 'src/app/interfaces/CombinedDogInfoState.interface';
import { Dog } from 'src/app/interfaces/Dog.interface';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.scss'],
})
export class FavoritesPageComponent implements OnInit {
  public dogs: Dog[] | undefined;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.dogs = this.favoritesService.fetchFavorites();
  }
  dogsChanged() {
    setTimeout(() => {
      this.dogs = this.favoritesService.fetchFavorites();
    }, 300);
  }
}
