import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DogCeoImageState } from 'src/app/interfaces/DogCeoImageState.interface';
import { ApiDogBreedsInfoState } from 'src/app/interfaces/ApiDogBreedsInfoState.interface';
import { ContentState } from 'src/app/types/ContentState';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Dog } from 'src/app/interfaces/Dog.interface';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input()
  public dogImageState$!: Observable<DogCeoImageState>;

  @Input()
  public dogInfoState$!: Observable<ApiDogBreedsInfoState>;
  @Input()
  public favoritesMode: boolean = false;
  @Input()
  public breedsPageMode: boolean = false;
  @ViewChild('imageURLEl', { static: false })
  private imageURLEl!: ElementRef;
  @Output()
  public getAnotherDog: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public dogsChange$ = new EventEmitter();
  @Input()
  public dog: Dog = { state: ContentState.LOADING };

  public favorited: boolean = false;
  public cookiesArr: string[] = [];
  public ContentState = ContentState;
  public xpandStatus = false;
  private dogInfoState: ApiDogBreedsInfoState = { state: ContentState.LOADING };
  private dogImageState: DogCeoImageState = { state: ContentState.LOADING };
  private subscriptions = new Subscription();
  constructor(private favoritesService: FavoritesService) {}

  ngOnInit() {
    // this.cookiesArr = this.favoritesService.cookiesArr;
    this.favorited = this.favoritesMode;
  }

  // when getAnotherDog is triggered
  ngOnChanges(changes: SimpleChanges): void {
    this.favorited = false;
    this.xpandStatus = false;
  }
  handleFavorite() {
    if (this.dog.state === ContentState.LOADED) {
      if (!this.favorited) {
        // this.favorited = this.favoritesService.addFavorite(
        //   this.imageURLEl.nativeElement.src
        // );
        this.favoritesService.addFavorite(this.dog);
        this.favorited = true;
      } else {
        this.favorited = false;
        this.favoritesService.removeFavorite(this.dog);
        this.dogsChange$.emit();
        // this.favorited = this.favoritesService.removeFavorite(
        //   this.imageURLEl.nativeElement.src
        // );
      }
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
