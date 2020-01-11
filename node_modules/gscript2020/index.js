/*global functions*/
function bySel(x) { return document.querySelector(x) };
function byId(x) { return document.getElementById(x) };
function byClass(x) { return document.getElementsByClassName(x) };
function bySelAll(x) { return document.querySelectorAll(x) };
function deleteThis(x,y) { return setTimeout(function(){ x.remove()},y)};
function makeFull(x) {return x.className = x.className + "_full" };
function takeFull(x) { var y,z; return y = x.className.split('_full'), z = y[0], x.className = z };
function createEle(x) { return document.createElement(x) };
function byTag(x, y) { if (!y || y === null) {y = 0}  return document.getElementsByTagName(x)[y] };
function makeLock(x) { return x.className = x.className + "_locked" };
function takeLock(x) { var y, z; return y = x.className.split("_locked"), z = y[0], x.className = z };
function myHeight() { return screen.height };
function myWidth() { return screen.width };
function thisHeight(x) { return x.clientHeight };
function thisWidth(x) { return x.clientWidth };
function makeCollide(x) { return x.className = x.className + "_collide" };
function makeLeft(x) {return x.className = x.className + "_left" };
function takeLeft(x) { var y,z; return y = x.className.split('_left'), z = y[0], x.className = z };
function makeCenter(x) {return x.className = x.className + "_center" };
function takeCenter(x) { var y,z; return y = x.className.split('_center'), z = y[0], x.className = z };
function makeRight(x) {return x.className = x.className + "_right" };
function takeRight(x) { var y,z; return y = x.className.split('_right'), z = y[0], x.className = z };
function makeFade(x) {return x.className = x.className + "_fade" };
function takeFade(x) { var y,z; return y = x.className.split('_fade'), z = y[0], x.className = z };
function tfs(x) { openFullscreen(body) };
function openFullscreen(x,y) { return function() { x.disabled = true, y.disabled = false; if (document.body.requestFullscreen) {return document.body.requestFullscreen();} else if (document.body.mozRequestFullScreen) { /* Firefox */document.body.mozRequestFullScreen();} else if (document.body.webkitRequestFullscreen) { /* Chrome, Safari & Opera */document.body.webkitRequestFullscreen();} else if (document.body.msRequestFullscreen) { /* IE/Edge */document.body.msRequestFullscreen();} }}
function closeFullScreen(x,y) { return function(){ x.disabled = true, y.disabled = false; if (document.exitFullscreen) {document.exitFullscreen();} else if (document.mozCancelFullScreen) { /* Firefox */document.mozCancelFullScreen();} else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */document.webkitExitFullscreen();} else if (document.msExitFullscreen) { /* IE/Edge */document.msExitFullscreen();} }};
function currentTime(){ return Math.round(new Date().getTime()/1000) };
function runTimer(x){ return setTimeout(function(){ x.innerHTML = currentTime(); runTimer(x); },900) };
function inputValidate(x,y){ return function(){ var d = x.value.trim(); if (d.length === 0) { return false } else { x.value = ""; /*work in progress*/ } } };

/* local storage */
function saveLS(x, y) { return localStorage.setItem(x, JSON.stringify(y)) };
function loadLS(x) { return localStorage.getItem(x) };
function parseLS(x) { var y = loadLS(x), z = JSON.parse(y); return z };
function clearLS() { return localStorage.clear() };
function removeLSitem(x) { return localStorage.removeItem(x) };
function LSinit(x,y) {var keyname = localStorage.getItem(x);if (!keyname || keyname === null) {localStorage.setItem(x, JSON.stringify(y));};};

/* session storage */
function saveSS(x, y) { return sessionStorage.setItem(x, JSON.stringify(y)) };
function loadSS(x) { return sessionStorage.getItem(x) };
function parseSS(x) { var y = loadSS(x), z = JSON.parse(y); return z };
function clearSS() { return sessionStorage.clear() };
function removeSSitem(x) { return sessionStorage.removeItem(x) };
function SSinit(x,y) {var keyname = sessionStorage.getItem(x);if (!keyname || keyname === null) {sessionStorage.setItem(x, JSON.stringify(y));} else {var k = x.split("user_");var g = +k[1];g++;var i = x.split(k[1]);var z = i[0] + g;}};
