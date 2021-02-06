import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DogInfo } from './models/DogInfo.interface';
import { DogCeoService } from './services/dog-ceo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  randomImage: string = '';
  title: string = '';
  favorited: boolean = false;

  private readonly onDestroy = new Subject<void>();

  constructor(private apiService: DogCeoService) {}

  ngOnInit(): void {
    this.apiService
      .getRandomDog()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((x) => {
        console.log(x, 'dogCEO Image');
        this.randomImage = x.message;
        this.title = x.message
          .slice(30)
          .replace(/\/[\w,.]+/, '')
          .split('-')
          .map((x) => x[0].toUpperCase() + x.slice(1))
          .join(' ');
      });
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }
}
