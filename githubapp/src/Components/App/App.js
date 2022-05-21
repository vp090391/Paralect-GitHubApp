import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
        }
    }

    onUsernameChange = (username) => {
        this.setState({ username });
    };

    render() {
        return (
            <div className="App">
                <Header onUsernameChange={this.onUsernameChange}/>
                <Main/>
            </div>
        );
    }
}