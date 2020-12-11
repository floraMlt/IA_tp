import './styles/main.scss';

import Webgl from './webgl/Webgl';

const $mainCanvas = document.body.querySelector('#maincanvas')
var webgl = new Webgl($mainCanvas);
webgl.start();
