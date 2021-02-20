import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { BreedList } from 'src/app/interfaces/BreedList.interface';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { Observable, from, of, async } from 'rxjs';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { catchError, map, startWith } from 'rxjs/operators';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { DogsAllInfo } from 'src/app/interfaces/DogsAllInfo.interface';

@Component({
  selector: 'app-breeds-page',
  templateUrl: './breeds-page.component.html',
  styleUrls: ['./breeds-page.component.scss'],
})
export class BreedsPageComponent implements OnInit {
  selectedBreeds: string[] = [];
  selectedSubBreeds: { breed: string; subbreed: string }[] = [];
  selectedQuantity: string = 'none';
  quantity = ['one', 'all'];
  breedList: BreedList | undefined;
  breedListArr: Array<string> = [];
  subBreedListArr: Array<string> = [];
  breedSubbreedMask:
    | Array<{ breed: string; subbreed: string }>
    | undefined = [];
  dogsImgObs: Observable<DogImage>[] | undefined;
  allDogsListObj: DogsAllInfo[] | undefined;
  dogsImgs: string[] = [];

  constructor(private dogApiService: DogApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogApiService.getBreedList().subscribe((x) => {
      this.breedList = x;
      this.breedListArr = Object.keys(x.message);
      console.log(Object.keys(x.message));
    });
  }

  ngDoCheck(): void {}

  populateSubBreeds() {
    this.breedSubbreedMask = this.selectedBreeds
      // .map((x: string) => this.breedList?.message[x])
      .map((x: string) =>
        this.breedList?.message[x].map((y) => ({
          breed: x,
          subbreed: y,
        }))
      )
      .reduce((acc: any, curr: any) => acc.concat(curr), []);

    if (this.subBreedListArr === []) {
      this.dialog.open(ModalComponent);
    }
    if (this.breedSubbreedMask?.length === 0) {
      this.selectedSubBreeds = [];
    }
    console.log(this.subBreedListArr);
  }
  openModal() {
    if (!this.breedSubbreedMask || this.breedSubbreedMask.length === 0) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Notification',
          paragraph: 'No sub-breeds found for the selected breeds',
        },
      });
    }
  }

  fetchDogs(quantity: string) {
    const dogsByBreed: string[] = this.selectedBreeds.filter(
      (x) => !this.selectedSubBreeds.map((x) => x.breed).includes(x)
    );
    switch (quantity) {
      case 'one':
        dogsByBreed.forEach((dog: string) =>
          this.dogApiService
            .getSpecificDog(dog)
            .subscribe((dogImg) => this.dogsImgs.push(dogImg.message || ''))
        );
        this.selectedSubBreeds.forEach((dog) =>
          this.dogApiService
            .getSpecificSubBreedDog(dog.breed, dog.subbreed)
            .subscribe((dogImg) => this.dogsImgs.push(dogImg.message || ''))
        );
        break;
      default:
        dogsByBreed.forEach((dog: string) =>
          this.dogApiService
            .getSpecificDogs(dog)
            .subscribe((dogImg) =>
              dogImg.message?.map((x) => this.dogsImgs.push(x))
            )
        );
        this.selectedSubBreeds.forEach((dog) =>
          this.dogApiService
            .getSpecificSubBreedDogs(dog.breed, dog.subbreed)
            .subscribe((dogImg) =>
              dogImg.message?.map((x) => this.dogsImgs.push(x))
            )
        );
    }
    console.log(this.dogsImgs);
    this.allDogsListObj = this.dogsImgs.map((dogLink: string) => {
      const title: string = exportTitleFromURL(dogLink);
      const dogImageState = from([
        {
          state: ContentState.LOADED,
          item: { message: dogLink, status: 'success' },
          title,
        },
      ]).pipe(
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
      const dogInfoState = this.dogApiService
        .getDogInfo(title.split(' ')[0])
        .pipe(
          map((item: DogInfo[]) => ({
            state: ContentState.LOADED,
            item:
              item.filter(
                (dog) =>
                  dog.breedName ===
                  title.split(' ').reverse().join(' ').toLowerCase()
              )[0] ||
              item.filter(
                (dog) => dog.breedName === title.split(' ')[0].toLowerCase()
              )[0] ||
              item.filter(
                (dog) => dog.dogInfo.breedGroup !== 'mixed breed dogs'
              )[0] ||
              item[0],
          })),
          startWith({ state: ContentState.LOADING }),
          catchError((e) => of({ state: ContentState.ERR, error: e.message }))
        );
      return {
        dogImageState,
        dogInfoState,
      };
    });
  }
}
