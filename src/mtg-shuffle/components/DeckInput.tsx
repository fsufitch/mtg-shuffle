import React, { Component } from "react";

import * as Scryfall from 'scryfall-sdk';

import styles from 'mtg-shuffle/styles';
import { ScryfallParser } from "mtg-shuffle/resources/ScryfallParser";
import { Deck } from "mtg-shuffle/resources/Deck";

interface Props {
    ondeck?: (deck: Deck | null) => void
}

interface State {
    deckInput: string,
    error: string,
}

const DECK_PLACEHOLDER = `// Paste deck here

4 Lightning Bolt
4 Preordain

// Comments start with double slashes

2 Force of Will`;

export class DeckInput extends Component<Props, State> {
    parser = new ScryfallParser();

    constructor(props: Props) {
        super(props);
        this.state = {
            deckInput: '',
            error: '',
        };
    }

    private renderError() {
        if (this.state.error) {
            return (
                <span className={styles['text-danger']}> {this.state.error} </span>
            );
        }
        return null;
    }

    render() {
        return (
            <div>
                <textarea placeholder={DECK_PLACEHOLDER}
                    className={styles['deck-input-area']}
                    rows={13}
                    onChange={this.handleDeckChange}
                    value={this.state.deckInput} />
                <br />
                <button className={styles['submit-button']} onClick={this.handleSubmit}> Shuffle! </button>
                <br />
                {this.renderError()}
            </div>
        );
    }

    handleDeckChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({deckInput: event.target.value});
    }

    handleSubmit = (event: React.FormEvent) => {
        let input = this.state.deckInput;
        this.parser.parseDeck(input)
            .then(deck => this.props.ondeck ? this.props.ondeck(deck) : 0)
            .catch(error => {
                this.setState({error: `${error}`});
                this.props.ondeck ? this.props.ondeck(null) : 0;
            });
        event.preventDefault();
    }
}