export interface AjaxConfig {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface ComplexObject {
  [key: string]: any;
}
export type AjaxParameter = ComplexObject | number | boolean | string;

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
  onRequest(next: NextCallback, config: AjaxConfig, body?: AjaxParameter): PluginResult;
  onResponse(next: NextCallback, res: ResponseObject): PluginResult;
}

export interface CreationResult {
  push(plugin: IPlugin): CreationResult;
  send<T extends ComplexObject>(config: AjaxConfig, data?: AjaxParameter): Promise<T>;
}

export interface AjaxOptions {
  requestAction: (config: AjaxConfig, data?: AjaxParameter) => PluginResult;
  responseAction: (res: ResponseObject) => PluginResult;
}

export type AjaxExecutor = (arg: ComplexObject) => Promise<ResponseObject>;
export type AjaxCreation = (executor: AjaxExecutor, plugins: IPlugin[], options: AjaxOptions) => CreationResult;
