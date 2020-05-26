import axios, { CancelTokenSource } from 'axios';
import {
  IPlugin,
  AjaxConfig,
  AjaxParameter,
  NextCallback,
  PluginResult,
  ResponseObject,
  ExtraOptions
} from '../../networkService/types';
import { getNext } from '../../networkService/utils';

export class CancelTokenPlugin implements IPlugin {
  private $source: CancelTokenSource = axios.CancelToken.source();

  onRequest(next: NextCallback, _: AjaxConfig, __: AjaxParameter, ___: ExtraOptions): PluginResult {
    this.$source = axios.CancelToken.source();

    return getNext(next).then(v => ({ ...v, cancelToken: this.$source.token }));
  }

  onResponse(
    next: NextCallback,
    _: ResponseObject,
    __: AjaxConfig,
    ___: AjaxParameter,
    ____: ExtraOptions
  ): PluginResult {
    return next();
  }

  onError(next: NextCallback, _: Error, __: AjaxConfig, ___: AjaxParameter, ____: ExtraOptions): PluginResult {
    return next();
  }

  cancel(message?: string) {
    this.$source.cancel(message);
  }
}
