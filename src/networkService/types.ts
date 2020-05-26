export interface AjaxObjectConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}
export type AjaxConfig = AjaxObjectConfig | string;

export interface ComplexObject {
  [key: string]: any;
}
export type AjaxParameter = ComplexObject | number | boolean | string | null;
export interface ExtraOptions extends ComplexObject {
  ajax: CreationResult;
}

export interface ResponseObject {
  data: any;
  headers: any;
  status: number;
  statusText: string;
  config: AjaxConfig;
  body?: AjaxParameter;
}

export type PluginResult = ComplexObject | Promise<ComplexObject>;
export type NextCallback = () => PluginResult;
export interface IPlugin {
  onRequest(next: NextCallback, config: AjaxConfig, body?: AjaxParameter, opts?: ExtraOptions): PluginResult;
  onResponse(
    next: NextCallback,
    res: ResponseObject,
    config: AjaxConfig,
    body: AjaxParameter,
    opts: ExtraOptions
  ): PluginResult;
  onError(next: NextCallback, error: Error, config: AjaxConfig, body: AjaxParameter, opts: ExtraOptions): PluginResult;
}

export interface CreationResult {
  push(...newPlugins: IPlugin[]): CreationResult;
  send<T extends ComplexObject>(config: AjaxConfig, data?: AjaxParameter, opts?: ExtraOptions): Promise<T>;
}

export interface AjaxOptions {
  requestAction: (config: AjaxConfig, data: AjaxParameter, opts: ExtraOptions) => PluginResult;
  errorAction: (error: Error, config: AjaxConfig, data: AjaxParameter, opts: ExtraOptions) => PluginResult;
  responseAction: (res: ResponseObject, config: AjaxConfig, data: AjaxParameter, opts: ExtraOptions) => PluginResult;
}

export type AjaxExecutor = (arg: ComplexObject) => Promise<ResponseObject>;
export type AjaxCreation = (executor: AjaxExecutor, plugins: IPlugin[], options: AjaxOptions) => CreationResult;
