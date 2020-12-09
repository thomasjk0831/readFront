import React, { useEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { logUserOut, toggleLogin, getPosts, getSubs } from '../action/index'
import axios from '../utils/axios'


function Header(props) {
    const history = useHistory()
    //do not log userout out if site reloaded
    //log users back in with info in local storage
    useEffect(() => {
        if (localStorage.user_id)
            props.toggleLogin()
    }, [])

    useEffect(() => {
        async function fetchData() {
            try {
                const tempPosts = await axios.get('/api/post')
                props.getPosts(tempPosts.data)
                const tempSubs = await axios.get('/r')
                props.getSubs(tempSubs.data)
            }
            catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [])


    const logOutHandler = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
        props.logUserOut()
    }



    return (
        <div className="header">
            <NavLink to='/' className="nav">
                <img src={'../reddit.png'} className="logo" alt="reddit logo" />
                <div className="title">Readit</div>

            </NavLink>
            <div className="loginNav">
                {
                    (props.loggedIn) ?
                        <div onClick={logOutHandler}>Logout </div> : null
                }
                <NavLink to='/login' className="loginNav">
                    <div className={props.loggedIn ? "login" : "not-login"}>Login</div>
                </NavLink >

            </div>
        </div >
    )
}

function mapStateToProps(state) {
    return {
        loggedIn: state.loggedIn
    }
}
export default connect(mapStateToProps, { logUserOut, toggleLogin, getPosts, getSubs })(Header)
