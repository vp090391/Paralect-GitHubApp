import React from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
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
            noUserNotice: false,
            userRepos: [],
            noReposNotice: false,
        }
    }

    componentDidUpdate = async (prevProps, prevState, snapshot) => {
        if (prevState.username !== this.state.username) {
            await this.getUserInfo();
            await this.getUserRepos();
            this.setState({
                isLoading: false
            })
        }
    };

    componentDidCatch(error, errorInfo) {
        console.log(`Error happened. ${error}`);
        this.setState({ unknownError: 'Sorry, we have some problems with site' })
    }

    onErrorHandle = (error) => {
        console.log(`Error happened. ${error}`);
        this.setState({
            serverError: `Server is not available now.`,
            isLoading: false,
        })
    };

    getUserInfo = async () => {
        await fetch(`https://api.github.com/users/${this.state.username}`)
            .then((res) => {
                if (res.status === 404) {
                    this.setState({
                        noUserNotice: true,
                        isLoading: false
                    })
                }
                if (!res.ok && res.status !== 404) {
                    throw new Error('Bad response')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        userInfo: {
                            avatar_url: result.avatar_url,
                            html_url: result.html_url,
                            name: result.name,
                            login: result.login,
                            followers: result.followers,
                            following: result.following,
                        },
                    });
                },
            )
            .catch((error) => this.onErrorHandle(error));
    };

    getUserRepos = async () => {
        await fetch(`https://api.github.com/users/${this.state.username}/repos`)
            .then((res) => {
                if (res.status === 404) {
                    this.setState({
                        noReposNotice: true,
                        isLoading: false
                    })
                }
                if (!res.ok && res.status !== 404) {
                    throw new Error('Bad response')
                }
                return res.json()
            })
            .then(
                (result) => {
                    this.setState({
                        userRepos: result
                    });
                },
            )
            .catch((error) => this.onErrorHandle(error));
    };

    onUsernameChange = (username) => {
        this.setState({
            isLoading: true,
            noUserNotice: false,
            username
        });
    };

    render() {
        const { isLoading,
            serverError,
            unknownError,
            username,
            userInfo,
            noUserNotice,
            userRepos,
            noReposNotice } = this.state;

        if (serverError || unknownError) {
            return (
                <div className="App">
                    <div className='error'>{serverError}</div>
                    <div className='error'>{unknownError}</div>
                </div>
            )
        } else {
            return (
                <div className="App">
                    <Header onUsernameChange={this.onUsernameChange}/>
                    <Main isLoading={isLoading}
                          username={username}
                          userInfo = {userInfo}
                          noUserNotice={noUserNotice}
                          userRepos = {userRepos}
                          noReposNotice={noReposNotice}/>
                </div>
            )
        }
    }
}