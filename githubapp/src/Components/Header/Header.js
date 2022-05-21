import React from 'react';
import './Header.css';
import logo from './assets/logo.svg';
import inputImage from './assets/input image.svg';

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
        this.setState({ username: event.target.value });
    };

    handleSubmit(event) {
        this.props.onUsernameChange(this.state.username);
        event.preventDefault();
    }

    render() {
        return (
            <header className="header">
                <img src={logo} alt='logo'/>
                <div className='input'>
                    <img src={inputImage} alt='loupe'/>

                    <form onSubmit={this.handleSubmit}>
                            <input type="text"
                                   placeholder="Enter GitHub username"
                                   value={this.state.username}
                                   onChange={this.handleChange}/>
                    </form>
                </div>

            </header>
        )
    }
}