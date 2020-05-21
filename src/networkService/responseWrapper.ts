import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject } from './types';

export class ResponseWrapper implements IPlugin {
  onRequest(next: NextCallback, _: AjaxConfig, __?: AjaxParameter): PluginResult {
    return next();
  }

  onResponse(res: ResponseObject, next: NextCallback): PluginResult {
    return Promise.resolve(next()).then(r => ({ c: res.status, m: res.statusText, r }));
  }
}
