import { AjaxConfig, ComplexObject } from './networkService';
export const defaultAjaxConfig: AjaxConfig = {
  url: '/some/pathddd',
  method: 'GET'
};

export interface DefaultAjaxResult {
  date: Date;
  headers: ComplexObject;
  custom: string;
}
