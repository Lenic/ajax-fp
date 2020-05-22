import { AjaxConfig } from './networkService';
export const defaultAjaxConfig: AjaxConfig = {
  url: '/some/path',
  method: 'GET'
};

export interface DefaultAjaxResult {
  etag: string;
  headers: { [key: string]: string };
  data: {
    custom: string;
  };
}
