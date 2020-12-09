export const initialState = {
    posts: [],
    filteredPosts: [],
    post: {},
    subreadits: [],
    comments: [],
    loggedIn: false,
    loggedUser: '',
    userId: null,

}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_POSTS":
            return {
                ...state,
                posts: action.payload
            }
        case "GET_SUBS":
            return {
                ...state,
                subreadits: action.payload
            }
        case "LOG_USER_IN":

            return {
                ...state,
                loggedIn: true,
                loggedUser: action.payload.username,
                userId: action.payload.id
            }
        case "LOG_USER_OUT":
            return {
                ...state,
                loggedIn: false,
                loggedUser: '',
                userId: null
            }
        case "SET_SINGLE_POST":
            return {
                ...state,
                post: action.payload
            }
        case "UP_VOTE_POST":
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (action.payload === post.id)
                        return { ...post, likes: ++post.likes }
                    else return { ...post }
                })
            }
        case "DOWN_VOTE_POST":
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (action.payload === post.id)
                        return { ...post, likes: --post.likes }
                    else return { ...post }
                })
            }
        case "UP_VOTE_SINGLE_POST":
            return {
                ...state, post: { ...state.post, likes: ++state.post.likes }
            }
        case "DOWN_VOTE_SINGLE_POST":
            return {
                ...state, post: { ...state.post, likes: --state.post.likes }
            }
        case "SET_COMMENTS":
            return {
                ...state, comments: action.payload
            }
        case "UPVOTE_COMMENT":
            return {
                ...state, comments: state.comments.map(comment => {
                    if (action.payload === comment.id)
                        return { ...comment, likes: ++comment.likes }
                    else return { ...comment }
                })
            }
        case "DOWNVOTE_COMMENT":
            return {
                ...state, comments: state.comments.map(comment => {
                    if (action.payload === comment.id)
                        return { ...comment, likes: --comment.likes }
                    else return { ...comment }
                })
            }
        case "DELETE_COMMENT":
            return {
                ...state, comments: state.comments.filter(comment => {
                    return (comment.id !== action.payload)
                })

            }
        case "TOGGLE_LOGIN":
            return {
                ...state, loggedIn: true
            }
        case "SEARCH_POSTS":
            return {
                ...state, posts: state.posts.filter(post => {
                    if (post.title.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1)
                        return post
                })
            }
        case "DELETE_POST":
            return {
                ...state, posts: state.posts.filter(post => {
                    if (post.id !== action.payload)
                        return post
                })
            }
        case "ADD_POST":
            return {
                ...state,
                posts: [...state.posts, action.payload]
            }

        default: return state
    }
}