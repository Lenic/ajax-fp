import { getNext } from '../../networkService/utils';
import {
  IPlugin,
  AjaxConfig,
  AjaxParameter,
  NextCallback,
  PluginResult,
  ResponseObject,
  ExtraOptions
} from '../../networkService';

export class ResponseHeaderPlugin implements IPlugin {
  onRequest(next: NextCallback, _: AjaxConfig, __: AjaxParameter, ___: ExtraOptions): PluginResult {
    return next();
  }

  onResponse(
    next: NextCallback,
    res: ResponseObject,
    __: AjaxConfig,
    ___: AjaxParameter,
    ____: ExtraOptions
  ): PluginResult {
    return getNext(next).then(data => ({
      ...data,
      headers: res.headers
    }));
  }

  onError(next: NextCallback, _: Error, __: AjaxConfig, ___: AjaxParameter, ____: ExtraOptions): PluginResult {
    return next();
  }
}
