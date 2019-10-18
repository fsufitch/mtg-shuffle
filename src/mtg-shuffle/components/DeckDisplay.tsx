import React, { Component } from "react";

import * as Scryfall from 'scryfall-sdk';

import styles from "mtg-shuffle/styles";

interface Props {
    cards: Scryfall.Card[]
}

export class DeckDisplay extends Component<Props> {
    render() {
        return (
            <div className={styles.row}>
                {this.props.cards.map((card, idx) => (
                    <div key={`${card.uri}-${idx}`} className={styles['deck-column']}>
                        <a href={card.scryfall_uri} target="_blank">
                            <img src={card.image_uris!.normal} alt={card.name} title={card.name} />
                        </a>
                    </div>
                ))}
            </div>
        );
    }
}