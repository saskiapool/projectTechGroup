const slider = document.querySelector('.slider');
const val = document.getElementById('dateValue');

slider.addEventListener('input', () => {
  val.value = slider.value;
});
