import React, { useState } from 'react'
import axios from '../utils/axios'
import { useHistory } from 'react-router-dom'
import { logUserIn } from '../action/index'
import { connect } from 'react-redux'

const initialUser = {
    username: "",
    password: ""
}


function Login(props) {
    const history = useHistory()
    const [user, setUser] = useState({})

    //state toggler for user option: register(false) or login(true)
    const [userOption, setUserOption] = useState(true)
    const [badCred, setBadCred] = useState(false)

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const changeOption = (e) => {
        setUserOption(!userOption)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (userOption) {
            axios.post("/api/auth/login", user)
                .then((res) => {
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("user_id", res.data.user.id)
                    props.logUserIn(res.data.user)
                    history.push('/')
                })
                .catch(err => setBadCred(true))
        }
        else {
            axios.post("/api/auth/register", user)
                .then((res) => {
                    axios.post("/api/auth/login", user)
                        .then((res) => {
                            localStorage.setItem("token", res.data.token)
                            localStorage.setItem("user_id", res.data.user.id)
                            props.logUserIn(res.data.user)
                            history.push('/')
                        })
                        .catch(err => { console.log(err) })

                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className="loginForm-container">
            <form className="loginForm" onSubmit={submitHandler}>
                <i className="fa fa-reddit-square" aria-hidden="true"></i>
                <h2 className="login-banner">{userOption ? "LOGIN" : "REGISTER"}</h2>

                <input
                    name="username"
                    value={user.username}
                    onChange={changeHandler}
                    placeholder="Username"
                    className="loginInput"
                />

                <input
                    name="password"
                    value={user.password}
                    onChange={changeHandler}
                    placeholder="Password"
                    className="loginInput"

                />
                <div onClick={changeOption}>
                    {
                        userOption ? <div className="login-question">Not a member?
                            < span style={{ color: "#007BFD" }}>Join</span>
                        </div> :
                            <div className="login-question">Already a member?
                                <span style={{ color: "#007BFD" }}>login</span>
                            </div>
                    }

                </div>
                <button className="login-button">Submit</button>
                {
                    badCred ? <div className="err-msg">Wrong Username or Password</div> : null
                }
            </form>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, { logUserIn })(Login)
