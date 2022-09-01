import { AppState } from "../../state/app-state";
import { IChuckJoke } from "../../domain/chuck-joke";
import { StringHelper } from "../../Helpers/stringHelpers";
import { IChuckJokeCategory } from "../../domain/chuck-joke-category";


/**
 * Class Represents The Joke Category Page View of The Web Application.
 */
 export class CategoryTwo {
    
    /**
     * Defines Category For This Page.
     */
    public Category : IChuckJokeCategory | undefined;

    /**
     * Defines Chuck Jokes in Given Category.
     */
     public ChuckJokes : IChuckJoke[] = [];


    /**
     * Basic Constructor For Navigation Bar. Defines Application State Class Connection.
     * @param {AppState} appState Application State Class Connection Definition.
     * @param {StringHelper} stringHelper Defines Connection To String Manipulator.
     */
   constructor(private appState : AppState, private stringHelper : StringHelper) { }


    /**
     * Lifecycle Handling. Method is Called When The Component Is Attached To The DOM.
     */
    async attached() {
        
        // Define Category For Page. (Deep Copy And Make Title Capitalized)
        this.Category = JSON.parse(JSON.stringify(this.appState.SelectedChuckJokeCategories[1]));

        // Just Check For No Value Parsed.
        if (this.Category === undefined) return;

        this.Category.Title = this.stringHelper.capitalizeFirstLetter(this.Category.Title);

        // Load Jokes From API.
        this.ChuckJokes = await this.appState.loadJokesFromCategoryAwait(this.appState.SelectedChuckJokeCategories[1], 8);

        // Paint Fancy Text Element.
        this.changeColor();
    }

    /**
    * Method Changes Color Of The Text Elements.
    */
    changeColor() {

        // Define Element To Change Color.
        let element : HTMLDivElement | null = document.querySelector(".transitionText")

        // List Of Color To Be Changed To.
        let colors = ["orange", "gray", "white"];

        setInterval(function() {
            for(let y = 0; y < 4; y++){
                if (element !== null) element.style.color = colors[Math.floor(Math.random() * 3)];
            }
        }, 1000);
    }
}   