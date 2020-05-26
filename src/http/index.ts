import axios from 'axios';

import { ResponseGlobalPlugin } from './plugins/responseGlobal';
import { Core, ResponseObject, AjaxExecutor, PluginResult } from '../networkService';

const executor: AjaxExecutor = arg => axios(arg) as Promise<ResponseObject>;
export const ajax = Core(executor, [new ResponseGlobalPlugin()], {
  requestAction(config, data) {
    return { ...(typeof config === 'string' ? { url: config, method: 'POST' } : config), data };
  },
  responseAction(v) {
    return v.data.r as PluginResult;
  },
  errorAction(e) {
    return e as PluginResult;
  }
});
