import './style.css';

const findOnPageSerrchButton = document.querySelector(
  '#findOnPageSearch button'
);
const findOnPageInput = document.querySelector('#findOnPageInput');

findOnPageInput.addEventListener('keypress', (event) => {
  console.log(event.key);
  if (event.key.toLowerCase() === 'enter') {
    findOnPage();
  }
});

function findOnPage() {
  const searchValue = findOnPageInput.value;
  findOnPageInput.value = '';
  if (searchValue) {
    location.replace(`/#:~:text=${searchValue}`);
  }
}

findOnPageSerrchButton.addEventListener('click', () => {
  findOnPage();
});
