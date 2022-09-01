import { AppState } from "../../../state/app-state";
import { StringHelper } from "../../../Helpers/stringHelpers";
import { IChuckJokeCategory } from "../../../domain/chuck-joke-category";


/**
 * Class Represents The Navigation Bar of The Web Application.
 */
export class NavigationBar {

    /**
     * Dynamically Selected Joke Category Storage.
     */
    public SelectedChuckJokeCategories : IChuckJokeCategory[] = [];


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

        // Load Categories of Jokes From API.
        await this.appState.loadCategoriesAwait(3)

        // Save Them Into Additionaly To Navigation Bar Storage.
        this.SelectedChuckJokeCategories = JSON.parse(JSON.stringify(this.appState.SelectedChuckJokeCategories));

        // Make Title Suitable For UI.
        this.SelectedChuckJokeCategories.forEach(x => x.Title = this.stringHelper.capitalizeFirstLetter(x.Title));
    }
}