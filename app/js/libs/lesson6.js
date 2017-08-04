function colorsGenerator() {
  var divArr = document.querySelectorAll('.lesson6__item');

  function check(val) {
    var temp = Array.prototype.find.call(divArr, function(e) {
      var color = e.style.backgroundColor || '';
      var bigInt = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(val);
      var obj =  bigInt ? {
        r: parseInt(bigInt[1], 16),
        g: parseInt(bigInt[2], 16),
        b: parseInt(bigInt[3], 16)
      } : null;

      var result = 'rgb(' + obj.r + ', ' + obj.b + ', ' + obj.r + ')';
      return color === result
    });
    return !!temp;
  }

  function generateColor () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  for (var i = 0; i < divArr.length; i++) {

    divArr[i].onclick = function () {
      this.style.backgroundColor = "red";
    };

    divArr[i].onmouseover = function (e) {
      var generatedColor = generateColor();

      while(check(generatedColor)) {
        generatedColor = generateColor();
      }
      this.style.backgroundColor = '' + generatedColor ;
      this.firstElementChild.innerHTML = this.style.backgroundColor;

    };
  }
}

function onClosePage(e) {
  console.log('CLOSE');
  var alertWindow = document.querySelector('.close-alert');
  alertWindow.classList.add('show-alert');
}

function stayOnPage() {
  var alertWindow = document.querySelector('.show-alert');
  alertWindow.classList.remove('show-alert');
}


document.addEventListener("DOMContentLoaded", colorsGenerator);
//window.addEventListener("beforeunload", onClosePage);

//window.onbeforeunload = onClosePage;

window.onbeforeunload = function(e) {
  var dialogText = 'Dialog text here';
  e.returnValue = dialogText;
  return dialogText;
};

