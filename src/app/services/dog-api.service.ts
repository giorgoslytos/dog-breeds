import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DogCeoImage } from '../interfaces/DogCeoImage.interface';
import { ApiDogBreedsInfo } from '../interfaces/ApiDogBreedsInfo.interface';
import { Observable, of } from 'rxjs';
import { DogCeoBreedsListObj } from '../interfaces/DogCeoBreedsListObj';
import { Dog } from '../interfaces/Dog.interface';
import { map } from 'rxjs/internal/operators/map';
import { exportTitleFromURL } from '../utils/exportTitleFromURL';
import { mergeMap } from 'rxjs/internal/operators/mergeMap';
import { catchError, shareReplay, startWith } from 'rxjs/operators';
import { ContentState } from '../types/ContentState';

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

  getRandomDogSpecs(): Observable<Dog> {
    return this.http
      .get<DogCeoImage>(`${this.BASE_URL}breeds/image/random`)
      .pipe(
        map((dogImage) => ({
          title: exportTitleFromURL(dogImage?.message),
          image: dogImage.message,
        })),
        mergeMap((dogImage) =>
          this.getDogInfoSpecs(dogImage, dogImage.title.split(' ')[0])
        ),
        shareReplay(),
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
  }

  getSpecificDog(breed: string): Observable<Dog> {
    return this.http
      .get<DogCeoImage>(`${this.BASE_URL}breed/${breed}/images/random`)
      .pipe(
        map((x) => ({
          title: breed,
          image: x.message,
        })),
        mergeMap((dogImage) => this.getDogInfoSpecs(dogImage, breed)),
        shareReplay(),
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
      );
  }

  getDogInfoSpecs(dogImage: { title: string; image?: string }, breed: string) {
    return this.getDogInfo(breed).pipe(
      map((dogInfo: ApiDogBreedsInfo[]) => ({
        title: dogImage.title,
        image: dogImage.image,
        dogInfo: {
          info:
            dogInfo.filter(
              (dog) =>
                dog.breedName ===
                dogImage?.title.split(' ').reverse().join(' ').toLowerCase()
            )[0] ||
            dogInfo.filter(
              (dog) =>
                dog.breedName === dogImage?.title.split(' ')[0].toLowerCase()
            )[0] ||
            dogInfo.filter(
              (dog) => dog.dogInfo.breedGroup !== 'mixed breed dogs'
            )[0] ||
            dogInfo[0],
          state: ContentState.LOADED,
        },
        state: ContentState.LOADED,
      })),
      catchError(() => {
        return of({
          title: dogImage.title,
          image: dogImage.image,
          dogInfo: { state: ContentState.ERR },
          state: ContentState.LOADED,
        });
      })
    );
  }
  getSpecificDogs(
    breed: string
  ): Observable<{ message: string[]; status: string }> {
    return this.http.get<{ message: string[]; status: string }>(
      `${this.BASE_URL}breed/${breed}/images`
    );
  }

  getSpecificSubBreedDog(breed: string, subbreed: string): Observable<Dog> {
    return this.http
      .get<DogCeoImage>(
        `${this.BASE_URL}breed/${breed}/${subbreed}/images/random`
      )
      .pipe(
        map((x) => ({
          title: `${subbreed} ${breed}`,
          image: x.message,
        })),
        mergeMap((dogImage) => this.getDogInfoSpecs(dogImage, breed)),
        shareReplay(),
        startWith({ state: ContentState.LOADING }),
        catchError((e) => of({ state: ContentState.ERR, error: e.message }))
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
