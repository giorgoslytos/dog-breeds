import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { DogImage } from './models/DogImage.interface';
import { DogInfo } from './models/DogInfo.interface';
import { DogCeoService } from './services/dog-ceo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
