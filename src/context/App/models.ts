import { CurISO } from 'models';
import { Dispatch } from 'react';

export interface CurrencyAction {
  type: 'preferredCurrency';
  payload: CurISO;
}

export interface AppContextType {
  preferredCurrency: CurISO | null;
  dispatch: Dispatch<Action>;
}

export type Action = CurrencyAction;

export type ReducerState = Omit<AppContextType, 'dispatch'>;

export interface AppReducerType {
  (state: ReducerState, action: Action): typeof state;
}
