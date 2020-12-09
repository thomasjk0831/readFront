import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { checkLoggedIn } from '../utils/checkLoggedIn'
import Sidebar from './Sidebar'
import axios from '../utils/axios'

const styleColor = {
    color: "#007BFD",
    cursor: "pointer"
}


function SubPage(props) {
    const { id } = useParams()
    const history = useHistory()
    //subreadits that match r/:id that the user types in
    const [subs, setSubs] = useState([])
    //array of posts that belongs to current subreadit
    const [posts, setPosts] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                let subData = await axios.get('/r')
                subData = subData.data.filter(item => item.name === id)
                setSubs(subData)
                const postData = await axios.get(`/r/${id}`)
                setPosts(postData.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [id])

    const postLinkHandler = (post_id) => {
        history.push(`/post/${post_id}`)
    }

    const subLinkHandler = (name) => {
        history.push(`/r/${name}`)
    }

    const upVoteHandler = (post_id) => {
        if (checkLoggedIn()) {
            setPosts(posts.map(post => {
                if (post.id === post_id) {
                    return { ...post, likes: ++post.likes }
                }
                else return { ...post }
            }))
            axios.put(`/api/post/upvote/${post_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        else
            history.push(`/login`)
    }

    const downVoteHandler = (post_id, post_likes) => {
        if (checkLoggedIn()) {
            if (post_likes <= 0)
                return
            setPosts(posts.map(post => {
                if (post.id === post_id) {
                    return { ...post, likes: --post.likes }
                }
                else return { ...post }
            }))
            axios.put(`/api/post/downvote/${post_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        else
            history.push(`/login`)
    }

    return (
        <div className="subPage-container">
            <div className="subPage">

                <div>
                    {!subs.length ? <div>No such sub</div> : null}
                </div>
                <div>r/{id}</div>
                <div>
                    {
                        posts.length ?
                            posts.map(post => {
                                return <div className="post" >
                                    <div className="like-container">
                                        <div className="upvote" onClick={() => { upVoteHandler(post.id) }}>
                                            <i class="fa fa-angle-up"></i>
                                        </div>
                                        <div className="downvote" onClick={() => { downVoteHandler(post.id, post.likes) }}>
                                            <i class="fa fa-angle-down"></i>
                                        </div>
                                    </div>

                                    <div>
                                        <div onClick={() => postLinkHandler(post.id)} style={{ color: "#0000FF", cursor: "pointer" }} >{post.title} </div>
                                        <div className="post-info">
                                            Posted By:
                                        <span>{post.username}</span> on subreadit:
                                        <span onClick={() => subLinkHandler(post.name)} style={styleColor}>
                                                /r/{post.name}
                                            </span>
                                        </div>
                                        <div className="post-info">Likes: {post.likes} </div>
                                    </div>
                                </div>
                            }) : null
                    }
                </div>
            </div>
            <div className="side">
                <Sidebar />
            </div>
        </div>

    )
}

function mapStateToProps(state) {
    return {
        subreadits: state.subreadits
    }
}

export default connect(mapStateToProps, {})(SubPage)
