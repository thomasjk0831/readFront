import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { getSubs } from '../action/index'
import Sidebar from './Sidebar'
import { axiosWithAuth } from '../utils/axiosWithAuth'

function SubForm(props) {
    const history = useHistory()
    const [subName, setSubName] = useState('')

    const changeHandler = (e) => {
        setSubName(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (!subName) {
            alert("subreadit name cannot be blank")
            return
        }

        if (props.subreadits.find(item => item.name === subName)) {
            alert(`"${subName}" subreadit already exists! `)
            return
        }

        axiosWithAuth().post("/r/", { name: subName })
            .then(res => {
                props.getSubs(res.data)
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div className="subForm-container">

            <form className="subForm" onSubmit={submitHandler}>
                <div className="createSub">Create a new subreadit</div>
                <input
                    type="text"
                    name="name"
                    value={subName}
                    onChange={changeHandler}
                    placeholder="Enter new subreadit"
                />
                {props.loggedIn ?
                    <button className="subForm-button">
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

export default connect(mapStateToProps, { getSubs })(SubForm)

