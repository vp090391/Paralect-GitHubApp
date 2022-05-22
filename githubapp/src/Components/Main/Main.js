import React from 'react';
import './Main.css';
import followersImg from './assets/followersImg.svg';
import followingImg from './assets/followingImg.svg';
import startToSearchUserImg from './assets/startToSearchUserImg.svg';
import noUserNoticeImg from './assets/noUserNoticeImg.svg';
import noReposNoticeImg from './assets/noReposNotice.svg';
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
            username,
            noUserNotice,
            userRepos,
            noReposNotice } = this.props;

        if (isLoading) {
            return (
                <main className='main'>
                    <Loading/>
                </main>
            )
        } else if (!username) {
            return (
                <main className='main'>
                    <div className='notice'>
                        <img src={startToSearchUserImg} alt='loupe'/>
                        <p>Start with searching<br/>
                            a GitHub user</p>
                    </div>
                </main>
            )
        }  else if (noUserNotice) {
            return (
                <main className='main'>
                    <div className='notice'>
                        <img src={noUserNoticeImg} alt='a person'/>
                        <p>User not found</p>
                    </div>
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
                                <img src={followersImg} alt='two people'/>
                                {followers > 1000 ? (followers/1000).toFixed(1) + 'k' : followers}
                                <span>followers</span>
                            </div>
                            <div>
                                <img src={followingImg} alt='one person'/>
                                {following > 1000 ? (following/1000).toFixed(1) + 'k' : following}
                                <span>following</span>
                            </div>
                        </div>
                    </div>

                    {userRepos.length ?
                        <div className='user-repos'>
                            <h3>Repositories ({userRepos.length})</h3>
                            <section>
                                {userRepos.map((repo) => {
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
                                })}
                            </section>
                        </div>
                        : <div className='noRepo-notice'>
                            <img src={noReposNoticeImg} alt='black box'/>
                            <p>Repository list is empty</p>
                        </div>
                    }
                </main>
            )
        }
    }
}