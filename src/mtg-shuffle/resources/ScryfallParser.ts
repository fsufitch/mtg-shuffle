import * as Scryfall from 'scryfall-sdk';
import { ScryfallCache } from './ScryfallCache';
import { Deck } from './Deck';

const NUM_SEPARATOR = /[xX]?\s+/;

export class ScryfallParser {
    private cache = new ScryfallCache()

    constructor() {
        this.cache.loadFromLocalStorage()
    }

    private async queryCards(names: string[]): Promise<Scryfall.Card[]> {
        if (names.length < 1) {
            return [];
        }
        let query = names.map(n => `!"${n}"`).join(' or ');
        console.log("Searching Scryfall with:", query);
        return Scryfall.Cards.search(query).waitForAll();
    }

    private async affirmCacheCards(names: string[]) {
        let queryResult = await this.queryCards(
            names.filter(name => !this.cache.get(name))
        );
        queryResult.forEach(card => this.cache.set(card));
        let cardsNotFound = names.filter(name => !this.cache.get(name));
        if (cardsNotFound.length > 0) {
            throw new CardsNotFoundError(cardsNotFound.toString());
        }
    }

    async getCards(names: string[]): Promise<{[name: string]: Scryfall.Card}> {
        await this.affirmCacheCards(names);
        let result: { [name: string]: Scryfall.Card } = {};
        names.forEach(name => {
            result[name] = this.cache.get(name)!;
        })
        return result;
    }

    async parseDeck(text: string): Promise<Deck> {
        let queriedCards = text.split('\n')
            .map(line => line.trim())
            .filter(line => !!line && !line.startsWith('//'))
            .map(line => [line, ...line.split(/\s/)])
            .map(([line, first, ...rest]) => first.match(/[0-9]+/) ? 
                {line, amount: parseInt(first), cardName: rest.join(' ')} : 
                {line, amount: 1, cardName: [first, ...rest].join(' ')});

        queriedCards.forEach(({line, cardName, amount}) => {
            if (amount < 1 || !cardName) {
                throw new DeckParseError(`Invalid line: ${line}`);
            }
        });

        let cards = await this.getCards(queriedCards.map(({cardName}) => cardName));

        return queriedCards.map(({amount, cardName}) => ({amount, card: cards[cardName]}));
    }

}

interface GetCardsResult {
    foundAll: boolean
    cards: {[name: string]: Scryfall.Card}
}

class CardsNotFoundError extends Error {}
class DeckParseError extends Error {}