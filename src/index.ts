import * as _ from 'lodash';
import '@/index.css';
import data1 from '@/data.json5';
import printMe from '@/print';

console.log('datajson5', data1)

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello there, hww', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());