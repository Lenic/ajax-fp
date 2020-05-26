import { NextCallback, ComplexObject } from './types';
export const getNext = (next: NextCallback) =>
  new Promise<ComplexObject>((r, e) => {
    try {
      r(next());
    } catch (error) {
      e(error as Error);
    }
  });
