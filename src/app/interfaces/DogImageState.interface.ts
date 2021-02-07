import { ContentState } from '../types/ContentState';
import { DogInfo } from './DogInfo.interface';

export interface dogImageState {
  state: ContentState;
  item?: DogInfo;
  title?: string;
  error?: string;
}
