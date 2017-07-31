function removeExistActive() {
  var parent = document.querySelector('.lesson3');
  var e = parent.querySelector('#active');

  if(e) {
     e.removeAttribute('id')
  }
}

function getFirst() {
  removeExistActive();
  var parent = document.querySelector('.lesson3');
  var e = parent.querySelectorAll('.square');

  e[0].setAttribute('id', 'active');
}

function getLast() {
  removeExistActive();
  var parent = document.querySelector('.lesson3');
  var e = parent.querySelectorAll('.square');
  var last = e.length - 1;
  e[last].setAttribute('id', 'active');
}

function getCurrentElement(val) {
  var parent = document.querySelector('.lesson3'),
      e = parent.querySelectorAll('.square'),
      last = e.length - 1,
      currentElement = parent.querySelector('#active');
  var start = 0,
      finish = last,
      currentSibling = 'nextElementSibling';

  if( val === 'previous') {
    start = last;
    finish = 0;
    currentSibling = 'previousElementSibling' ;
  }

  switch (currentElement) {
    case null:
      e[start].setAttribute('id', 'active');
      break;
    case e[finish]:
      e[finish].removeAttribute('id');
      e[start].setAttribute('id', 'active');
      break;
    default:
      currentElement[currentSibling].setAttribute('id', 'active');
      currentElement.removeAttribute('id');
  }
}

function getNext() {
  getCurrentElement('next');
}

function getPrevious() {
  getCurrentElement('previous');
}

function addElement() {
  var parent = document.querySelector('.lesson3');
  var newItem = document.createElement('DIV');
  parent.appendChild(newItem).setAttribute('class', 'square');
}

function deleteElement() {
  var parent = document.querySelector('.lesson3');
  var list = parent.childNodes;
  if (list.length > 3 ) {parent.removeChild(list[(list.length - 1)])}
}

function addToStart() {
  var parent = document.querySelector('.lesson3');
  var newItem = document.createElement('DIV');
  var list = parent.childNodes;
  parent.insertBefore(newItem, list[0]).setAttribute('class', 'square');
}