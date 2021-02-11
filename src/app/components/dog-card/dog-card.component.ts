import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { ContentState } from 'src/app/types/ContentState';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input()
  dogImageState: Observable<DogImageState> | undefined;
  @Input()
  dogInfoState: Observable<DogInfoState> | undefined;
  @ViewChild('imageURLEl', { static: false })
  // imageURLEl!: HTMLImageElement;
  imageURLEl!: ElementRef;

  cookiesArr: string[] = [];
  favorited: boolean = false;

  ContentState = ContentState;
  constructor(private cookie: CookieService) {}
  ngOnInit() {
    if (this.cookie.check('favorite')) {
      this.cookiesArr = JSON.parse(this.cookie.get('favorite'));
      console.log(this.cookiesArr);
    }
  }

  handleFavorite() {
    if (!this.favorited) {
      this.cookiesArr.push(this.imageURLEl.nativeElement.src);
      this.favorited = true;
    } else {
      this.cookiesArr = this.cookiesArr.filter(
        (x) => x !== this.imageURLEl.nativeElement.src
      );
      this.favorited = false;
    }
    this.cookie.set('favorite', JSON.stringify(this.cookiesArr));
  }
}
