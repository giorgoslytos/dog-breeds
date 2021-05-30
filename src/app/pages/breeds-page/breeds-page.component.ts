import { Component, OnInit } from '@angular/core';
import { DogCeoBreedsListObj } from 'src/app/interfaces/DogCeoBreedsListObj';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Observable } from 'rxjs';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { filter, mergeMap, reduce } from 'rxjs/operators';
import { ApiDogBreedsInfo } from 'src/app/interfaces/ApiDogBreedsInfo.interface';
import { Dog } from 'src/app/interfaces/Dog.interface';

@Component({
  selector: 'app-breeds-page',
  templateUrl: './breeds-page.component.html',
  styleUrls: ['./breeds-page.component.scss'],
})
export class BreedsPageComponent implements OnInit {
  public selectedBreeds: string[] = [];
  public subBreeds: string[] = [];
  public selectedSubBreeds: { breed: string; selectedSubBreeds: string }[] = [];
  public selectedQuantity: string = 'none';
  public quantity = ['one', 'all'];
  public breedList: DogCeoBreedsListObj | undefined;
  public breedListArr: Array<string> = [];
  public breedSubbreedMask:
    | Array<{ breed: string; subbreed: string }>
    | undefined = [];

  public subBreedListArr: Array<{ breed: string; subbreed: string }> = [];
  public dogs: Dog[] = [];
  public numberOfDogs: number = 0;
  public availableSubbreeds: { breed: string; subbreed: string[] }[] = [];
  public apiBreedsSubbreeds: { breed: string; subbreed: string[] }[] = [];

  constructor(private dogApiService: DogApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogApiService
      .getBreedList()
      .pipe(
        mergeMap((x) => Object.entries(x.message)),
        reduce(
          (acc, curr) => [...acc, { breed: curr[0], subbreed: curr[1] }],
          new Array()
        )
      )
      .subscribe((x) => (this.apiBreedsSubbreeds = x));
  }

  breedSelectionChanged() {
    let array = new Array();
    this.apiBreedsSubbreeds
      .filter(
        (x) => this.selectedBreeds.includes(x?.breed!) && x.subbreed.length
      )
      .forEach((x) => {
        x.subbreed.forEach((y) => {
          array.push({ breed: x.breed, subbreed: y });
        });
      });
    this.subBreedListArr = [...array];

    this.numberOfDogs = this.selectedBreeds.length;
  }

  openModal() {
    if (!this.subBreedListArr.length) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Notification',
          paragraph: 'No sub-breeds found for the selected breeds',
        },
      });
    }
  }

  fetchDogs(quantity: string) {
    this.dogs = [];
    const dogsByBreed: string[] = this.selectedBreeds.filter(
      (x) => !this.selectedSubBreeds.map((x) => x.breed).includes(x)
    );
    // switch (quantity) {
    // case 'one':
    dogsByBreed.forEach((dogName: string) =>
      this.dogApiService
        .getSpecificDog(dogName)
        .pipe(filter((x) => x.state === ContentState.LOADED))
        .subscribe((dog) => {
          this.dogs.push(dog);
        })
    );
    this.selectedSubBreeds.forEach((dog) =>
      this.dogApiService
        .getSpecificSubBreedDog(dog.breed, dog.subbreed)
        .pipe(filter((x) => x.state === ContentState.LOADED))
        .subscribe((dog) => {
          this.dogs.push(dog);
        })
    );
  }
}
