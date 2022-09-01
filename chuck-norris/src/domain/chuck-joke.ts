import { IChuckJokeCategory } from "./chuck-joke-category";


/**
 * Chuck Norris Joke Implementation Signature.
 */
export interface IChuckJoke { 

    /**
     * Defines Joke ID Value.
     */
    id : string;

    /**
     * Defines Joke String Value.
     */
    value : string;

    /**
     * Defines Joke Belonging To The Category.
     */
    category : IChuckJokeCategory;
}