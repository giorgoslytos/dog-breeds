import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogCeoImage } from '../interfaces/DogCeoImage.interface';
import { ApiDogBreedsInfo } from '../interfaces/ApiDogBreedsInfo.interface';
import { Observable } from 'rxjs';
import { DogCeoBreedsListObj } from '../interfaces/DogCeoBreedsListObj';

@Injectable({
  providedIn: 'root',
})
export class DogApiService {
  BASE_URL: string = 'https://dog.ceo/api/';
  BASE_INFO_URL: string = 'https://api-dog-breeds.herokuapp.com/api/search?q=';

  constructor(private http: HttpClient) {}

  getRandomDog(): Observable<DogCeoImage> {
    return this.http.get<DogCeoImage>(`${this.BASE_URL}breeds/image/random`);
  }

  getSpecificDog(breed: string): Observable<DogCeoImage> {
    return this.http.get<DogCeoImage>(
      `${this.BASE_URL}breed/${breed}/images/random`
    );
  }

  getSpecificDogs(
    breed: string
  ): Observable<{ message: string[]; status: string }> {
    return this.http.get<{ message: string[]; status: string }>(
      `${this.BASE_URL}breed/${breed}/images`
    );
  }

  getSpecificSubBreedDog(
    breed: string,
    subbreed: string
  ): Observable<DogCeoImage> {
    return this.http.get<DogCeoImage>(
      `${this.BASE_URL}breed/${breed}/${subbreed}/images/random`
    );
  }

  getSpecificSubBreedDogs(
    breed: string,
    subbreed: string
  ): Observable<{ message: string[]; status: string }> {
    return this.http.get<{ message: string[]; status: string }>(
      `${this.BASE_URL}breed/${breed}/${subbreed}/images`
    );
  }
  getDogInfo(breedName: string): Observable<ApiDogBreedsInfo[]> {
    return this.http.get<ApiDogBreedsInfo[]>(
      `${this.BASE_INFO_URL}${breedName}`
    );
  }

  getBreedList(): Observable<DogCeoBreedsListObj> {
    return this.http.get<DogCeoBreedsListObj>(
      `${this.BASE_URL}breeds/list/all`
    );
  }
}
