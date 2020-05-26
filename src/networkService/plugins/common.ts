import { getNext } from '../utils';
import { IPlugin, AjaxConfig, AjaxParameter, NextCallback, PluginResult, ResponseObject, ExtraOptions } from '../types';

class CommonPlugin implements IPlugin {
  constructor(
    public requestAction:
      | null
      | ((previous: PluginResult, config: AjaxConfig, body: AjaxParameter, opts: ExtraOptions) => PluginResult),
    public responseAction:
      | null
      | ((
          previous: PluginResult,
          res: ResponseObject,
          config: AjaxConfig,
          body: AjaxParameter,
          opts: ExtraOptions
        ) => PluginResult),
    public errorAction:
      | null
      | ((
          previous: PluginResult,
          error: Error,
          config: AjaxConfig,
          body: AjaxParameter,
          opts: ExtraOptions
        ) => PluginResult)
  ) {}

  onRequest(next: NextCallback, config: AjaxConfig, data: AjaxParameter, opts: ExtraOptions): PluginResult {
    return getNext(next).then(v => ({
      ...v,
      ...(typeof this.requestAction === 'function' ? this.requestAction(v, config, data, opts) : null)
    }));
  }

  onResponse(
    next: NextCallback,
    res: ResponseObject,
    config: AjaxConfig,
    data: AjaxParameter,
    opts: ExtraOptions
  ): PluginResult {
    return getNext(next).then(v => ({
      ...v,
      ...(typeof this.responseAction === 'function' ? this.responseAction(v, res, config, data, opts) : null)
    }));
  }

  onError(next: NextCallback, error: Error, config: AjaxConfig, data: AjaxParameter, opts: ExtraOptions): PluginResult {
    return getNext(next).then(e => ({
      ...e,
      ...(typeof this.errorAction === 'function' ? this.errorAction(e, error, config, data, opts) : null)
    }));
  }
}

export const common = (
  requestAction?:
    | null
    | ((previous: PluginResult, config: AjaxConfig, body: AjaxParameter, opts: ExtraOptions) => PluginResult),
  responseAction?:
    | null
    | ((
        previous: PluginResult,
        res: ResponseObject,
        config: AjaxConfig,
        body: AjaxParameter,
        opts: ExtraOptions
      ) => PluginResult),
  errorAction?:
    | null
    | ((
        previous: PluginResult,
        error: Error,
        config: AjaxConfig,
        body: AjaxParameter,
        opts: ExtraOptions
      ) => PluginResult)
) => {
  return new CommonPlugin(requestAction || null, responseAction || null, errorAction || null);
};
