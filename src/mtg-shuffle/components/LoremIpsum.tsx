import React, { Component } from "react";

import bootstrap from 'mtg-shuffle/styles/bootstrap.scss';

import { loremIpsum } from 'lorem-ipsum';

export class LoremIpsum extends Component {
    render() {
        return (
            <p className={bootstrap.lead}>
                {loremIpsum({
                    count: 10,
                    units: 'sentences',
                    format: 'plain',
                })}
            </p>
        )
    }
}