import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BreedList } from 'src/app/interfaces/BreedList.interface';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-breeds-page',
  templateUrl: './breeds-page.component.html',
  styleUrls: ['./breeds-page.component.scss'],
})
export class BreedsPageComponent implements OnInit {
  toppings = new FormControl();
  breedList: BreedList | undefined;
  breedListArr: Array<string> = [];
  subBreedListArr: Array<string> = [];
  constructor(private dogApiService: DogApiService) {}

  ngOnInit(): void {
    // this.dogApiService.getBreedList().subscribe((x) => (this.breedsList = x));
    this.dogApiService.getBreedList().subscribe((x) => {
      this.breedList = x;
      this.breedListArr = Object.keys(x.message);
      console.log(Object.keys(x.message));
    });
  }

  ngDoCheck(): void {
    console.log(this.toppings.value);
  }
}
