import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
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
  dogInfoArr: DogInfo[] = [];

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogCeoService) {}

  ngOnInit(): void {
    this.apiService
      .getRandomDog()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((x: { message: string }) => {
        this.randomImage = x.message;
        this.title = x.message
          .slice(30)
          .replace(/\/[\w,.]+/, '')
          .split('-')
          .map((x) => x[0].toUpperCase() + x.slice(1))
          .join(' ');
        this.apiService
          .getDogInfo(this.title.split(' ')[0])
          .pipe(takeUntil(this.onDestroy));
        // .subscribe((x:Subject<Array<DogInfo>>) => {
        //   console.log(x);
        //   return (this.dogInfoArr = x);
        // });
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
