/**
 * dog.ceo type
 */
export interface DogCeoBreedsListObj {
  message: {
    [breed: string]: string[];
  };
  status: string;
}
