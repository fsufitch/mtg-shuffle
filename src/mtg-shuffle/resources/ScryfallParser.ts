import * as Scryfall from 'scryfall-sdk';
import { ScryfallCache } from './ScryfallCache';

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
}

interface GetCardsResult {
    foundAll: boolean
    cards: {[name: string]: Scryfall.Card}
}

class CardsNotFoundError extends Error {}