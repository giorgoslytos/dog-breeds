import { ContentState } from '../types/ContentState';
import { DogCeoImage } from './DogCeoImage.interface';

export interface DogCeoImageState {
  state: ContentState;
  item?: DogCeoImage;
  title?: string;
  error?: string;
}
