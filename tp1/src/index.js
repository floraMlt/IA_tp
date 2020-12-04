import './styles/main.scss';

import Webgl from './webgl/Webgl';

const $mainCanvas = document.body.querySelector('#maincanvas')
var webgl = new Webgl($mainCanvas);
webgl.start();

var nameInput = document.getElementById('text');

document.querySelector('#text').addEventListener('input', function (e) {
    e.preventDefault();
    console.log(nameInput.value);    
});
