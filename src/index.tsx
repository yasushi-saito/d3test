// Copyright 2020 Luminary Cloud, Inc. All Rights Reserved.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Stuff } from './Stuff.tsx';
import { TimePicker } from './TimePicker.tsx';

ReactDOM.render(
  <div>
    <CssBaseline />
    Hello, world
    <div style={{border:"solid"}}>
      <Stuff />
      </div>
    <div style={{border:"solid"}}>
      <TimePicker max={100}/>
      </div>
  </div>,
  document.getElementById('root')
);
