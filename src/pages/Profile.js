import React, {Fragment, useContext, useEffect} from "react";
import {GithubContext} from "../context/github/githubContext";
import {Link, useParams} from "react-router-dom";
import {Repos} from "../components/Repos";

export const Profile = () => {

    const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)

    const {nickname} = useParams()




    useEffect(() => {
        getUser(nickname)
        getRepos(nickname)
        // eslint-disable-next-line
    }, [])

    if (loading) {
        return <p className='text-center'>Загрузка...</p>
    }

    const {
         name, company, avatar_url,
        location, bio, blog,
        login, html_url, followers,
        following,
        public_repos, public_gists
    } = user

    return (
        <Fragment>
            <Link to='/' className='btn btn-link'>На главную</Link>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-sm-3 text-center">
                            <img src={avatar_url} alt={name} style={{width: '150px'}}/>
                            <h1>{name}</h1>
                            {location && <p>Местоположение: {location}</p>}
                        </div>
                        <div className="col">
                            {
                                bio && <Fragment>
                                <h3>BIO</h3>
                                <h1>{bio}</h1>
                                </Fragment>
                            }
                            <a href={html_url} target='_blank' className='btn btn-dark' rel="noreferrer">Открыть профиль</a>
                            <ul>
                                {login && <li>
                                    <strong>Username: </strong> {login}
                                </li>}

                                {company && <li>
                                    <strong>Company: </strong> {company}
                                </li>}

                                {blog && <li>
                                    <strong>Website: </strong> {blog}
                                </li>}
                            </ul>
                            <span className="badge rounded-pill text-bg-primary">Followers: {followers}</span>
                            <span className="badge rounded-pill text-bg-success">Following: {following}</span>
                            <span className="badge rounded-pill text-bg-info">Repositories: {public_repos}</span>
                            <span className="badge rounded-pill text-bg-dark">Gists: {public_gists}</span>
                        </div>
                    </div>
                </div>
                <Repos repos={repos} />
            </div>
        </Fragment>
    )
}