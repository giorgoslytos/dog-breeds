import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogImage } from '../interfaces/DogImage.interface';
import { DogInfo } from '../interfaces/DogInfo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DogCeoService {
  BASE_URL: string = 'https://dog.ceo/api/';
  // BASE_URL: string = 'https://dog.ceo/api/breed/bullterrier/images/random';
  BASE_INFO_URL: string = 'https://api-dog-breeds.herokuapp.com/api/search?q=';

  constructor(private http: HttpClient) {}

  getRandomDog(): Observable<DogImage> {
    return this.http.get<DogImage>(`${this.BASE_URL}breeds/image/random`);
    // return this.http.get<DogImage>(`${this.BASE_URL}`);
  }

  getDogInfo(breedName: string): Observable<DogInfo[]> {
    return this.http.get<DogInfo[]>(`${this.BASE_INFO_URL}${breedName}`);
  }
}
