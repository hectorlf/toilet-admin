import _ from 'lodash';
import css from 'bootstrap/dist/css/bootstrap.css';
import css from 'font-awesome/css/font-awesome.css';
import css from './custom.css';

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

document.body.appendChild(component());
