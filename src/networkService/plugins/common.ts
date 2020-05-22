import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject } from '../types';

class CommonPlugin implements IPlugin {
  constructor(
    public requestAction: null | ((previous: PluginResult, config: AjaxConfig, body?: AjaxParameter) => PluginResult),
    public responseAction: null | ((previous: PluginResult, res: ResponseObject) => PluginResult)
  ) {}

  onRequest(next: NextCallback, config: AjaxConfig, data?: AjaxParameter): PluginResult {
    return Promise.resolve(next()).then(v => ({
      ...v,
      ...(typeof this.requestAction === 'function' ? this.requestAction(v, config, data) : null)
    }));
  }

  onResponse(next: NextCallback, res: ResponseObject): PluginResult {
    return Promise.resolve(next()).then(v => ({
      ...v,
      ...(typeof this.responseAction === 'function' ? this.responseAction(v, res) : null)
    }));
  }
}

export const common = (
  requestAction: null | ((previous: PluginResult, config: AjaxConfig, body?: AjaxParameter) => PluginResult),
  responseAction: null | ((previous: PluginResult, res: ResponseObject) => PluginResult)
) => {
  return new CommonPlugin(requestAction, responseAction);
};
