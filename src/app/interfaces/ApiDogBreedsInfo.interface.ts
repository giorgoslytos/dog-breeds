/**
 * api-dog-breeds
 */
export interface ApiDogBreedsInfo {
  message: any;
  breedName: string;
  image: string;
  description: string;
  dogInfo: {
    height: string;
    weight: string;
    life: string;
    breedGroup: string;
  };
  id: string;
}
