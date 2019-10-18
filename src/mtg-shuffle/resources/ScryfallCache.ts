import * as Scryfall from 'scryfall-sdk';

const TTL_MILLIS = 1000 * 60 * 60 * 24; // 1 day

export class ScryfallCache {
    private cache: {[name: string]: CacheEntry} = {}

    async saveToLocalStorage() {
        console.error('TODO save card cache to local storage');
    }
    async loadFromLocalStorage() {
        console.error('TODO load card cache from local storage');
    }

    get(name: string): Scryfall.Card | null {
        let lowerName = name.toLowerCase();
        if (lowerName in this.cache) {
            let entry = this.cache[lowerName];
            if (entry.expiration < Date.now()) {
                // Invalid, unset it
                this.unset(name);
                return null;
            }
            return entry.card;
        }
        return null;
    }

    set(card: Scryfall.Card) {
        this.cache[card.name.toLowerCase()] = {
            card, expiration: Date.now() + TTL_MILLIS,
        };
    }

    unset(name: string) {
        delete this.cache[name.toLowerCase()];
    }
}

interface CacheEntry {
    card: Scryfall.Card
    expiration: number
}