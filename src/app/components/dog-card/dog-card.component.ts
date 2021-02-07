import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DogImage } from 'src/app/interfaces/DogImage.interface';
import { DogImageState } from 'src/app/interfaces/DogImageState.interface';
import { DogInfoState } from 'src/app/interfaces/DogInfoState.interface';
import { DogInfo } from 'src/app/interfaces/DogInfo.interface';
import { ContentState } from 'src/app/types/ContentState';

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

  favorited: boolean = false;

  ContentState = ContentState;
  constructor() {}
  ngOnInit() {}
}
