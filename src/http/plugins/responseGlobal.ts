import {
  IPlugin,
  AjaxConfig,
  AjaxParameter,
  NextCallback,
  PluginResult,
  ResponseObject,
  ExtraOptions
} from '../../networkService';

export class ResponseGlobalPlugin implements IPlugin {
  onRequest(next: NextCallback, _: AjaxConfig, __: AjaxParameter, ___: ExtraOptions): PluginResult {
    return next();
  }

  onResponse(
    next: NextCallback,
    _: ResponseObject,
    __: AjaxConfig,
    ___: AjaxParameter,
    ____: ExtraOptions
  ): PluginResult {
    // TODO: 在这里可以处理全局逻辑，将 networkService 中的全局逻辑转移到这里即可。
    return next();
  }

  onError(next: NextCallback, _: Error, __: AjaxConfig, ___: AjaxParameter, ____: ExtraOptions): PluginResult {
    return next();
  }
}
