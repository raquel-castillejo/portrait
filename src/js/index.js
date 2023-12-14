/*
menu principal: instrucciones y personajes

❌ click sobre personaje -> pagina de personaje

✅ parece el personaje con cara 
✅ tras 5 segundos se quita la cara
✅ aparecen las piezas

✅ click (sostenido) sobre una pieza
✅ la pieza se mueve con el raton
✅ al soltar, la pieza queda donde soltaste -> tiene que ser sobre el dibujo, 
✅ si no, vuelve a la posicion original o no se suelta

-- que las piezas estén en las capas correctas (la nariz encima de los ojos y la boca, p.ej.)

click sobre boton de terminado

calcular la posicion de la pieza 
comparar con la posicion correcta de la pieza
asignar un porcentaje de acierto/error

mostrar el resultado final en pantalla

aparece boton volver a jugar
*/
// resources
// ---------
// videos -> https://www.youtube.com/watch?v=wBnHmV_LBpE
// summary -> https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/
// mdn -> https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

// DOM
// ===
/*
// 🟦🟦 Quiero generar el puzle dependiendo del personaje que escojas antes
// ¿puedo hacerlo con JS o tengo que tener un enlace por personaje?
// las lineas siguientes me dan error porque al cambiar de página deja de existir la lista
const charactersListElement = document.getElementById('choose-character');
const characterElements = [...charactersListElement.children];
*/

// const puzzlePieces = document.getElementsByClassName('piece');
// const puzzlePiecesArr = [...puzzlePieces];

const puzzleBaseElement = document.getElementById('puzzle-base');
const puzzlePiecesElement = document.getElementById('puzzle-pieces');

// VARIABLES
// =========
const BASE_SRC = './assets/images/characters';
const CHARACTER = 'LUIGI'; // default: luigi (porque es el que tengo hecho en imgs)
const PUZZLES_COORDS = [
	{
		character: 'LUIGI',
		facePieces: [
			{
				id: 'luigi-eyebrow-l',
				src: `EYEBROW_LEFT.png`,
				top: 257,
				left: 202.5,
				zPos: 2
			},
			{
				id: 'luigi-eyebrow-r',
				src: `EYEBROW_RIGHT.png`,
				top: 222,
				left: 317.5,
				zPos: 2
			},
			{
				id: 'luigi-eye-l',
				src: `EYE_LEFT.png`,
				top: 309,
				left: 247.5,
				zPos: 1
			},
			{
				id: 'luigi-eye-r',
				src: `EYE_RIGHT.png`,
				top: 290,
				left: 341.5,
				zPos: 1
			},
			{ id: 'luigi-nose', src: `NOSE.png`, top: 354, left: 351.5, zPos: 3 },
			{
				id: 'luigi-mustache',
				src: `MUSTACHE.png`,
				top: 433,
				left: 263.5,
				zPos: 2
			},
			{ id: 'luigi-mouth', src: `MOUTH.png`, top: 509, left: 317.5, zPos: 1 }
		]
	}
];

// FUNCTIONS
// =========
/*
// para hacer el puzle dependiendo del personaje
const choseCharacter = event => {
	chosenCharacter = event.target.textContent;
	console.log(chosenCharacter);
};
console.log(chosenCharacter);
*/

// ------------------------------------------------------

// PINTAR EL PUZZLE
// pintar las piezas del puzzle
const setPuzzlePieces = () => {
	const characterInfo = PUZZLES_COORDS.find(puzzle => {
		return puzzle.character === CHARACTER;
	});

	const fragment = document.createDocumentFragment();
	characterInfo.facePieces.forEach(piece => {
		const puzzlePiece = document.createElement('img');
		puzzlePiece.src = `${BASE_SRC}/${CHARACTER}/${piece.src}`;
		puzzlePiece.classList.add('piece');
		puzzlePiece.id = piece.id;
		puzzlePiece.addEventListener('dragstart', dragStart);
		fragment.append(puzzlePiece);
	});
	puzzlePiecesElement.textContent = '';
	puzzlePiecesElement.append(fragment);
};

// pintar la base del puzzle
const setPuzzleBase = imgSrc => {
	puzzleBaseElement.textContent = '';

	const puzzleImage = document.createElement('img');
	puzzleImage.src = imgSrc;
	puzzleImage.draggable = false;
	puzzleBaseElement.append(puzzleImage);
};

// cuenta atras para empezar el puzzle
const startPuzzleCountdown = () => {
	const countdownTxt = '¡Mira atentamente la imagen!';
	let countdownNumber = 7;

	const countdown = setInterval(() => {
		countdownNumber--;
		puzzlePiecesElement.textContent = countdownTxt + countdownNumber;
		if (countdownNumber === 0) {
			clearInterval(countdown);
			setPuzzlePieces();
			// setPuzzleBase(`${BASE_SRC}/${CHARACTER}/CLEAN.png`);
		}
	}, 1000);
};

// pintar el puzzle
const setPuzzle = () => {
	setPuzzleBase(`${BASE_SRC}/${CHARACTER}/ORIGINAL.png`);
	startPuzzleCountdown();
};
setPuzzle(CHARACTER);

// ------------------------------------------------------

// para la corrección de la posición de la pieza una vez se suelta
const getDragStartPosition = (event, draggedPiece) => {
	// Get mouse position relative to div or element -> https://www.youtube.com/watch?v=JCvuj8nlpzQ

	const pieceBoundaries = draggedPiece.getBoundingClientRect();

	const positionX = event.clientX - pieceBoundaries.left;
	const positionY = event.clientY - pieceBoundaries.top;

	draggedPiece.style.setProperty('--top-correction', `-${positionY + 4}px`);
	draggedPiece.style.setProperty('--left-correction', `-${positionX + 4}px`);
	// draggedPiece.classList.add('dragged-piece');

	return [positionX, positionY];
};

const dragStart = event => {
	console.log('DRAGGED');
	const piece = document.getElementById(event.target.id);

	const positions = getDragStartPosition(event, piece);
	event.dataTransfer.setData('text/plain', event.target.id);
	event.dataTransfer.setDragImage(piece, positions[0], positions[1]);
};

const dragOver = event => event.preventDefault();

// para la corrección de la posición de la pieza una vez se suelta
const getDropPosition = (event, droppedPiece) => {
	// Get mouse position relative to div or element -> https://www.youtube.com/watch?v=JCvuj8nlpzQ

	const puzzleBoundaries = puzzleBaseElement.getBoundingClientRect();

	const positionX = event.clientX - puzzleBoundaries.left;
	const positionY = event.clientY - puzzleBoundaries.top;

	droppedPiece.style.setProperty('--top-pos', `${positionY}px`);
	droppedPiece.style.setProperty('--left-pos', `${positionX}px`);
	droppedPiece.style.setProperty('--z-index', `${positionX}px`);

	console.log(droppedPiece);
	console.log('POS X = ' + positionX);
	console.log('POS Y = ' + positionY);
};

const drop = event => {
	event.preventDefault();

	const pieceId = event.dataTransfer.getData('text/plain');
	const piece = document.getElementById(pieceId);
	getDropPosition(event, piece);
	piece.classList.add('dropped-piece');
	piece.classList.remove('piece');
	piece.draggable = false;

	event.target.parentElement.append(piece);
};

// EVENTS
// ======
/*
// para hacer el puzzle
characterElements.forEach(character => {
	character.addEventListener('click', choseCharacter);
});
*/

// drag and drop
puzzleBaseElement.addEventListener('dragover', dragOver);
puzzleBaseElement.addEventListener('drop', drop);
