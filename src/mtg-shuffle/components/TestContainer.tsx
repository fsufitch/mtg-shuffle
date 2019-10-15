import React, { Component } from "react";

import bootstrap from 'mtg-shuffle/styles/bootstrap.scss';

export class TestContainer extends Component {
    state = {
        displayTitle: 'No title input',
        formTitle: '',
        error: '',
    };

    private renderError() {
        if (this.state.error) {
            return (
                <span className={bootstrap['text-danger']}> Error: {this.state.error} </span>
            );
        }
        return null;
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Title: {this.state.displayTitle}</h2>
                <p>
                    Input:
                    <input type="text" 
                        placeholder="New title here" 
                        value={this.state.formTitle} 
                        onChange={this.handleChange}/>
                    <input type="submit"
                        value="Submit" />
                    {this.renderError()}
                </p>
            </form>
        );
    }

    private validateTitle(title: string) {
        if (/[0-9]/.test(title)) {
            return 'No numbers allowed';
        }
        return '';
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>)  => {
        this.setState({
            formTitle: event.target.value,
            error: this.validateTitle(event.target.value),
        })

    }

    handleSubmit = (event: React.FormEvent) => {
        if (this.state.error) {
            alert("Invalid input!");
        } else {
            this.setState({displayTitle: this.state.formTitle});
        }
        event.preventDefault();
    }
}