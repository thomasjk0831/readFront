import React, { useState } from 'react'
import { axiosWithAuth } from '../utils/axiosWithAuth'
import { connect } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { addPost } from '../action/index'

function PostForm(props) {
    const history = useHistory()
    const [post, setPost] = useState({ title: '', body: '', subreadit_id: '', user_id: null })
    const [postValid, setPostValid] = useState(true)

    const changeHandler = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        //search if subreadit exists
        const tempSub = props.subreadits.filter(s => {
            if (s.name === post.subreadit_id)
                return s
            else
                return
        })
        //check if post is valid
        if (tempSub.length && post.title && post.body) {
            const tempId = localStorage.getItem('user_id')
            const tempPost = { ...post, subreadit_id: tempSub[0].id, user_id: tempId }
            fetchData(tempPost)
        }
        else {
            setPostValid(false)
        }
    }

    const fetchData = (tempPost) => {
        axiosWithAuth()
            .post('/api/post', tempPost)
            .then(res => {
                props.addPost(res.data)

                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className="postForm-container">
            <form className="postForm" onSubmit={submitHandler}>
                <div className="createPost">Create a new post</div>
                <input
                    id="title"
                    name="title"
                    type="text"
                    value={post.title}
                    placeholder="Enter title"
                    onChange={changeHandler}
                />
                <textarea
                    id="body"
                    name="body"
                    className="postForm-body"
                    type="textarea"
                    value={post.body}
                    placeholder="Enter body"
                    onChange={changeHandler}
                />
                <input
                    id="subreadit_id"
                    name="subreadit_id"
                    type="text"
                    value={post.subreadit_id}
                    placeholder="Enter a subreadit"
                    onChange={changeHandler}
                />
                {postValid === false ? <div className="err-msg">Please enter a title, body and a valid subreadit</div> : null}
                {props.loggedIn ?
                    <button className="postForm-button">
                        submit
                    </button> : <div className="err-msg">You need to be <Link to='/login'>logged in</Link> to post</div>
                }
            </form>
            <div className="side">

                <Sidebar />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        subreadits: state.subreadits,
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps, { addPost })(PostForm)
