import { AppState } from "../../state/app-state";
import { IChuckJoke } from "../../domain/chuck-joke";
import { StringHelper } from "../../Helpers/stringHelpers";
import { IChuckJokeCategory } from "../../domain/chuck-joke-category";


/**
 * Class Represents The Joke Category Page View of The Web Application.
 */
export class CategoryOne {
    
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
     */
    constructor(private appState : AppState, private stringHelper : StringHelper) { }


    /**
     * Lifecycle Handling. Method is Called When The Component Is Attached To The DOM.
     */
    async attached() {
        
        // Define Category For Page. (Deep Copy And Make Title Capitalized)
        this.Category = JSON.parse(JSON.stringify(this.appState.SelectedChuckJokeCategories[0]));

        // Just Check For No Value Parsed.
        if (this.Category === undefined) return;

        this.Category.Title = this.stringHelper.capitalizeFirstLetter(this.Category.Title);

        // Load Jokes From API.
        this.ChuckJokes = await this.appState.loadJokesFromCategoryAwait(this.appState.SelectedChuckJokeCategories[0], 5);
    }

    /**
     * Method Gets Random Minute Of Time.
     * @returns {number} Random Minute
     */
    randomMinute() {
        return Math.floor(Math.random() * 60);
    }
}   