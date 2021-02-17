import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  selectedBreeds = new FormControl();
  selectedSubBreeds = new FormControl();
  breedList: BreedList | undefined;
  breedListArr: Array<string> = [];
  subBreedListArr: Array<string> = [];
  constructor(private dogApiService: DogApiService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dogApiService.getBreedList().subscribe((x) => {
      this.breedList = x;
      this.breedListArr = Object.keys(x.message);
      console.log(Object.keys(x.message));
    });
  }

  ngDoCheck(): void {
    console.log(this.selectedBreeds.value);
    console.log(this.breedList?.message);
  }

  populateSubBreeds() {
    this.subBreedListArr =
      this.selectedBreeds.value &&
      this.selectedBreeds.value
        .map((x: string) => this.breedList?.message[x])
        .reduce((acc: any, curr: any) => [...acc, ...curr], []);

    if (this.subBreedListArr === []) {
      this.dialog.open(ModalComponent);
    }
    console.log(this.subBreedListArr);
  }
  openModal() {
    if (!this.subBreedListArr || this.subBreedListArr.length === 0) {
      this.dialog.open(ModalComponent, {
        data: {
          title: 'Notification',
          paragraph: 'No sub-breeds found for the selected breeds',
        },
      });
    }
    console.log(this.subBreedListArr);
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
