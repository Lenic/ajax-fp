import axios from 'axios';

import { ResponseGlobalPlugin } from './plugins/responseGlobal';
import { Core, ResponseObject, AjaxExecutor } from '../networkService';

const executor: AjaxExecutor = arg => axios(arg) as Promise<ResponseObject>;
export const ajax = Core(executor, [new ResponseGlobalPlugin()], {
  requestAction: (config, data) => ({ ...config, data }),
  responseAction: v => ({ data: v.data.r })
});
