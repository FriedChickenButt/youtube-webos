import './spatial-navigation-polyfill.js';
import './ui.css';
import {configRead, configWrite} from './config.js';

// We handle key events ourselves.
window.__spatialNavigation__.keyMode = 'NONE';

const ARROW_KEY_CODE = {37: 'left', 38: 'up', 39: 'right', 40: 'down'};

const uiContainer = document.createElement('div');

uiContainer.classList.add('ytaf-ui-container');
uiContainer.style['display'] = 'none';
uiContainer.setAttribute('tabindex', 0);
uiContainer.addEventListener('focus', () => console.info('uiContainer focused!'), true);
uiContainer.addEventListener('blur', () => console.info('uiContainer blured!'), true);

uiContainer.addEventListener("keydown", (evt) => {
  console.info('uiContainer key event:', evt.type, evt.charCode);
  if (evt.charCode !== 404 && evt.charCode !== 172) {
    if (evt.keyCode in ARROW_KEY_CODE) {
      navigate(ARROW_KEY_CODE[evt.keyCode]);
    } else if (evt.keyCode === 13) { // "OK" button
      document.querySelector(':focus').click();
    } else if (evt.keyCode === 27) { // Back button
      uiContainer.style.display = 'none';
      uiContainer.blur();
    }
    evt.preventDefault();
    evt.stopPropagation();
  }
}, true);

uiContainer.innerHTML = `
<h1>webOS YouTube Extended</h1>
<label for="__adblock"><input type="checkbox" id="__adblock" /> Enable AdBlocking</label>
<label for="__sponsorblock"><input type="checkbox" id="__sponsorblock" /> Enable SponsorBlock<div><small>Sponsor segments skipping - https://sponsor.ajay.app</small></div></label>
`;

document.querySelector('body').appendChild(uiContainer);

uiContainer.querySelector('#__adblock').checked = configRead('enableAdBlock');
uiContainer.querySelector('#__adblock').addEventListener('change', (evt) => {
  configWrite('enableAdBlock', evt.target.checked);
});

uiContainer.querySelector('#__sponsorblock').checked = configRead('enableSponsorBlock');
uiContainer.querySelector('#__sponsorblock').addEventListener('change', (evt) => {
  configWrite('enableSponsorBlock', evt.target.checked);
});

const eventHandler = (evt) => {
  console.info('Key event:', evt.type, evt.charCode, evt.keyCode, evt.defaultPrevented);
  if (evt.charCode == 404 || evt.charCode == 172) {
    console.info('Taking over!');
    evt.preventDefault();
    evt.stopPropagation();
    if (evt.type === 'keydown') {
      if (uiContainer.style.display === 'none') {
        console.info('Showing and focusing!');
        uiContainer.style.display = 'block';
        uiContainer.focus();
      } else {
        console.info('Hiding!');
        uiContainer.style.display = 'none';
        uiContainer.blur();
      }
    }
    return false;
  }
  return true;
};

// Red, Green, Yellow, Blue
// 403, 404, 405, 406
// ---, 172, 170, 191
document.addEventListener("keydown", eventHandler, true);
document.addEventListener("keypress", eventHandler, true);
document.addEventListener("keyup", eventHandler, true);
