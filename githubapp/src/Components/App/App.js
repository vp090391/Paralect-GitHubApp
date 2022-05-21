import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <Main/>
            </div>
        );
    }
}