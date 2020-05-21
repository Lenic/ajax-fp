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
  onResponse(res: ResponseObject, next: NextCallback): PluginResult;
}

export interface CreationResult {
  push(plugin: IPlugin): CreationResult;
  send(config: AjaxConfig, data?: AjaxParameter): Promise<any>;
}

export type AjaxExecutor = (arg: ComplexObject) => Promise<ResponseObject>;
export type AjaxCreation = (
  executor: AjaxExecutor,
  plugins: IPlugin[],
  defaultRequestNextCallback: (config: AjaxConfig, data?: AjaxParameter) => PluginResult,
  defaultResponseNextCallback: (res: ResponseObject) => PluginResult
) => CreationResult;