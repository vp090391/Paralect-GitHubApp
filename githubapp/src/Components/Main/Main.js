import React from 'react';
import './Main.css';
import followersImg from './assets/followersImg.svg';
import followingImg from './assets/followingImg.svg';
import Loading from "../Loading/Loading";

export default class Main extends React.Component {
    render() {
        const {avatar_url,
            html_url,
            name,
            login,
            followers,
            following} = this.props.userInfo;
        const {isLoading,
            userRepos} = this.props;

        if (isLoading) {
            return (
                <main className='main'>
                    <Loading />
                </main>
            )
        } else {
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

                    <div className='user-repos'>
                        <h3>Repositories ({userRepos.length})</h3>
                        <section>
                            {userRepos.length ? userRepos.map((repo) => {
                                return (
                                    <div className='user-repo'
                                         key={repo.name}>
                                        <a href={repo.html_url}
                                           target='_blank'
                                           rel="noopener noreferrer"
                                           title='Open User repository'>
                                            <h2>{repo.name}</h2>
                                        </a>
                                        <p>{repo.description}</p>
                                    </div>
                                )
                            }) : null}
                        </section>
                    </div>
                </main>
            )
        }
    }
}