/**
 * @file customCursor.js
 * @description My implementation of a custom cursor in JavaScript.
 * @author: Tom Planche
 * @license: MIT
 */

// Imports
import { mouse } from "../main.js";
import { lerp } from "./myFuncs.js";

// CURSOR CLASS ===============================================================
/**
 * @classdesc A class that represents a cursor.
 * @class customCursor
 */
export default class customCursor {
	/**
	 * @constructor
	 * @param options - The options for the cursor.
	 *
	 * @todo implement the passing of options
	 */
	constructor(options = undefined) {
		this.attributes = {
			computable: {
				x: {previous: 0, current: 0, amt: 0.2},
				y: {previous: 0, current: 0, amt: 0.2},
				scale: {previous: 1, current: 1, amt: 0.2},
				opacity: {previous: 1, current: 1, amt: 0.2},
				borderRadius: {previous: 999, current: 999, amt: 1},
			},
			nonComputable: {
				height: 40,
				width: 40,
				color: "#7EC8E375",
				isHovering: {value: false, target: undefined},
			},
			customEnterOptions: {}
		}
		
		this.createDOM();
	}
	
	/**
	 * @function createCursor
	 * @description Creates the cursor html element.
	 */
	createDOM() {
		const cursorDiv = document.createElement("div");
		cursorDiv.id = "cursorDiv";
		cursorDiv.style.position = "fixed";
		cursorDiv.style.top = "0"; // so that the tranlateX and translateY are relative to the top left corner of the screen
		cursorDiv.style.left = "0"; // same as above
		cursorDiv.style.pointerEvents = "none"; // so that the cursor doesn't interfere with the mouse events
		cursorDiv.style.zIndex = "999";
		
		const cursor = document.createElement("div");
		cursor.id = "mainCursor";
		cursor.style.height = "100%";
		cursor.style.width = "100%";
		
		cursorDiv.appendChild(cursor);
		
		document.querySelector("body").insertAdjacentHTML("afterbegin", cursorDiv.outerHTML);
		this.cursorDiv = document.querySelector("#cursorDiv");
		this.mainCursor = document.querySelector("#mainCursor");
		
		this.render();
	}
	
	
	/**
	 * @function addText
	 * @description Adds text to the cursor.
	 * @param text - The text to add (in a dictionary with value as key and if options needed, options as key).
	 * @example
	 * addText("Hello World", {color: "red", fontSize: "20px"});
	 *
	 * @todo implement the passing of textOptions
	 */
	addText(text) {
		if (this.attributes.customEnterOptions.text) return;
		
		const textDiv = document.createElement("div");
		textDiv.id = "textDiv";
		
		textDiv.style.height = "100%";
		textDiv.style.width = "100%";
		
		textDiv.style.position = "fixed";
		textDiv.style.top = "0";
		textDiv.style.left = "0";
		textDiv.style.pointerEvents = "none"; // so that the cursor doesn't interfere with the mouse events
		
		textDiv.style.display = "flex";
		textDiv.style.justifyContent = "center";
		textDiv.style.alignItems = "center";
		
		
		const textSpan = document.createElement("span");
		textSpan.id = "mainText";
		textSpan.innerHTML = text.value;
		
		if (text.options) {
			for (const option in text.options) {
				textSpan.style[option] = text.options[option];
			}
		}
		
		
		
		textDiv.appendChild(textSpan);
		
		document.querySelector("#cursorDiv").insertAdjacentHTML("beforeend", textDiv.outerHTML);
		
		this.attributes.customEnterOptions.text = document.querySelector("#textDiv");
	
	}
	
	
	/**
	 * @function addSvg
	 * @description Adds an svg to the cursor.
	 * @param svg - The svg to add (in a dictionary with value as key and if options needed, options as key).
	 * @example
	 * addSvg("<svg>..</svg>, {size: "50%"});
	 *
	 * @todo implement the passing of textOptions
	 */
	addSvg(svg) {
		if (this.attributes.customEnterOptions.svg) return;
		
		const svgDiv = document.createElement("div");
		svgDiv.id = "svgDiv";
		
		svgDiv.style.height = "100%";
		svgDiv.style.width = "100%";
		
		svgDiv.style.position = "fixed";
		svgDiv.style.top = "0";
		svgDiv.style.left = "0";
		svgDiv.style.pointerEvents = "none"; // so that the cursor doesn't interfere with the mouse events
		
		svgDiv.style.display = "flex";
		svgDiv.style.justifyContent = "center";
		svgDiv.style.alignItems = "center";
		
		// add the passed svg to the div
		svgDiv.insertAdjacentHTML("beforeend", svg.value);
		
		const svgItself = svgDiv.querySelector("svg");
		
		if (svg.options) {
			for (const option in svg.options) {
				switch (option) {
					case "size":
						svgItself.style.height = svg.options[option];
						svgItself.style.width = svg.options[option];
						break;
					default:
						svgItself.style[option] = svg.options[option];
				}
			}
		}
		
		document.querySelector("#cursorDiv").insertAdjacentHTML("beforeend", svgDiv.outerHTML);
		
		this.attributes.customEnterOptions.svg = document.querySelector("#svgDiv");
	}
	
	
	
	/**
	 * @function render
	 * @description Renders the cursor.
	 */
	render() {
		this.attributes.computable.x.current = mouse.x - this.attributes.nonComputable.width * this.attributes.computable.scale.current / 2;
		this.attributes.computable.y.current = mouse.y - this.attributes.nonComputable.height * this.attributes.computable.scale.current / 2;
		
		// Lerp the values
		for (const [key,] of Object.entries(this.attributes.computable)) {
			this.attributes.computable[key].previous = lerp(this.attributes.computable[key].previous, this.attributes.computable[key].current, this.attributes.computable[key].amt);
		}
		
		// Apply the values
		this.cursorDiv.style.transform = `translate(${this.attributes.computable.x.previous}px, ${this.attributes.computable.y.previous}px)`;
		this.mainCursor.style.height = `${this.attributes.nonComputable.height * this.attributes.computable.scale.previous}px`;
		this.mainCursor.style.width = `${this.attributes.nonComputable.width * this.attributes.computable.scale.previous}px`;
		this.mainCursor.style.backgroundColor = this.attributes.nonComputable.color;
		this.mainCursor.style.opacity = this.attributes.computable.opacity.previous;
		this.mainCursor.style.borderRadius = `${this.attributes.computable.borderRadius.previous}px`;
		
		requestAnimationFrame(this.render.bind(this));
	}
	
	
	/**
	 * @function enter
	 * @param options - Dictionary of options.
	 * @description When the cursor enter a target.
	 *
	 * @todo implement the options
	 */
	enter(options = undefined) {
		
		const defaultOptions = {
			scale: 1.5,
			opacity: 0.5,
		}
		
		options = {...defaultOptions, ...options};
		
		if (options) {
			for (const [key, value] of Object.entries(options)) {
				// if the key is either in the computable or nonComputable attributes, then we need to set the value
				if (key in this.attributes.computable) {
					this.attributes.customEnterOptions[key] = {previous: this.attributes.computable[key].current, current: value};
					this.attributes.computable[key].current = value;
				} else if (key in this.attributes.nonComputable) {
					this.attributes.customEnterOptions[key] = {previous: this.attributes.nonComputable[key], current: value};
					this.attributes.nonComputable[key] = value;
				} else {
					switch (key) {
						case "text":
							this.addText(value);
							break;
						case "svg":
							this.addSvg(value);
							break;
						default:
					}
				}
			}
		}
	}
	
	
	/**
	 * @function leave
	 * @description When the cursor leaves a target.
	 * @todo implement the options
	 */
	leave() {
		// if customEnterOptions is not empty, then we need to reset the values to the customEnterOptions values
		if (Object.keys(this.attributes.customEnterOptions).length !== 0) {
			for (const [key, value] of Object.entries(this.attributes.customEnterOptions)) {
				// console.log(`${key}: ${value}`);
				if (key in this.attributes.computable) {
					this.attributes.computable[key].current = value.previous;
				} else if (key in this.attributes.nonComputable) {
					this.attributes.nonComputable[key] = value.previous;
				} else {
					switch (key) {
						case "text":
							this.attributes.customEnterOptions.text.remove();
							delete this.attributes.customEnterOptions.text;
							break;
						case "svg":
							this.attributes.customEnterOptions.svg.remove();
							delete this.attributes.customEnterOptions.svg;
							break;
						default:
							this.attributes.nonComputable[key] = value.previous;
							break;
					}
				}
			}
			
			this.attributes.customEnterOptions = {};
		}
		
		// mandatory
		this.attributes.computable.scale.current = 1;
		this.attributes.computable.opacity.current = 1;
	}
}
// END CURSOR CLASS ============================================================
