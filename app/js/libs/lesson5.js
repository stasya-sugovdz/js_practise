//timer functionality
var count = 1;
var go = true;
var reverse = false;

var timer = function() {
  var timerId = setTimeout(function time() {
    (count < 10) ? document.getElementById('seconds').innerHTML = ' 0' + count : document.getElementById('seconds').innerHTML = ' ' + count;

    if(count < 30 && go && !reverse) {
      setTimeout(time, 1000);
      count++;
    } else if(reverse && go && count <= 30 && count > 0) {
      setTimeout(time, 1000);
      count--;
    }
    }, 1000);
  return timerId;
};

function onStart() {
  onStop();
  reverse = false;
  go = true;
  timer();
}

function onStop() {
  go = false;
  clearTimeout(timer());
}

function onSetZero() {
  //go = false;
  count = 0;
  //clearTimeout(timer);
  document.getElementById('seconds').innerHTML = ' 00';
}

function onReverse() {
  onStop();
  if(count === 0 || count === 1) count = 30;
  reverse = true;
  go = true;
  timer();
}

//string transformation

function getText() {
  var text = prompt('Please, enter text', 'some text');
  if(text) {
    var newText = text.replace(',', '').replace('.', '').replace('!', '').replace('?', '');
    outputText(newText);
    countA(newText)
  }
  // var parent = document.querySelector('.str-transform__result');
  // var children = parent.querySelectorAll('li');
  // if( children.length !== 0) {
  //   for(var i = 0; i < children.length; i++) {
  //     parent.removeChild(children[i]);
  //   }
  // }
}

function outputText(val) {
  var arr = val.split(' ');

  var parent = document.querySelector('.str-transform__result');
  var newItem = document.createElement('LI');
  var place = parent.appendChild(newItem);

  place.innerHTML = arr[0].toUpperCase();

  for(var i = 1; i < arr.length; i++) {
    var currItem = document.createElement('LI');
    var currPlace = parent.appendChild(currItem);
    currPlace.innerHTML = arr[i];

    if(arr[(arr.length - 1)] || arr[(arr.length - 2)]) {
      currPlace.innerHTML = arr[i].toLowerCase();
    }
  }
}

function countA(val) {
  var counter = val.split(/a/gi).length - 1;
  (counter) ? alert('Text includes: ' + counter + ' "a"') : alert('There is no "a" in the text');
}