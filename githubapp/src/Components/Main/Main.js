import React from 'react';
import './Main.css';
import followersImg from './assets/followersImg.svg';
import followingImg from './assets/followingImg.svg';

export default class Main extends React.Component {
    render() {
        const {avatar_url,
            html_url,
            name,
            login,
            followers,
            following} = this.props.userInfo;

        return (
            <main className='main'>
                <div className='user-info'>
                    <img className='user-foto' src={avatar_url} alt='user foto'/>
                    <h2 className='user-name'>{name}</h2>
                    <a href={html_url}
                       className='user-login'
                       target='_blank'
                       rel="noopener noreferrer"
                       title='Open User page'>
                        <h1>{login}</h1>
                    </a>
                    <div className='user-follows'>
                        <div>
                            <img src={followersImg} alt='picture of two peoplee'/>
                            {followers > 1000 ? (followers/1000).toFixed(1) + 'k' : followers}
                            <span>followers</span>
                        </div>
                        <div>
                            <img src={followingImg} alt='picture of one person'/>
                            {following > 1000 ? (following/1000).toFixed(1) + 'k' : following}
                            <span>following</span>
                        </div>
                    </div>

                </div>

                <div className='user-repos'></div>
            </main>
        )
    }
}