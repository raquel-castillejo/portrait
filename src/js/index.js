// resources
// ---------
// videos -> https://www.youtube.com/watch?v=wBnHmV_LBpE
// summary -> https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/
// mdn -> https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API

// DOM
// ===
const LS = window.localStorage;

const puzzleBaseElement = document.getElementById('puzzle-base');
const puzzlePiecesElement = document.getElementById('puzzle-pieces');

const rulesBtnElement = document.getElementById('rules-btn');

// VARIABLES
// =========
const BASE_SRC = './assets/images/characters';
const CHARACTER = JSON.parse(LS.getItem('character'));
// probar con luigi (porque es el que tengo hecho)

const CHARACTERS_INFO = [
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
	},
	{
		character: 'DAISY',
		facePieces: [
			{
				id: 'daisy-eyebrow-l',
				src: `EYEBROW_LEFT.png`,
				top: 329,
				left: 327,
				zPos: 2
			},
			{
				id: 'daisy-eyebrow-r',
				src: `EYEBROW_RIGHT.png`,
				top: 345,
				left: 401,
				zPos: 2
			},
			{
				id: 'daisy-eye-l',
				src: `EYE_LEFT.png`,
				top: 405,
				left: 294,
				zPos: 1
			},
			{
				id: 'daisy-eye-r',
				src: `EYE_RIGHT.png`,
				top: 414,
				left: 407,
				zPos: 1
			},
			{ id: 'daisy-nose', src: `NOSE.png`, top: 461, left: 362, zPos: 3 },
			{ id: 'daisy-mouth', src: `MOUTH.png`, top: 489, left: 372, zPos: 1 }
		]
	},
	{
		character: 'MARIO',
		facePieces: [
			{
				id: 'mario-eyebrow-l',
				src: `EYEBROW_LEFT.png`,
				top: 228,
				left: 375,
				zPos: 2
			},
			{
				id: 'mario-eyebrow-r',
				src: `EYEBROW_RIGHT.png`,
				top: 263,
				left: 477,
				zPos: 2
			},
			{
				id: 'mario-eye-l',
				src: `EYE_LEFT.png`,
				top: 355,
				left: 310,
				zPos: 1
			},
			{
				id: 'mario-eye-r',
				src: `EYE_RIGHT.png`,
				top: 337,
				left: 450,
				zPos: 1
			},
			{ id: 'mario-nose', src: `NOSE.png`, top: 394, left: 382, zPos: 3 },
			{
				id: 'mario-mustache',
				src: `MUSTACHE.png`,
				top: 425,
				left: 353,
				zPos: 2
			},
			{ id: 'mario-mouth', src: `MOUTH.png`, top: 480, left: 341, zPos: 1 }
		]
	},
	{
		character: 'PEACH',
		facePieces: [
			{
				id: 'peach-eyebrow-l',
				src: `EYEBROW_LEFT.png`,
				top: 293,
				left: 203,
				zPos: 2
			},
			{
				id: 'peach-eyebrow-r',
				src: `EYEBROW_RIGHT.png`,
				top: 269,
				left: 334,
				zPos: 2
			},
			{
				id: 'peach-eye-l',
				src: `EYE_LEFT.png`,
				top: 380,
				left: 236,
				zPos: 1
			},
			{
				id: 'peach-eye-r',
				src: `EYE_RIGHT.png`,
				top: 343,
				left: 358,
				zPos: 1
			},
			{ id: 'peach-nose', src: `NOSE.png`, top: 400, left: 265, zPos: 3 },
			{ id: 'peach-mouth', src: `MOUTH.png`, top: 468, left: 301, zPos: 1 }
		]
	}
];
const CHARACTER_PIECES = CHARACTERS_INFO.find(item => {
	return item.character === CHARACTER.toUpperCase();
}).facePieces;

// FUNCTIONS
// =========

// rules

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

// PINTAR EL PUZZLE
// pintar las piezas del puzzle
const setPuzzlePieces = () => {
	const fragment = document.createDocumentFragment();
	CHARACTER_PIECES.forEach(piece => {
		const randomOrder = Math.round(Math.random() * 11);
		const randomRotation = Math.round(Math.random() * 37) * 10;

		const puzzleDiv = document.createElement('div');
		puzzleDiv.id = piece.id;
		puzzleDiv.classList.add('piece');
		puzzleDiv.style.setProperty('--random-order', randomOrder);

		const puzzlePiece = document.createElement('img');

		puzzlePiece.src = `${BASE_SRC}/${CHARACTER.toUpperCase()}/${piece.src}`;
		puzzlePiece.style.setProperty('--random-rotation', `${randomRotation}deg`);
		puzzlePiece.dataset.rotation = randomRotation;
		puzzlePiece.classList.add('piece-img');

		puzzleDiv.addEventListener('dragstart', dragStart);
		puzzleDiv.addEventListener('click', allowRotation);

		puzzleDiv.append(puzzlePiece);
		fragment.append(puzzleDiv);
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

// cuenta atrás para empezar el puzzle
const startPuzzleCountdown = () => {
	const countdownContainerElement = document.createElement('div');
	countdownContainerElement.classList.add('puzzle-info__container');

	const countdownTxtElement = document.createElement('span');
	countdownTxtElement.classList.add('puzzle-info__txt');
	countdownTxtElement.textContent = '¡Mira atentamente la imagen!';

	const countdownNumberElement = document.createElement('span');
	let countdownNumber = 5;
	countdownNumberElement.classList.add('puzzle-info__number');
	countdownNumberElement.textContent = countdownNumber;

	countdownContainerElement.append(countdownTxtElement);
	countdownContainerElement.append(countdownNumberElement);
	puzzlePiecesElement.append(countdownContainerElement);

	const countdown = setInterval(() => {
		countdownNumber--;
		countdownNumberElement.textContent = countdownNumber;

		countdownContainerElement.textContent = '';
		countdownContainerElement.append(countdownTxtElement);
		countdownContainerElement.append(countdownNumberElement);
		puzzlePiecesElement.append(countdownContainerElement);

		if (countdownNumber === 0) {
			clearInterval(countdown);
			setPuzzlePieces();
			setPuzzleBase(`${BASE_SRC}/${CHARACTER}/CLEANED.png`);
		}
	}, 1000);
};

// ------------------------------------------------------

const changeAccentColor = () => {
	const bodyElement = document.getElementById('body');
	bodyElement.classList.add(`accent--${CHARACTER.toLowerCase()}`);
};

// pintar el personaje para que el jugador lo vea por primera vez
const setPuzzle = () => {
	const titleElement = document.getElementById('title');
	const claimElement = document.getElementById('claim');

	titleElement.textContent = CHARACTER;
	claimElement.textContent = `Ordena las piezas correctamente para crear a ${CHARACTER}`;

	setPuzzleBase(`${BASE_SRC}/${CHARACTER.toUpperCase()}/ORIGINAL.png`);
	startPuzzleCountdown();
	changeAccentColor();
};
setPuzzle(CHARACTER);

// ------------------------------------------------------

// calculo la nota
const evaluatePuzzleSolution = (pixelsFailed, numberOfPieces) => {
	// el fallo minimo y maximo estan calculados a ojo :/
	const minFail = 50 * numberOfPieces; // nota: 10
	const maxFail = 1000 * numberOfPieces; // nota: 0
	const gradeDifference = Math.round((maxFail - minFail) / 9);

	console.log('NOTAS');
	console.log('nota de 10: ' + minFail);
	console.log('nota de 0: ' + maxFail);
	console.log('diferencia: ' + gradeDifference);

	const pixelsGrades = [];
	pixelsGrades.push(maxFail);
	for (let index = 1; index < 10; index++) {
		const lastGrade = pixelsGrades[pixelsGrades.length - 1];
		pixelsGrades.push(lastGrade - gradeDifference);
	}

	const result =
		pixelsGrades.findIndex(grades => {
			return pixelsFailed > grades;
		}) + 1;

	const resultContainerElement = document.createElement('div');
	resultContainerElement.classList.add('puzzle-info__container');

	const resultTxtElement = document.createElement('span');
	resultTxtElement.classList.add('puzzle-info__txt');
	resultTxtElement.textContent = 'TU NOTA ES...';

	const resultNumberElement = document.createElement('span');
	resultNumberElement.classList.add('puzzle-info__number');
	resultNumberElement.textContent = result;

	resultContainerElement.append(resultTxtElement);
	resultContainerElement.append(resultNumberElement);
	puzzlePiecesElement.append(resultContainerElement);
};

const checkResult = () => {
	const droppedPieces = [...document.getElementsByClassName('dropped-piece')];

	// calculo los px de error totales
	const puzzleBoundaries = puzzleBaseElement.getBoundingClientRect();
	let totalXFail = 0;
	let totalYFail = 0;
	let totalFail = 0;

	droppedPieces.forEach(droppedPiece => {
		console.log('DROPPED PIECE');
		console.log(droppedPiece);
		const pieceBoundaries = droppedPiece.getBoundingClientRect();

		// estas const son la posición de la pieza dentro del puzzle
		const positionX = pieceBoundaries.left - puzzleBoundaries.left;
		const positionY = pieceBoundaries.top - puzzleBoundaries.top;

		CHARACTER_PIECES.forEach(piece => {
			if (piece.id === droppedPiece.id) {
				const positionXFail =
					piece.left > positionX
						? piece.left - positionX
						: positionX - piece.left;
				const positionYFail =
					piece.top > positionY ? piece.top - positionY : positionY - piece.top;
				totalXFail += positionXFail;
				totalYFail += positionYFail;
				totalFail += totalXFail + totalYFail;
			}
		});
	});

	console.log('TOTAL X FAIL: ' + totalXFail);
	console.log('TOTAL Y FAIL: ' + totalYFail);
	console.log(totalFail);
	// fin del calculo de px de error totales

	evaluatePuzzleSolution(totalFail, droppedPieces.length);
};

// ------------------------------------------------------

const finishRotation = event => {
	console.log(event);

	const pieceDiv = event.target.parentElement;
	const pieceDivChildren = [...pieceDiv.children];
	pieceDivChildren.forEach(piece => {
		if (piece.tagName !== 'BUTTON') {
			piece.draggable = true;
		} else {
			piece.remove();
		}
	});

	pieceDiv.classList.remove('rotate-piece');
	const activePuzzlePieces = [...puzzlePiecesElement.children];
	activePuzzlePieces.forEach(activePiece => {
		activePiece.classList.remove('rotate-piece__disabled');
	});
};

const rotatePiece = event => {
	const pieceToRotate = event.target.parentElement.children[0];
	const rotateDirection = event.target.dataset.rotate;
	let pieceRotation = Number(pieceToRotate.dataset.rotation);

	if (rotateDirection === 'right') {
		pieceRotation < 360 ? (pieceRotation += 10) : (pieceRotation = 10);
	} else if (rotateDirection === 'left') {
		pieceRotation > 0 ? (pieceRotation -= 10) : (pieceRotation = 350);
	}

	pieceToRotate.dataset.rotation = pieceRotation;
	pieceToRotate.style.setProperty('--random-rotation', `${pieceRotation}deg`);
};

// rotación
const allowRotation = event => {
	const pieceImg = event.target;
	const pieceDiv = pieceImg.parentElement;

	// me aseguro de que es una pieza
	if (!pieceDiv.classList.contains('piece')) return;
	// me aseguro de que no había otra pieza activa
	if (pieceDiv.classList.contains('rotate-piece__disabled')) return;
	// me aseguro de que esta pieza no estaba activa desde antes
	if (pieceDiv.classList.contains('rotate-piece')) return;

	pieceImg.draggable = false;
	pieceDiv.classList.add('rotate-piece');

	// desactivo el resto de piezas para que no se roten dos a la vez por error
	const activePuzzlePieces = [...puzzlePiecesElement.children];
	activePuzzlePieces.forEach(activePiece => {
		if (activePiece === pieceDiv) return;
		activePiece.classList.add('rotate-piece__disabled');
	});

	const fragment = document.createDocumentFragment();

	const rotateLeftElement = document.createElement('button');
	rotateLeftElement.textContent = '↶';
	rotateLeftElement.dataset.rotate = 'left';
	rotateLeftElement.classList.add(
		'rotate-piece__btn',
		'rotate-piece__btn--left'
	);

	const rotateRightElement = document.createElement('button');
	rotateRightElement.textContent = '↷';
	rotateRightElement.dataset.rotate = 'right';
	rotateRightElement.classList.add(
		'rotate-piece__btn',
		'rotate-piece__btn--right'
	);

	const finishRotationElement = document.createElement('button');
	finishRotationElement.textContent = 'done';
	finishRotationElement.classList.add(
		'rotate-piece__btn',
		'rotate-piece__btn--finish'
	);

	fragment.append(rotateLeftElement, rotateRightElement, finishRotationElement);
	pieceDiv.append(fragment);

	rotateRightElement.addEventListener('click', rotatePiece);
	rotateLeftElement.addEventListener('click', rotatePiece);
	finishRotationElement.addEventListener('click', finishRotation);
};

// ------------------------------------------------------

// drag and drop
// para situar la pieza respecto al ratón una vez se suelta
const getMousePositionWithinElement = (event, element) => {
	// Get mouse position relative to div or element -> https://www.youtube.com/watch?v=JCvuj8nlpzQ

	const elementBoundaries = element.getBoundingClientRect();
	const mousePositionX = event.clientX - elementBoundaries.left;
	const mousePositionY = event.clientY - elementBoundaries.top;

	return [mousePositionX, mousePositionY];
};

const correctDragPieceCoords = (event, draggedPiece) => {
	const dragCoords = getMousePositionWithinElement(event, draggedPiece);

	// resto 4px de más en cada sentido
	// porque en el drop por defecto parece que la pieza "cae" y se desvía un poco
	// quiero que el jugador sepa donde va a estar la pieza exactamente
	draggedPiece.style.setProperty('--left-correction', `-${dragCoords[0]}px`);
	draggedPiece.style.setProperty('--top-correction', `-${dragCoords[1]}px`);

	// asegurarme de que la imagen del drag es igual que la original
	event.dataTransfer.setDragImage(draggedPiece, dragCoords[0], dragCoords[1]);
};

const dragStart = event => {
	const draggedPiece = event.target.parentElement;
	correctDragPieceCoords(event, draggedPiece);

	event.dataTransfer.setData('text/plain', draggedPiece.id);
};

const dragOver = event => event.preventDefault();

const correctDroppedPieceCoords = (event, droppedPiece) => {
	const dropCoords = getMousePositionWithinElement(event, puzzleBaseElement);
	droppedPiece.style.setProperty('--top-pos', `${dropCoords[1]}px`);
	droppedPiece.style.setProperty('--left-pos', `${dropCoords[0]}px`);

	console.log(droppedPiece);
	console.log('POS X: ' + dropCoords[0]);
	console.log('POS Y: ' + dropCoords[1]);
};

const styleDroppedPiece = droppedPiece => {
	// las piezas tienen un Z index dependiendo de cuál sean
	CHARACTER_PIECES.forEach(piece => {
		if (piece.id !== droppedPiece.id) return;
		droppedPiece.style.setProperty('--z-index', piece.zPos);
	});

	// una vez suelta ya no se puede volver a mover
	droppedPiece.classList.add('dropped-piece');
	droppedPiece.classList.remove('piece');
	droppedPiece.children[0].draggable = false;
};

const drop = event => {
	event.preventDefault();

	const pieceId = event.dataTransfer.getData('text/plain');
	const piece = document.getElementById(pieceId);

	correctDroppedPieceCoords(event, piece);
	styleDroppedPiece(piece);
	puzzleBaseElement.append(piece);

	// si ya no hay más piezas por colocar, calcular el resultado
	if ([...puzzlePiecesElement.children].length === 0) {
		checkResult();
	}
};

// EVENTS
// ======

// drag and drop
puzzleBaseElement.addEventListener('dragover', dragOver);
puzzleBaseElement.addEventListener('drop', drop);

// rules
rulesBtnElement.addEventListener('click', showRules);
