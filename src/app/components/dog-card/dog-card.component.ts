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
import { DogCeoImageState } from 'src/app/interfaces/DogCeoImageState.interface';
import { ApiDogBreedsInfoState } from 'src/app/interfaces/ApiDogBreedsInfoState.interface';
import { ContentState } from 'src/app/types/ContentState';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input()
  public dogImageState$: Observable<DogCeoImageState> | undefined;
  @Input()
  public dogInfoState$: Observable<ApiDogBreedsInfoState> | undefined;
  @Input()
  public favoritesMode: boolean = false;
  @Input()
  public breedsPageMode: boolean = false;
  @ViewChild('imageURLEl', { static: false })
  private imageURLEl!: ElementRef;
  @Output()
  public getAnotherDog: EventEmitter<string> = new EventEmitter<string>();

  public favorited: boolean = false;
  public cookiesArr: string[] = [];
  public ContentState = ContentState;
  public xpandStatus = false;

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    this.cookiesArr = this.favoritesService.cookiesArr;
    this.favorited = this.favoritesMode;
  }

  ngOnChanges(changes: DogCeoImageState): void {
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
