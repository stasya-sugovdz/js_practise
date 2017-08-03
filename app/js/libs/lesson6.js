function colorsGenerator() {
  var divArr = document.querySelectorAll('.lesson6__item');
  function check(val) {
    Array.prototype.forEach.call(divArr, function(e) {
      var color = e.style.background || '';
      color = color.replace(/\s/g, '').toLowerCase();
      return (color !== val)
    });
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
      this.style.backgroundColor = '' + generatedColor + '';
      this.firstElementChild.innerHTML = this.style.backgroundColor;

      // if( checker(generatedColor) ) {
      //   this.style.backgroundColor = '' + generatedColor + '';
      //   this.firstElementChild.innerHTML = this.style.backgroundColor;
      // } else {
      //   return generatedColor = generateColor();
      // }

    };
  }
}

document.addEventListener("DOMContentLoaded", colorsGenerator);