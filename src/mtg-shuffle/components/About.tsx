import React, { Component } from "react";

import styles from 'mtg-shuffle/styles';

export class About extends Component {    
    render() {
        return (
            <div>
                <p className={styles.lead}>
                    Computers are much better at shuffling cards than you, so why
                    not let the computer shuffle your deck? Here's how:
                </p>
                <ol type={"1"}>
                    <li>Paste your deck into the input box and hit the Shuffle button</li>
                    <li>Sort the cards in your deck in exactly the order shown</li>
                    <li>Shuffle your deck normally</li>
                </ol>
                <p>
                    <strong>Why does this work?</strong> The random card order shown
                    by the computer is based on simply assigning a random number to
                    every card in your deck &mdash; no biases, or imperfect
                    hand-shuffling to lower your entropy. Once the deck is in that 
                    truly random order, shuffling again by hand erases your knowledge
                    while preserving that randomness.
                </p>
                <p>
                    <strong>Can I shuffle multiple times?</strong> Yes, but if you
                    try to pick a shuffle that you "like", you are introducing a
                    non-random factor in the shuffle, and decreasing its randomness.
                </p>
                <p className={styles['font-weight-light']}>
                    <a href="https://github.com/fsufitch/mtg-shuffle">Check me out on Github!</a>
                </p>
            </div>
        )
    }
}