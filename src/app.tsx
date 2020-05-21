import React, { useEffect, useState } from 'react';

import { ajax } from './http';
import { defaultAjaxConfig } from './api';

import './app.less';

export const App = () => {
  const [ajaxData, setAjaxData] = useState('');
  useEffect(() => {
    ajax.send(defaultAjaxConfig).then(v => {
      console.log(v);
      setAjaxData(v.r.custom);
    });
  }, []);

  return <div className="container">Hello - {ajaxData}</div>;
};
