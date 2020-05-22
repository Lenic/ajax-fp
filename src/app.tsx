import React, { useEffect, useState } from 'react';

import { ajax } from './http';
import { ComplexObject } from './networkService';
import { CancelTokenPlugin } from './cancelToken';
import { common } from './networkService/plugins/common';
import { defaultAjaxConfig, DefaultAjaxResult } from './api';
import { ResponseHeaderPlugin } from './networkService/plugins/responseHeaders';

import './app.less';

export const App = () => {
  const [date, setDate] = useState(new Date());
  const [ajaxData, setAjaxData] = useState('');
  const [headers, setHeaders] = useState({} as ComplexObject);

  useEffect(() => {
    const token = new CancelTokenPlugin();
    ajax
      .push(token)
      .push(new ResponseHeaderPlugin())
      .push(common(null, (_, res) => ({ date: new Date(res.headers['date']) })))
      .send<DefaultAjaxResult>(defaultAjaxConfig)
      .then(r => {
        console.log(r);
        setDate(r.date);
        setHeaders(r.headers);
        setAjaxData(r.data.custom);
      });

    return () => token.cancel();
  }, []);

  return (
    <div className="container">
      <div>Hello - {ajaxData}</div>
      <div>World - {date.toString()}</div>
      <div className="code">{JSON.stringify(headers, null, '  ')}</div>
    </div>
  );
};
