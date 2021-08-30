import { Component, OnInit } from '@angular/core';
import { DogCeoBreedsListObj } from 'src/app/interfaces/DogCeoBreedsListObj';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { ContentState } from 'src/app/types/ContentState';
import { catchError, filter, mergeMap, reduce } from 'rxjs/operators';
import { Dog } from 'src/app/interfaces/Dog.interface';
import { forkJoin, of } from 'rxjs';

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

  public subBreedListMap: Array<{ breed: string; subbreed: string }> = [];
  public dogs: Dog[] = [];
  public numberOfDogs: number = 0;
  public availableSubbreeds: { breed: string; subbreed: string[] }[] = [];
  public apiBreedsSubbreeds: { breed: string; subbreed: string[] }[] = [];
  public fetchingDogs: boolean = false;

  constructor(private dogApiService: DogApiService, public dialog: MatDialog) { }

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

  public breedSelectionChanged() {
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
    this.subBreedListMap = [...array];

    this.numberOfDogs = this.selectedBreeds.length +
      this.selectedBreeds.filter(
        (breed) => {
          this.subBreedListMap.some(x => x.breed === breed)
        }).length + this.subbreedsLength();
  }

  public openModal() {
    if (!this.subBreedListMap.length) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Notification',
          paragraph: 'No sub-breeds found for the selected breeds',
        },
      });
    }
  }

  public fetchDogs(quantity: string) {
    this.fetchingDogs = true;
    this.dogs = [];
    const dogsByBreed = this.selectedBreeds.filter(
      (breed) => !this.subBreedListMap.some(x => x.breed === breed)).map(dogName =>
        this.dogApiService
          .getSpecificDog(dogName)
          .pipe(filter((x) => x.state === ContentState.LOADED))
      );

    const dogsBySubbreed = this.subBreedListMap.filter(x => this.subBreeds.includes(x.subbreed))
      .map(dog => this.dogApiService
        .getSpecificSubBreedDog(dog.breed, dog.subbreed)
        .pipe(filter((x) => x.state === ContentState.LOADED)))

    forkJoin([...dogsByBreed, ...dogsBySubbreed])
      .subscribe((dogs: Dog[]) => this.dogs = dogs,
        (error: Error) => {
          this.dialog.open(ModalComponent, {
            data: {
              title: 'Network Error',
              paragraph: 'Something went wrong! Probably your connection has a problem. Try again later'
            },
          });
          this.fetchingDogs = false;
        },
        () => this.fetchingDogs = false);
  }

  private subbreedsLength() {
    const arr = this.subBreedListMap.filter(dog => this.subBreeds.includes(dog.subbreed))
    let length = 0;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i].breed === arr[i + 1].breed) {
        length++;
      }
    }
    return length;
    // return length;this.subBreedListMap.filter(x => this.subBreeds.includes(x.subbreed))
  }
}
