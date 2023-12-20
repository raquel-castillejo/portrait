// DOM
// ===
const LS = window.localStorage;
const characterElements = [
	...document.getElementsByClassName('characters-list__single')
];
const rulesBtnElement = document.getElementById('rules-btn');

// FUNCTIONS
// =========
const updateLS = chosenCharacter => {
	LS.setItem('character', JSON.stringify(chosenCharacter));
};

const chooseCharacter = event => {
	let clickedCharacter;

	if (event.target.tagName !== 'A') {
		clickedCharacter = event.target.parentElement.dataset.character;
	} else {
		clickedCharacter = event.target.dataset.character;
	}
	updateLS(clickedCharacter);
};

const closeRules = () => {
	const rulesElement = document.getElementById('rules');
	rulesElement.classList.add('hidden');
};

const showRules = () => {
	const rulesElement = document.getElementById('rules');
	const closeRulesElement = document.getElementById('close-rules');
	rulesElement.classList.remove('hidden');
	closeRulesElement.addEventListener('click', closeRules);
};

// EVENTS
// ======
characterElements.forEach(character => {
	character.addEventListener('click', chooseCharacter);
});

rulesBtnElement.addEventListener('click', showRules);
