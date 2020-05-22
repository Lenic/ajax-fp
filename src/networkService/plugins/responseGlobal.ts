import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject } from '../types';

export class ResponseGlobalPlugin implements IPlugin {
  onRequest(next: NextCallback, _: AjaxConfig, __?: AjaxParameter): PluginResult {
    return next();
  }

  onResponse(next: NextCallback, _: ResponseObject): PluginResult {
    // TODO: 在这里可以处理全局逻辑，将 networkService 中的全局逻辑转移到这里即可。
    return next();
  }
}
