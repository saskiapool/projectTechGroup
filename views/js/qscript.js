const slider = document.querySelector('.slider');
const val = document.getElementById('dateValue');
const smile = document.getElementById('smiley');

slider.addEventListener('input', () => {
  val.value = slider.value;
});

slider.oninput = function() {
  if (slider.value < 40) {
    val.value = slider.value;
    smile.src='../img/sad.png';
  }
  if (slider.value > 65) {
    val.value = slider.value;
    smile.src='../img/happy.png';
  } if (slider.value > 40 && slider.value < 65) {
    val.value = slider.value;
    smile.src='../img/null.png';
  }
}

