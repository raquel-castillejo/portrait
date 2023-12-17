// DOM
// ===
const LS = window.localStorage;
const characterElements = [
	...document.getElementsByClassName('characters-list__single')
];

// FUNCTIONS
// =========

// Se puede hacer en el enlace, supongo que esto es para poder compartirlo
// ¿Cuál sería mejor en cada caso?
// ¿Hay mejores formas de hacerlo para el juego?
// https://medium.com/@cyberbotmachines/how-to-pass-value-from-one-html-page-to-another-using-javascript-3c9ab62df4d
const updateLS = chosenCharacter => {
	LS.setItem('character', JSON.stringify(chosenCharacter));
};

const chooseCharacter = event => {
	console.log(event);
	const clickedCharacter = event.target.dataset.character;
	updateLS(clickedCharacter);
};

// EVENTS
// ======
characterElements.forEach(character => {
	character.addEventListener('click', chooseCharacter);
});
