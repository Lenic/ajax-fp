import axios, { CancelTokenSource } from 'axios';
import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject } from './networkService/types';

export class CancelTokenPlugin implements IPlugin {
  private $source: CancelTokenSource = axios.CancelToken.source();

  onRequest(next: NextCallback, _: AjaxConfig, __?: AjaxParameter): PluginResult {
    this.$source = axios.CancelToken.source();

    return Promise.resolve(next()).then(v => ({ ...v, cancelToken: this.$source.token }));
  }

  onResponse(next: NextCallback, _: ResponseObject): PluginResult {
    return next();
  }

  cancel(message?: string) {
    this.$source.cancel(message);
  }
}
