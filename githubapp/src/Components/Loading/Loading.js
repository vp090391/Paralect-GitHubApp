import React, { Component } from 'react';
import './Loading.css';
import loading from './assets/loading.svg';

export default class Loading extends Component {
    render() {
        return (
            <div className='loading'>
                <img src={loading} alt='loading...'/>
            </div>
        )
    }
}