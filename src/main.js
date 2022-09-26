// =============================================================================
//                             MADE BY TOM PLANCHE
//                            tomplanche@icloud.com
//                            github.com/tomPlanche
// =============================================================================

import customCursor from './js/customCursor.js';
import ButtonCtrl from './js/buttonControl.js';
import {
    calcWinsize,
    distance,
    getMousePos,
    getRandomFloat,
    lerp,
    verifyIsInBounds
} from "./js/myFuncs.js";

// -------------------------------- VARIABLES ----------------------------------

let title = "Tom Planche's Portfolio ";
let changeTitleInterval;

// Track the mouse position
let mouse = {x: 0, y: 0};

const cursor = new customCursor(document.querySelector('.cursor'));
const buttonMenu = new ButtonCtrl(
		document.querySelector('#main-btn'),
		{
			customCursor: cursor,
		}
);
// ------------------------------ END VARIABLES --------------------------------


// -------------------------------- FUNCTIONS ----------------------------------
/**
 * Change the page title coupled with a setTimeout
 */
const changeTitle = () => {
	if (title.substring(1)[0] === " ") { title = title.substring(1) + title.substring(0, 1) }
	title = title.substring(1) + title.substring(0, 1);
	document.title = title;
}
// ------------------------------ END FUNCTIONS --------------------------------


// --------------------------------- SETUP -------------------------------------
// Set the interval (4 times a second) for the title change
changeTitleInterval = setInterval(changeTitle, 250);

// Change the title to 'Come back!" when the user changes the tab
document.addEventListener('visibilitychange', () => {
	if (document.hidden) {
	  clearInterval(changeTitleInterval);
		document.title = "Come back!";
	} else {
	  changeTitleInterval = setInterval(changeTitle, 250);
	}
});

// Update the mouse position when the user moves the mouse
window.addEventListener('mousemove', ev => {
	mouse = getMousePos(ev);
});

// ------------------------------- END SETUP -----------------------------------


// ---------------------------------- CODE -------------------------------------

// -------------------------------- END CODE -----------------------------------


// =============================================================================
//                                END OF MAIN.JS
// =============================================================================
