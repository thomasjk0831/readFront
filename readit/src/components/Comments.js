import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setComments, upVoteComment, downVoteComment, deleteComment } from '../action/index'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { useParams, Link, useHistory } from 'react-router-dom'
import { checkLoggedIn } from '../utils/checkLoggedIn'



function Comments(props) {
    const { id } = useParams()
    const tempid = localStorage.getItem('user_id')
    const history = useHistory()

    const [reply, setReply] = useState({ body: '', user_id: tempid, post_id: Number(id) })


    const changeHandler = (e) => {
        setReply({ ...reply, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!reply.body) {
            alert("Comment cannot be blank")
            return
        }
        axiosWithAuth().post('/api/comment', reply)
            .then(res => {
                console.log("comments", res.data)
                props.setComments(res.data)

            })
            .catch(err => { console.log(err) })
    }

    const upVoteHandler = (comment_id) => {
        if (checkLoggedIn()) {
            props.upVoteComment(comment_id)
            axiosWithAuth().put(`/api/comment/upvote/${comment_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))

        }
        else {
            history.push('/login')
        }
    }

    const downVoteHandler = (comment_id, comment_likes) => {
        if (checkLoggedIn()) {
            if (comment_likes <= 0)
                return
            props.downVoteComment(comment_id)
            axiosWithAuth().put(`/api/comment/downvote/${comment_id}`)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        else {
            history.push('/login')
        }
    }

    const deleteCommentHandler = (comment_id) => {
        axiosWithAuth().delete(`/api/comment/${comment_id}`)
            .then(res => {
                props.deleteComment(comment_id)
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <>
            <form className="reply-container" onSubmit={submitHandler}>
                <p>Submit a comment</p>
                <input
                    id="body"
                    type="textarea"
                    name="body"
                    value={reply.body}
                    onChange={changeHandler}
                />

                {props.loggedIn ? <button>submit</button> : <div className='warning'>You must be <Link to='/login'>logged in</Link> to comment!</div>}
            </form>

            <div className="comments-container">
                <div>
                    {
                        props.comments.map(comment => {
                            return <div className="comments">
                                <div>
                                    <div className="upvote" onClick={() => { upVoteHandler(comment.id) }}>
                                        <i class="fa fa-angle-up"></i>
                                    </div>
                                    <div className="downvote" onClick={() => { downVoteHandler(comment.id, comment.likes) }}>
                                        <i class="fa fa-angle-down"></i>
                                    </div>
                                </div>

                                <div>
                                    <div>{comment.body}</div>
                                    <div className="post-info">Likes: {comment.likes}</div>
                                    <div className="post-info">By: {comment.username}
                                        {comment.user_id == localStorage.user_id ?
                                            <span onClick={() => deleteCommentHandler(comment.id)} style={{ color: "#007BFD", cursor: "pointer" }}>
                                                &nbsp;&nbsp;delete
                                              </span> : null
                                        }

                                    </div>

                                </div>
                            </div>
                        })
                    }
                </div>

            </div>
        </>
    )
}

function mapStateToProps(state) {
    return {
        comments: state.comments,
        loggedIn: state.loggedIn

    }
}

export default connect(mapStateToProps, { setComments, upVoteComment, downVoteComment, deleteComment })(Comments)
