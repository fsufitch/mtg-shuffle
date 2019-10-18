import * as Scryfall from 'scryfall-sdk';

export type Deck = DeckSlot[]

interface DeckSlot {
    amount: number
    card: Scryfall.Card
}