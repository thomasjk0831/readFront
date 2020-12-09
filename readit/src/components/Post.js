import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory, useParams, Link } from 'react-router-dom'
import axios from '../utils/axios'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import SideBar from './Sidebar'
import Comments from './Comments'
import { checkLoggedIn } from '../utils/checkLoggedIn'
import { upVoteSinglePost, downVoteSinglePost, setSinglePost, setComments, deletePost, upVotePost } from '../action/index'



function Post(props) {
    //post id
    const { id } = useParams()

    //user_id
    const tempid = localStorage.getItem('user_id')
    const history = useHistory()
    // post based on id


    useEffect(() => {
        async function fetchData() {
            try {
                const resPost = await axios.get(`/api/post/${id}`)
                props.setSinglePost(resPost.data)
                const resComments = await axios.get(`/api/post/${id}/comments`)
                props.setComments(resComments.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])



    const upVoteHandler = (post_id) => {
        if (checkLoggedIn()) {
            props.upVoteSinglePost(post_id)
            props.upVotePost(post_id)
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
            props.downVoteSinglePost(post_id)
            axios.put(`/api/post/downvote/${post_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        else
            history.push(`/login`)
    }

    const deletePostHandler = (post_id) => {
        axiosWithAuth().delete(`/api/post/${post_id}`)
            .then(res => {
                props.deletePost(post_id)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="postPage-container">

            <div className="post-container">
                <div className="post-details">
                    <div className="like-container PostPage">
                        <div className="upvote-container">
                            <div className="upvote" onClick={() => { upVoteHandler(props.post.id) }}>
                                <i class="fa fa-angle-up"></i>
                            </div>
                            <div className="downvote" onClick={() => { downVoteHandler(props.post.id, props.post.likes) }}>
                                <i class="fa fa-angle-down"></i>
                            </div>

                        </div>
                        <div style={{ color: "#0000FF" }}>{props.post.title} </div>
                    </div>

                    <div>
                        <div className="post-body"> {props.post.body} </div>
                        <div className="post-info">
                            Posted By: {props.post.username} on subreadit:
                            <span style={{ color: "#007BFD", cursor: "pointer" }}>
                                <Link to={`/r/${props.post.subreadit}`}>
                                    /r/{props.post.subreadit}
                                </Link>
                            </span>
                        </div>
                        <div className="post-info">
                            Likes: {props.post.likes}    Comments: {props.comments.length}

                            {localStorage.user_id == props.post.user_id ?
                                <span onClick={() => deletePostHandler(props.post.id)} style={{ color: "#007BFD", cursor: "pointer" }}>
                                    &nbsp;&nbsp;delete
                                              </span> : null
                            }
                        </div>
                    </div>
                </div>
                <Comments />
            </div>
            <div className="side">
                <SideBar />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        post: state.post,
        subreadits: state.subreadits,
        comments: state.comments
    }
}

export default connect(mapStateToProps, { upVoteSinglePost, downVoteSinglePost, setSinglePost, setComments, deletePost, upVotePost })(Post)
