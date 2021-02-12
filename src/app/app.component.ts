import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';
import { DogImage } from './interfaces/DogImage.interface';
import { DogInfo } from './interfaces/DogInfo.interface';
import { DogApiService } from './services/dog-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
