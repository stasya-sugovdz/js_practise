// var i = 0;
// function onStart() {
//   var timerId = setTimeout(function () {
//       if(i < 30) {
//         i++;
//         (i < 10) ? document.getElementById('seconds').innerHTML = '0' + i : document.getElementById('seconds').innerHTML = '' + i;
//         onStart();
//       }
//     }, 1000);
//   return timerId;
// }
var i = 1;
var go = true;
var reverse = false;


var timer = function() {
  var timerId = setTimeout(function time() {
    (i < 10) ? document.getElementById('seconds').innerHTML = ' 0' + i : document.getElementById('seconds').innerHTML = '' + i;

    if(i < 30 && go && !reverse) {
      setTimeout(time, 1000);
      i++;
    } else if(reverse && go && i <= 30 && i > 0) {
      setTimeout(time, 1000);
      i--;
    }
    }, 1000);
  return timerId;
};

function onStart() {
  timer();
  go = true;
  reverse = false;
}

function onStop() {
  go = false;
  clearTimeout(timer);
}

function onSetZero() {
  //go = false;
  i = 0;
  //clearTimeout(timer);
  document.getElementById('seconds').innerHTML = ' 00';
}

function onReverse() {
  if(i === 0 || i === 1) i = 30;
  go = true;
  reverse = true;
  timer();
}

