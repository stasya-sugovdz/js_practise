function removeExistActive() {
  var parent = document.querySelector('.content-holder');
  var e = parent.querySelector('#active');

  if(e) {
     e.removeAttribute('id')
  }
}

function getFirst() {
  removeExistActive();
  var parent = document.querySelector('.content-holder');
  var e = parent.querySelectorAll('.square');

  e[0].setAttribute('id', 'active');
}

function getLast() {
  removeExistActive();
  var parent = document.querySelector('.content-holder');
  var e = parent.querySelectorAll('.square');
  var last = e.length - 1;
  e[last].setAttribute('id', 'active');
}

function getCurrentElement(val) {
  var parent = document.querySelector('.content-holder');
  var e = parent.querySelectorAll('.square');
  var last = e.length - 1;
  var currentElement = parent.querySelector('#active');
    if(val === 'next') {
      switch (currentElement) {
        case null:
          e[0].setAttribute('id', 'active');
          break;
        case e[last]:
          e[last].removeAttribute('id');
          e[0].setAttribute('id', 'active');
          break;
        default:
          currentElement.nextElementSibling.setAttribute('id', 'active');
          currentElement.removeAttribute('id');
      }
    } else {
      switch (currentElement) {
        case null:
          e[last].setAttribute('id', 'active');
          break;
        case e[0]:
          e[0].removeAttribute('id');
          e[last].setAttribute('id', 'active');
          break;
        default:
          currentElement.previousElementSibling.setAttribute('id', 'active');
          currentElement.removeAttribute('id');
      }
    }
}

function getNext() {
  getCurrentElement('next');
}

function getPrevious() {
  getCurrentElement('previous');
}

function addElement() {
  var parent = document.querySelector('.content-holder');
  var newItem = document.createElement('DIV');
  parent.appendChild(newItem).setAttribute('class', 'square');
}

function deleteElement() {
  var parent = document.querySelector('.content-holder');
  var list = parent.childNodes;
  if (list.length > 3 ) {parent.removeChild(list[(list.length - 1)])};
}

function addToStart() {
  var parent = document.querySelector('.content-holder');
  var newItem = document.createElement('DIV');
  var list = parent.childNodes;
  parent.insertBefore(newItem, list[0]).setAttribute('class', 'square');
}