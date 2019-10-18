import React, { Component } from "react";

import * as Scryfall from 'scryfall-sdk';

import styles from 'mtg-shuffle/styles';

import { DeckInput } from "./DeckInput";
import { Deck } from "mtg-shuffle/resources/Deck";
import { DeckDisplay } from "./DeckDisplay";
import { About } from "./About";

interface State {
    deck: Deck | null
    shuffledCards: Scryfall.Card[],
}
export class Application extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            deck: null,
            shuffledCards: [],
        };
    }
    render() {
        return (<div className={styles.container}>
            <h1>Magic Deck Shuffler</h1> 
            <div className={styles.row}>
                <div className={styles['col-sm-6']}>
                    <About />
                </div>
                <div className={styles['col-sm-6']}>
                    <DeckInput ondeck={this.onDeck} />
                </div>
            </div>
            <hr />
            {!!this.state.shuffledCards.length && <DeckDisplay cards={this.state.shuffledCards} />}
        </div>)
    }

    onDeck = (deck: Deck | null) => {
        this.setState({deck});
        if (!deck) {
            this.setState({shuffledCards: []});
            return;
        }
        let cards: Scryfall.Card[] = [];
        deck.forEach(slot => {
            for (let i=0; i<slot.amount; i++) {
                cards.push(slot.card);
            }
        });

        let shuffledCards = cards.map(card => ({k: Math.random(), card}))
            .sort((x, y) => (y.k - x.k))
            .map(({card}) => card);

        this.setState({shuffledCards});
    }
}