// =============================================================================
//                             MADE BY TOM PLANCHE
//                            tomplanche@icloud.com
//                            github.com/tomPlanche
// =============================================================================

import customCursor from './js/customCursor.js';
import ButtonControl from './js/buttonControl.js';
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

const githubSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z\"/></svg>";
const mailSVG = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\"><path d=\"M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z\"/></svg>";

const cursor = new customCursor(document.querySelector('.cursor'));
const buttonMenu = new ButtonControl(
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

document.querySelectorAll(".gitLogoHover").forEach((elem) => {
	elem.addEventListener("mouseenter", () => {
		cursor.enterCustom({
			innerHTML: githubSVG
		})
	});
	elem.addEventListener("mouseleave", () => {
		cursor.leaveCustom();
	});
});

document.querySelectorAll(".mailLogoHover").forEach((elem) => {
	elem.addEventListener("mouseenter", () => {
		cursor.enterCustom({
			innerHTML: mailSVG
		})
	});
	elem.addEventListener("mouseleave", () => {
		cursor.leaveCustom();
	});
});


document.querySelector("#redCursorTrigger").addEventListener("mouseenter",() => {
	cursor.enterCustom({
		style: {
			fill: "red",
			stroke: "red"
		},
		opacity: .5
	});
});

document.querySelector("#redCursorTrigger").addEventListener("mouseleave",() => {
	cursor.leaveCustom();
});
// ------------------------------- END SETUP -----------------------------------


// ---------------------------------- CODE -------------------------------------

// -------------------------------- END CODE -----------------------------------


// =============================================================================
//                                END OF MAIN.JS
// =============================================================================
