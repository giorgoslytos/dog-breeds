import { Component, OnInit } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';
import { BreedList } from 'src/app/interfaces/BreedList.interface';
import { DogApiService } from 'src/app/services/dog-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/components/modal/modal.component';

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
  constructor(private dogApiService: DogApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogApiService.getBreedList().subscribe((x) => {
      this.breedList = x;
      this.breedListArr = Object.keys(x.message);
      console.log(Object.keys(x.message));
    });
  }

  ngDoCheck(): void {
    console.log(this.selectedQuantity);
  }

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

    // .reduce((acc: any, curr: any) => [...acc, ...curr], []);

    if (this.subBreedListArr === []) {
      this.dialog.open(ModalComponent);
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
    // !this.selectedSubBreeds.length
    //   ? quantity === 'one'
    //     ? this.selectedBreeds.forEach((dog: string) =>
    //         this.dogApiService
    //           .getSpecificDog(dog)
    //           .subscribe((x) => console.log(x))
    //       )
    //     : this.selectedBreeds.forEach((dog: string) =>
    //         this.dogApiService
    //           .getSpecificDogs(dog)
    //           .subscribe((x) => console.log(x))
    //       )
    //   : quantity === 'one'
    //   ? this.selectedBreeds.forEach((breed: string) =>
    //       this.selectedSubBreeds.forEach((subbreed: string) =>
    //         this.dogApiService
    //           .getSpecificSubBreedDog(breed, subbreed)
    //           .subscribe((x) => console.log(x))
    //       )
    //     )
    //   : this.selectedBreeds.forEach((breed: string) =>
    //       this.selectedSubBreeds.forEach((subbreed: string) =>
    //         this.dogApiService
    //           .getSpecificSubBreedDogs(breed, subbreed)
    //           .subscribe((x) => console.log(x))
    //       )
    //     );
  }
}

// {
//   australian: ["shepherd"],
//   buhund: ["norwegian"],
//   bulldog:  ["boston", "english", "french"],
//   bullterrier: ["staffordshire"],
//   collie: ["border"],
//   coonhound: [],
//   corgi: ["cardigan"],
//   deerhound: ["scottish"],
//   dingo: [],
//   elkhound: ["norwegian"],
//   finnish: ["lapphund"],
//   frise: ["bichon"],
//   germanshepherd: [],
//   greyhound: ["italian"],
//   hound:  ["afghan", "basset", "blood", "english", "ibizan", "plott", "walker"],
//   husky: [],
//   keeshond: [],
//   komondor: [],
//   labrador: [],
//   mastiff: ["bull", "english", "tibetan"],
//   mexicanhairless: [],
//   mountain: ["bernese", "swiss"],
//   ovcharka: ["caucasian"],
//   pembroke: []}
