/*
menu principal: instrucciones y personajes

click sobre personaje -> pagina de personaje

aparece el personaje con cara 
tras 5 segundos se quita la cara
aparecen las piezas

click (sostenido) sobre una pieza
la pieza se mueve con el raton
al soltar, la pieza queda donde soltaste -> tiene que ser sobre el dibujo, 
si no, vuelve a la posicion original o no se suelta

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
// const rootStyles = document.documentElement.style;

const puzzlePieces = document.getElementsByClassName('piece');
const puzzlePiecesArr = [...puzzlePieces];

const dropElement = document.getElementById('drop-target');

// FUNCTIONS
// =========

const dragging = event => {
	console.log('DRAGGED');
	console.log(event);
	console.log(window);

	event.dataTransfer.setData('text/plain', event.target.id);
};

const dragOver = event => event.preventDefault();

const getDropPosition = (event, droppedPiece) => {
	// Get mouse position relative to div or element -> https://www.youtube.com/watch?v=JCvuj8nlpzQ

	const boundaries = dropElement.getBoundingClientRect();

	const positionX = event.clientX - boundaries.left;
	const positionY = event.clientY - boundaries.top;

	droppedPiece.style.setProperty('--top-pos', `${positionY}px`);
	droppedPiece.style.setProperty('--left-pos', `${positionX}px`);
};

const drop = event => {
	event.preventDefault();
	console.log(event);

	const pieceId = event.dataTransfer.getData('text/plain');
	const piece = document.getElementById(pieceId);
	getDropPosition(event, piece);
	piece.classList.add('dropped-piece');

	event.target.parentElement.append(piece);
};

// EVENTS
// ======
puzzlePiecesArr.forEach(piece => {
	piece.addEventListener('dragstart', dragging);
});

dropElement.addEventListener('dragover', dragOver);

dropElement.addEventListener('drop', drop);
