import { TurnType } from 'src/enums/turns.enum';
import { Bodega } from './bodega.model';

export interface Turn {
  userDocument: string;
  type: TurnType;
  bodega: Bodega;
}
