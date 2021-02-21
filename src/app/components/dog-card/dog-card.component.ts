import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { Observable } from 'rxjs';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { ContentState } from 'src/app/types/ContentState';
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
  @Input()
  breedsPageMode: boolean = false;
  @ViewChild('imageURLEl', { static: false })
  imageURLEl!: ElementRef;
  @Output()
  getAnotherDog: EventEmitter<string> = new EventEmitter<string>();

  favorited: boolean = false;
  cookiesArr: string[] = [];
  ContentState = ContentState;
  xpandStatus = false;
  constructor(private favoritesService: FavoritesService) {}
  ngOnInit() {
    this.cookiesArr = this.favoritesService.cookiesArr;
    this.favorited = this.favoritesMode;
  }

  ngOnChanges(changes: DogImageState): void {
    this.favorited = false;
    this.xpandStatus = false;
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
    }
  }
}
