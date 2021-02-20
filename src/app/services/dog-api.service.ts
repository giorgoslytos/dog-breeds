import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogImage } from '../interfaces/DogImage.interface';
import { DogInfo } from '../interfaces/DogInfo.interface';
import { Observable } from 'rxjs';
import { BreedList } from '../interfaces/BreedList.interface';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  BASE_URL: string = 'https://dog.ceo/api/';
  BASE_INFO_URL: string = 'https://api-dog-breeds.herokuapp.com/api/search?q=';

  constructor(private http: HttpClient) {}

  getRandomDog(): Observable<DogImage> {
    return this.http.get<DogImage>(`${this.BASE_URL}breeds/image/random`);
  }

  getSpecificDog(breed: string): Observable<DogImage> {
    return this.http.get<DogImage>(
      `${this.BASE_URL}breed/${breed}/images/random`
    );
  }

  getSpecificDogs(breed: string): Observable<DogImage> {
    return this.http.get<DogImage>(`${this.BASE_URL}breed/${breed}/images`);
  }

  getSpecificSubBreedDog(
    breed: string,
    subbreed: string
  ): Observable<DogImage> {
    return this.http.get<DogImage>(
      `${this.BASE_URL}breed/${breed}/${subbreed}/images/random`
    );
  }

  getSpecificSubBreedDogs(
    breed: string,
    subbreed: string
  ): Observable<DogImage> {
    return this.http.get<DogImage>(
      `${this.BASE_URL}breed/${breed}/${subbreed}/images`
    );
  }
  getDogInfo(breedName: string): Observable<DogInfo[]> {
    return this.http.get<DogInfo[]>(`${this.BASE_INFO_URL}${breedName}`);
  }

  getBreedList(): Observable<BreedList> {
    return this.http.get<BreedList>(`${this.BASE_URL}breeds/list/all`);
  }
}
