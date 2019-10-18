import React, { Component } from "react";

import * as Scryfall from 'scryfall-sdk';

import bootstrap from 'mtg-shuffle/styles/bootstrap.scss';
import { ScryfallParser } from "mtg-shuffle/resources/ScryfallParser";

interface State {
    card: Scryfall.Card | null,
    cardInput: string,
    error: string,
}

export class TestContainer extends Component<{}, State> {
    parser = new ScryfallParser();

    constructor(props: {}) {
        super(props);
        this.state = {
            card: null,
            cardInput: '',
            error: '',
        };
    }

    private renderError() {
        if (this.state.error) {
            return (
                <span className={bootstrap['text-danger']}> {this.state.error} </span>
            );
        }
        return null;
    }

    private renderCard() {
        if (!this.state.card) {
            return null;
        }

        return (
            <img src={this.state.card!.image_uris!.normal} />
        )
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>
                    Input:
                    <input type="text" 
                        placeholder="Card name here" 
                        value={this.state.cardInput} 
                        onChange={this.handleChange}/>
                    <input type="submit"
                        value="Submit" />
                    {this.renderError()}
                </p>
                <p>
                    {this.renderCard()}
                </p>
            </form>
        );
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            cardInput: event.target.value,
        })

    }

    handleSubmit = (event: React.FormEvent) => {
        let input = this.state.cardInput.trim();
        this.parser.getCards([input])
            .catch(error => {
                this.setState({error: `${error}`});
                return {} as any;
            })
            .then(results => {
                if (input in results) {
                    this.setState({
                        card: results[input],
                        error: '',
                    });
                }
            });
        event.preventDefault();
    }
}