import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { ContentState } from 'src/app/types/ContentState';
import { CookieService } from 'ngx-cookie-service';
import { FavoritesService } from 'src/app/services/favorites.service';

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
  @Input()
  favoritesMode: boolean = false;
  @ViewChild('imageURLEl', { static: false })
  imageURLEl!: ElementRef;

  @Output()
  removeFromFavorites: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  getAnotherDog: EventEmitter<string> = new EventEmitter<string>();

  favorited: boolean = false;

  cookiesArr: string[] = [];

  ContentState = ContentState;

  constructor(
    private cookie: CookieService,
    private favoritesService: FavoritesService
  ) {}
  ngOnInit() {
    this.favoritesService.fetchFavoritesCookieArr();
    this.cookiesArr = this.favoritesService.cookiesArr;
    this.favorited = this.favoritesMode;
  }

  ngOnChanges(changes: DogImageState): void {
    console.log(changes);
    console.log('changes');
    this.favorited = false;
  }
  handleFavorite() {
    if (!this.favorited) {
      this.favorited = this.favoritesService.addFavorite(
        this.imageURLEl.nativeElement.src
      );
    } else {
      this.favorited = this.favoritesService.removeFavorite(
        this.imageURLEl.nativeElement.src
      );
      this.removeFromFavorites.emit(this.imageURLEl.nativeElement.src);
    }
  }
}
