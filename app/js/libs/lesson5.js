var i = 0;
function onStart() {
  var timerId = setTimeout(function () {
      if(i < 30) {
        i++;
        (i < 10) ? document.getElementById('seconds').innerHTML = '0' + i : document.getElementById('seconds').innerHTML = '' + i;
        onStart();
      }
    }, 1000);
  return timerId;
}

function onStop() {
  
}

function onSetZero() {
  var timerId = onStart();
  clearTimeout(timerId);
}

function onReverse() {
  
}
window.onload = onStart;