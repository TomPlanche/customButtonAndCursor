
import { lerp, getMousePos } from "./myFuncs.js";

// Track the mouse position
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', ev => mouse = getMousePos(ev));

/**
 * Custom cursor class
 * The cursor should have the following structure:
 * 
 * <svg class="cursor" width="25" height="25" viewBox="0 0 25 25">
 *     <circle class="cursor__inner" cx="12.5" cy="12.5" r="6.25"/>
 * </svg>
 *
 * And the recommended CSS: look at the CSS file.
 *
 */
export default class CustomCursor {
    /**
     * CustomCursor constructor.
     * @param el - The cursor element.
     */
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.el.style.opacity = "0";
        
        this.bounds = this.DOM.el.getBoundingClientRect();
        
        // Amt is the amount of movement, the greater, the faster.
        this.renderedStyles = {
            tx: {previous: 0, current: 0, amt: 0.2},
            ty: {previous: 0, current: 0, amt: 0.2},
            scale: {previous: 1, current: 1, amt: 0.2},
            opacity: {previous: 1, current: 1, amt: 0.2}
        };

        // Mouse move handler.
        this.onMouseMoveEv = () => {
            this.renderedStyles.tx.previous = this.renderedStyles.tx.current = mouse.x - this.bounds.width / 2;
            this.renderedStyles.ty.previous = this.renderedStyles.ty.current = mouse.y - this.bounds.height / 2;
            
            gsap.to(this.DOM.el, {duration: 0.9, ease: 'Power3.easeOut', opacity: 1});
            
            requestAnimationFrame(() => this.render());
            window.removeEventListener('mousemove', this.onMouseMoveEv);
        };
        
        // Mouse move event.
        window.addEventListener('mousemove', this.onMouseMoveEv);
    }
    
    /**
     * When the cursor 'enter' is trigerred.
     */
    enter() {
        this.renderedStyles['scale'].current = 4;
        this.renderedStyles['opacity'].current = 0.6;
        this.DOM.el.children[0].style.fill = "#111";
        this.DOM.el.children[0].style.stroke = "#111";
    }
    
    /**
     * When the cursor 'leave' is trigerred.
     */
    leave() {
        this.renderedStyles['scale'].current = 1;
        this.renderedStyles['opacity'].current = 1;
        this.DOM.el.children[0].style.stroke = "#eee";
        this.DOM.el.children[0].style.fill = "#eee";
    }
    
    /**
     * Overwrite the cursor options for a custom enter.
     * @param options - options for the custom enter. !! If the options are related to style, they must be in a style object. !!
     *
     * Example:
     *   - I want the cursor to be the github logo when I hover a specified element and the fill to be red.
     *     cursor.enterCustom({
     * 		   innerHTML: githubSVG,
     * 		   style: {
     * 		     fill: "red",
     * 		     stroke: "red"
     * 		   }
     * 		 });
     */
    enterCustom(options) {
        this.renderedStyles['scale'].current = 2;
        this.renderedStyles['opacity'].current = 1;
        
        this.changesSettings = {};
        
        // List all the options that'll be changed and its values in order to reset them later.
        for (const key in options) {
            if (key === "style") {
                for (const styleKey in this.changesSettings[key]) {
                    this.changesSettings[key][styleKey] = this.DOM.el.children[0].style[styleKey]
                }
            } else {
                this.changesSettings[key] = this.DOM.el[key];
            }
        }
        
        // Put the 'scale' option first in order to be applied first.
        if (options.scale) {
            this.DOM.el.style.transform = `scale(${options.scale})`;
            delete options.scale;
        }
        
        // Apply the new options.
        for (const key in options) {
            switch (key) {
                case "style":
                    for (const styleKey in options[key]) {
                    this.DOM.el.children[0].style[styleKey] = options[key][styleKey];
                };
                break;
                case "scale":
                    this.renderedStyles.scale.current = options[key]
                    break;
                case "opacity":
                    this.renderedStyles.opacity.current = options[key]
                    break;
                default:
                    this.DOM.el[key] = options[key];
            }
        }
    }
    
    /**
     * Reset the factory settings of the cursor.
     */
    leaveCustom() {
        // Reset the options.
        this.renderedStyles['scale'].current = 1;
        this.renderedStyles['opacity'].current = 1;
        
        // Put the 'scale' option first in order to be applied first.
        if (this.changesSettings.scale) {
            this.DOM.el.style.transform = `scale(${this.changesSettings.scale})`;
            delete this.changesSettings.scale;
        }
        
        for (const key in this.changesSettings) {
            if (key === "style") {
                for (const styleKey in this.changesSettings[key]) {
                    this.DOM.el.children[0].style[styleKey] = this.changesSettings[key][styleKey];
                }
            } else {
                this.DOM.el[key] = this.changesSettings[key];
            }
        }
        
        // Reset the cursor to the default settings.
        this.leave();
    }
    
    /**
     * Render the cursor.
     */
    render() {
        this.renderedStyles['tx'].current = mouse.x - this.bounds.width / 2;
        this.renderedStyles['ty'].current = mouse.y - this.bounds.height / 2;

        for (const key in this.renderedStyles ) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
        
        this.DOM.el.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px) scale(${this.renderedStyles['scale'].previous})`;
        this.DOM.el.style.opacity = this.renderedStyles['opacity'].previous;

        requestAnimationFrame(() => this.render());
    }
}
