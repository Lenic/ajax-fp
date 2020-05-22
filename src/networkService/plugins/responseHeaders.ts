import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject } from '../types';

export class ResponseHeaderPlugin implements IPlugin {
  onRequest(next: NextCallback, _: AjaxConfig, __?: AjaxParameter): PluginResult {
    return next();
  }

  onResponse(next: NextCallback, res: ResponseObject): PluginResult {
    return Promise.resolve(next()).then(data => ({
      ...data,
      headers: res.headers
    }));
  }
}
