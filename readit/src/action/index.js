export const getPosts = (posts) => {
    return {
        type: "GET_POSTS",
        payload: posts
    }
}
export const getSubs = (subs) => {
    return {
        type: "GET_SUBS",
        payload: subs
    }
}

export const setSinglePost = (post) => {
    return {
        type: "SET_SINGLE_POST",
        payload: post
    }
}
export const logUserIn = (user) => {
    return {
        type: "LOG_USER_IN",
        payload: user
    }
}

export const logUserOut = () => {
    return {
        type: "LOG_USER_OUT"
    }
}

export const upVotePost = (id) => {
    return {
        type: "UP_VOTE_POST",
        payload: id
    }
}
export const downVotePost = (id) => {
    return {
        type: "DOWN_VOTE_POST",
        payload: id
    }
}
export const upVoteSinglePost = (id) => {
    return {
        type: "UP_VOTE_SINGLE_POST",
        payload: id
    }
}
export const downVoteSinglePost = (id) => {
    return {
        type: "DOWN_VOTE_SINGLE_POST",
        payload: id
    }
}
export const setComments = (comments) => {
    return {
        type: "SET_COMMENTS",
        payload: comments
    }
}
export const upVoteComment = (id) => {
    return {
        type: "UPVOTE_COMMENT",
        payload: id
    }
}
export const downVoteComment = (id) => {
    return {
        type: "DOWNVOTE_COMMENT",
        payload: id
    }
}
export const deleteComment = (id) => {
    return {
        type: "DELETE_COMMENT",
        payload: id
    }
}

export const toggleLogin = () => {
    return {
        type: "TOGGLE_LOGIN",

    }
}

export const searchPosts = (string) => {
    return {
        type: "SEARCH_POSTS",
        payload: string
    }
}

export const deletePost = (post_id) => {
    return {
        type: "DELETE_POST",
        payload: post_id
    }

}
export const addPost = (post) => {
    return {
        type: "ADD_POST",
        payload: post
    }
}