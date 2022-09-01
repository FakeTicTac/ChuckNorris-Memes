import { IHttpClient } from "aurelia";
import { IChuckJoke } from "../domain/chuck-joke";
import { IChuckFact } from "../domain/chuck-fact";
import { IChuckJokeCategory } from "../domain/chuck-joke-category";


/**
 * Class Represents Web Application State Management Mechanism.
 */
export class AppState {

    /**
     * Defines All Seen By User Jokes.
     */
    public ChuckJokes : IChuckJoke[] = [];

    /**
     * Defines All Chuck Related Facts.
     */
    public ChuckFacts : IChuckFact[] = [];

    /**
     * Defines All Selected Chuck Joke Categories.
     */
    public SelectedChuckJokeCategories : IChuckJokeCategory[] = [];


    /**
     * Basic Constructor For State Management. Defines Fetching Wrapper Connection.
     * @param {IHttpClient} http Fetching Wrapper Connection Definition.
     */
    constructor(@IHttpClient private http: IHttpClient) { }
    

    /**
     * Method Loads All Chuck Norris Jokes From API.
     * @param {number} quantity Defines Number of Selections.
     */
    async loadCategoriesAwait(quantity : number) : Promise<void> {
        try {
            // Trying To Load Joke Categories From The API.
            let jsonResponse = await (await this.http.get("https://api.chucknorris.io/jokes/categories")).json();

            // Create Category Objects Out Of The JSON Data From API.

            while (this.SelectedChuckJokeCategories.length < 3) {

                let title = jsonResponse[Math.floor(Math.random() * Object.keys(jsonResponse).length)];

                // Check if Chosen Category Already In Use.
                if (this.SelectedChuckJokeCategories.find(x => x.Title == title) !== undefined) continue;

                this.SelectedChuckJokeCategories.push({ Title: title});
            }

        } catch (error) {
            // No Data is Loaded.
        }
    }

    /**
     * Method Loads Jokes From The Given Category in The Given Quantity From API.
     * @param {IChuckJokeCategory} category Defines Category For Joke Loading.
     * @param {number} quantity Defines A Number of Jokes To Be Loaded. 
     * @returns {IChuckJoke[]} Array Of Collected Jokes In Given Category From API.
     */
    async loadJokesFromCategoryAwait(category : IChuckJokeCategory, quantity : number) : Promise<IChuckJoke[]> {

        // Array To Store Currently Loaded Jokes.
        let loadedJokes : IChuckJoke[] = []

        try{

            for (let x = 0; x < quantity; x++) {
                // Get Respose From API and Load Joke.
                let jsonResponse = await (await this.http.get(`https://api.chucknorris.io/jokes/random?category=${category.Title}`)).json();
    
                // Create Joke Object Out Of API Response.
                let joke = <IChuckJoke> { id : jsonResponse["id"], value : jsonResponse["value"], category : category }
    
                // Add Joke To The Current List.
                loadedJokes.push(joke);
            }

        } catch (error) {
            // Error Occured While Loading Data.
        }

        // Handle Shared List Of Jokes. Check if Joke With Given ID Already Exist or Add It.
        loadedJokes.forEach(item => {
            if (this.ChuckJokes.find(x => x.id === item.id) === undefined) this.ChuckJokes.push(item);
        });

        return loadedJokes;
    }

    /**
     * Method Loads All Facts Related To Chuck Norris.
     */
    loadChuckFacts() {

        // Seed Data Manually.
        this.ChuckFacts.push({ PeriodNumber: "1", Value: "I have a mug of nails instead of coffee in the morning." });
        this.ChuckFacts.push({ PeriodNumber: "54", Value: "My tears cure cancer. Too bad I have never cried." });
        this.ChuckFacts.push({ PeriodNumber: "23", Value: "I counted to infinity… twice." });
        this.ChuckFacts.push({ PeriodNumber: "102", Value: "When I do division, there are no remainders." });
        this.ChuckFacts.push({ PeriodNumber: "51", Value: "I can clap with one hand." });
        this.ChuckFacts.push({ PeriodNumber: "1", Value: "I don’t need to shave. My beard is scared to grow." });
        this.ChuckFacts.push({ PeriodNumber: "2", Value: "I can sneeze with my eyes open." });
        this.ChuckFacts.push({ PeriodNumber: "77", Value: "I once had a heart attack. My heart lost." });
    }
}
