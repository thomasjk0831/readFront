import React, { useState } from 'react'
import { connect } from 'react-redux'
import { searchPosts, getPosts } from '../action/index'

function Search(props) {
    const [searchString, setSearchString] = useState('')
    const changeHandler = (e) => {
        setSearchString(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        props.searchPosts(searchString)

    }
    return (
        <div className="search-container">
            <form onSubmit={submitHandler}>
                <input
                    type="text"
                    name="searchString"
                    value={searchString}
                    placeholder="Search Posts"
                    onChange={changeHandler}
                />
                <button className="search-button">
                    <i class="fa fa-search"></i>
                </button>
            </form>
        </div>

    )
}
function mapStateToProps(state) {
    return {
        Posts: state.Posts
    }
}

export default connect(mapStateToProps, { searchPosts, getPosts })(Search)
