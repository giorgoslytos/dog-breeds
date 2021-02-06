import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, switchMap, take, takeUntil } from 'rxjs/operators';
import { DogImage } from 'src/app/models/DogImage.interface';
import { DogInfo } from 'src/app/models/DogInfo.interface';
import { DogCeoService } from 'src/app/services/dog-ceo.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  randomImage: string = '';
  title: string = '';
  favorited: boolean = false;
  dogInfo: DogInfo | undefined;

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogCeoService) {}

  ngOnInit(): void {
    this.apiService
      .getRandomDog()
      .pipe(
        take(1),
        switchMap((dogImage: DogImage, index: number) => {
          console.log(dogImage, 'dogCEO Image');
          this.randomImage = dogImage.message;
          this.title = dogImage.message
            .slice(30)
            .replace(/\/[\w,.]+/, '')
            .split('-')
            .map((dogImage) => dogImage[0].toUpperCase() + dogImage.slice(1))
            .join(' ');
          return this.apiService.getDogInfo(this.title.split(' ')[0]);
        })
      )
      .subscribe((dogInfoArr) => {
        console.log(dogInfoArr[0]);
        this.dogInfo = dogInfoArr[0];
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
