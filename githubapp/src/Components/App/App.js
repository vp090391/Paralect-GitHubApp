import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            //change isLoading on true
            serverError: null,
            unknownError: null,

            username: '',
            userInfo: {
                avatar_url: '',
                html_url: '',
                name: '',
                login: '',
                followers: '',
                following: '',
            },
            userRepos: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.username !== this.state.username) {
            fetch(`https://api.github.com/users/${this.state.username}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoading: false,
                            userInfo: {
                                avatar_url: result.avatar_url,
                                html_url: result.html_url,
                                name: result.name,
                                login: result.login,
                                followers: result.followers,
                                following: result.following,
                            }
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoading: false,
                            serverError: error.message,
                        });
                    }
                )
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(`Error happened. ${error}`);
        this.setState({ unknownError: 'Sorry, we have some problems with site' })
    }

    onUsernameChange = (username) => {
        this.setState({ username });
    };

    render() {
        const { userInfo } = this.state;
        return (
            <div className="App">
                <Header onUsernameChange={this.onUsernameChange}/>
                <Main userInfo = {userInfo}/>
            </div>
        );
    }
}