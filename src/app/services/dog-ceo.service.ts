import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogImage } from '../models/DogImage.interface';
import { DogInfo } from '../models/DogInfo.interface';

@Injectable({
  providedIn: 'root',
})
export class DogCeoService {
  BASE_URL: string = 'https://dog.ceo/api/';
  BASE_INFO_URL: string = 'https://api-dog-breeds.herokuapp.com/api/search?q=';

  constructor(private http: HttpClient) {}

  getRandomDog() {
    return this.http.get<DogImage>(`${this.BASE_URL}breeds/image/random`);
  }

  getDogInfo(breed: string) {
    return this.http.get<DogInfo>(`${this.BASE_INFO_URL}${breed}`);
  }
}
