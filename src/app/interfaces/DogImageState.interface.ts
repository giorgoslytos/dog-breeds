import { ContentState } from '../types/ContentState';
import { DogImage } from './DogImage.interface';

export interface DogImageState {
  state: ContentState;
  item: DogImage;
  title: string;
  error: string;
}
