import { Component, Input, OnInit } from '@angular/core';
import { DogInfo } from 'src/app/models/DogInfo.interface';

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
  favorited: boolean = false;

  constructor() {}
  ngOnInit() {}
}
