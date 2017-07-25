function addClass() {
  var el = document.querySelectorAll('.drinks__link')[0];
  el.classList.add('newClass');
  console.log('Class list of element: ', window.getComputedStyle(el));
}

function addStyle() {
  var el = document.querySelectorAll('.drinks__link')[1];
  el.style.cssText = 'background: rgba(243, 132, 21, 0.7); padding-top: 20px; border: 2px dash orangered;';
}

function addElement() {
  var el = document.querySelectorAll('.drinks__link')[2];
  el.style.cssText = 'background: rgba(243, 243, 21, 0.7);';

  var str = '<li class="drinks__item" id="two" onclick="_addElement()">' +
              '<a class="drinks__link" >Two(click)</a>' +
            '</li>';
  el.insertAdjacentHTML('afterend', str);
}

function _addElement() {
  var str = '<li class="drinks__item" id="two_first">' +
              '<a class="drinks__link" >Two - first</a>' +
            '</li>';
  document.getElementById('two').insertAdjacentHTML('beforebegin', str);
  document.getElementById('two').firstElementChild.innerHTML = 'Two - Second';
  document.getElementById('two').setAttribute('id', 'two_second');
}

function changeElement() {
  var els = document.querySelectorAll('.drinks__link');
  (els[3].innerHTML === '4. lemonade') ? els[3].style.cssText = 'background: rgba(51, 51, 255, 0.9);' : els[5].style.cssText = 'background: rgba(51, 51, 255, 0.9);';
}