import axios from 'axios';

import { Core, ComplexObject, ResponseObject } from './networkService';
import { ResponseWrapper } from './networkService/responseWrapper';

export const ajax = Core(
  (arg: ComplexObject) => axios(arg) as Promise<ResponseObject>,
  [new ResponseWrapper()],
  (config, data) => ({ ...config, data }),
  v => v.data
);
