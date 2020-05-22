import React, { useEffect, useState } from 'react';

import { ajax } from './http';
import { ComplexObject } from './networkService';
import { common } from './networkService/plugins/common';
import { CancelTokenPlugin } from './cancelToken';
import { ResponseHeaderPlugin } from './networkService/plugins/responseHeaders';
import { defaultAjaxConfig, DefaultAjaxResult } from './api';

import './app.less';

export const App = () => {
  const [ajaxData, setAjaxData] = useState('');
  const [headers, setHeaders] = useState({} as ComplexObject);
  useEffect(() => {
    const token = new CancelTokenPlugin();
    ajax
      .push(new ResponseHeaderPlugin())
      .push(common(null, (_, res) => ({ etag: res.headers['etag'] })))
      .push(token)
      .send<DefaultAjaxResult>(defaultAjaxConfig)
      .then(r => {
        console.log(r);
        setHeaders(r.headers);
        setAjaxData(r.data.custom);
      });

    return () => token.cancel();
  }, []);

  return (
    <div className="container">
      <div>Hello - {ajaxData}</div>
      <div className="code">{JSON.stringify(headers, null, '  ')}</div>
    </div>
  );
};
