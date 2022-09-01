import { AppState } from "../../state/app-state";
import { IChuckJoke } from "../../domain/chuck-joke";
import { IChuckFact } from "../../domain/chuck-fact";


/**
 * Class Represents The Home Page View of The Web Application.
 */
export class Home {
    
    /**
     * Defines All Already Seen Jokes.
     */
    public ChuckJokes : IChuckJoke[] = [];

    /**
     * Defines Currently Chosen Fact.
     */
    public ChuckFact : IChuckFact | undefined = undefined;

    /**
     * Defines All Facts Related To Chuck Norris.
     */
    public ChuckFacts : IChuckFact[] = [];

    /**
     * Defines List Emptyness For Joke Display.
     */
    public isEmpty : boolean = true;


    /**
     * Basic Constructor For View. Defines Connection To Application State Management.
     * @param {AppState} appState Defines Connection To Application State Management.
     */
    constructor(private appState : AppState) { }


    /**
     * Lifecycle Handling. Method is Called When The Component Is Attached To The DOM.
     */
    async attached() {
        
        // Define List Of All Seen Jokes.
        this.ChuckJokes = this.appState.ChuckJokes;

        this.isEmpty = this.ChuckJokes.length === 0;

        // Define List Of All Chuck Norris Facts and Load It To View.
        this.appState.loadChuckFacts();
        this.ChuckFacts = this.appState.ChuckFacts;

        // Color Changer.
        this.changeColor();

        // Show Random Facts About Chuck.
        this.getRandomFact();
        setInterval(() => this.getRandomFact(), 6000);


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

    /**
     * Method Returns Random Fact About Chuck.
     */
    getRandomFact() {
        this.ChuckFact = this.ChuckFacts[Math.floor(Math.random() * this.ChuckFacts.length)];
    }
}