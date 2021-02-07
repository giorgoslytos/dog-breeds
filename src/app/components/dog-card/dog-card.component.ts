import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DogImage } from 'src/app/models/DogImage.interface';
import { DogInfo } from 'src/app/models/DogInfo.interface';
import { ContentState } from 'src/app/types/ContentState';

@Component({
  selector: 'app-dog-card',
  templateUrl: './dog-card.component.html',
  styleUrls: ['./dog-card.component.scss'],
})
export class DogCardComponent implements OnInit {
  @Input()
  randomImage: string | undefined;
  @Input()
  title: string | undefined;
  @Input()
  dogInfo: DogInfo | undefined;
  @Input()
  dogInfoError: string | undefined;
  @Input()
  dogImageState?:
    | Observable<{
        state: ContentState;
        item?: DogImage;
        error?: any;
        title?: string;
      }>
    | undefined;
  @Input()
  dogInfoState?: any;

  favorited: boolean = false;

  ContentState = ContentState;
  constructor() {}
  ngOnInit() {}
}
