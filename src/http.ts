import axios from 'axios';

import { Core, ResponseObject, AjaxExecutor } from './networkService';
import { ResponseGlobalPlugin } from './networkService/plugins/responseGlobal';

const executor: AjaxExecutor = arg => axios(arg) as Promise<ResponseObject>;
export const ajax = Core(executor, [new ResponseGlobalPlugin()], {
  requestAction: (config, data) => ({ ...config, data }),
  responseAction: v => ({ data: v.data.r })
});
