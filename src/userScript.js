import 'whatwg-fetch';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './domrect-polyfill';

import {handleLaunch} from './utils';

document.addEventListener('webOSRelaunch', (evt) => {
  console.info('RELAUNCH:', evt, window.launchParams);
  handleLaunch(evt.detail);
}, true);

import './adblock.js';
import './sponsorblock.js';
import './ui.js';
