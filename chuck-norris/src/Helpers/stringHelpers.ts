

/**
 * Class Represents Methods For String Modification.
 */
export class StringHelper {

    /**
     * Method Takes String And Capitalazes It's First Letter.
     * @param {string} word Defines String To Be Capitalized.
     * @returns {string} Capitalized Word.
     */
    capitalizeFirstLetter(word : string) : string {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
}