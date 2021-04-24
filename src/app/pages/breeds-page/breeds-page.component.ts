import { Component, EventEmitter, OnInit } from '@angular/core';
import { DogCeoBreedsListObj } from 'src/app/interfaces/DogCeoBreedsListObj';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { from, of, Observable } from 'rxjs';
import { ContentState } from 'src/app/types/ContentState';
import { exportTitleFromURL } from 'src/app/utils/exportTitleFromURL';
import { catchError, map, startWith } from 'rxjs/operators';
import { ApiDogBreedsInfo } from 'src/app/interfaces/ApiDogBreedsInfo.interface';

@Component({
  selector: 'app-breeds-page',
  templateUrl: './breeds-page.component.html',
  styleUrls: ['./breeds-page.component.scss'],
})
export class BreedsPageComponent implements OnInit {
  public selectedBreeds: string[] = [];
  public selectedSubBreeds: { breed: string; subbreed: string }[] = [];
  public selectedQuantity: string = 'none';
  public quantity = ['one', 'all'];
  public breedList: DogCeoBreedsListObj | undefined;
  public breedListArr: Array<string> = [];
  public breedSubbreedMask:
    | Array<{ breed: string; subbreed: string }>
    | undefined = [];

  private subBreedListArr: Array<string> = [];
  public dogsImgObs: {
    dogImageState$: Observable<{
      state: ContentState;
      item?: { message: string; status: string };
      title?: string;
      error?: string;
    }>;
    dogInfoState$: Observable<{
      state: ContentState;
      item?: ApiDogBreedsInfo;
      error?: any;
    }>;
  }[] = [];
  private dogsImgs: string[] = [];
  private dogsArrChange: EventEmitter<string[]> = new EventEmitter();

  constructor(private dogApiService: DogApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogApiService.getBreedList().subscribe((x) => {
      this.breedList = x;
      this.breedListArr = Object.keys(x.message);
    });
    this.dogsArrChange.subscribe((x: any) => {
      this.createDogsArray(x);
    });
  }

  ngDoCheck(): void {}

  populateSubBreeds() {
    this.breedSubbreedMask = this.selectedBreeds
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
    this.dogsImgs = [];
    const dogsByBreed: string[] = this.selectedBreeds.filter(
      (x) => !this.selectedSubBreeds.map((x) => x.breed).includes(x)
    );
    switch (quantity) {
      case 'one':
        dogsByBreed.forEach((dog: string) =>
          this.dogApiService.getSpecificDog(dog).subscribe((dogImg) => {
            this.dogsImgs.push(dogImg.message || '');
            this.dogsArrChange.emit(this.dogsImgs);
          })
        );
        this.selectedSubBreeds.forEach((dog) =>
          this.dogApiService
            .getSpecificSubBreedDog(dog.breed, dog.subbreed)
            .subscribe((dogImg) => {
              this.dogsImgs.push(dogImg.message || '');
              this.dogsArrChange.emit(this.dogsImgs);
            })
        );
        break;
      default:
        dogsByBreed.forEach((dog: string) =>
          this.dogApiService.getSpecificDogs(dog).subscribe((dogImg) => {
            dogImg.message?.map((x) => this.dogsImgs.push(x));
            this.dogsArrChange.emit(this.dogsImgs);
          })
        );
        this.selectedSubBreeds.forEach((dog) =>
          this.dogApiService
            .getSpecificSubBreedDogs(dog.breed, dog.subbreed)
            .subscribe((dogImg) => {
              dogImg.message?.map((x) => this.dogsImgs.push(x));
              this.dogsArrChange.emit(this.dogsImgs);
            })
        );
    }
  }
  createDogsArray(arr: string[]) {
    this.dogsImgObs = arr.map((dogLink: string) => {
      const title: string = exportTitleFromURL(dogLink);
      const dogImageState$ = from([
        {
          state: ContentState.LOADED,
          item: { message: dogLink, status: 'success' },
          title,
        },
      ]).pipe(
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
      const dogInfoState$ = this.dogApiService
        .getDogInfo(title.split(' ')[0])
        .pipe(
          map((item: ApiDogBreedsInfo[]) => ({
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
        dogImageState$,
        dogInfoState$,
      };
    });
  }
}
