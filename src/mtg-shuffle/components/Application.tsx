import React, { Component } from "react";

import bootstrap from 'mtg-shuffle/styles/bootstrap.scss';

import { TestContainer } from "./TestContainer";
import { LoremIpsum } from "./LoremIpsum";

export class Application extends Component {
    render() {
        return (<div className={bootstrap.container}>
            <h1>Test Application</h1> 
            <LoremIpsum />
            <TestContainer />
        </div>)
    }
}