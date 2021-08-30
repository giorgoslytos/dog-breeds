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
    // setTimeout(() => {
    // this.dogs = this.favoritesService.fetchFavorites();
    // }, 300);
  }

  dogDeleted(i: number): void {
    setTimeout(() => {
      if (this.dogs) {
        this.dogs = [...this.dogs?.slice(0, i), ...this.dogs?.slice(i + 1)];
      }
      // if (this.dogs?.length) {
      //   delete this.dogs[i];
      // }
    }, 300);
  }
}
