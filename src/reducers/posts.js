import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, LIKE, DELETE, START_LOADING, END_LOADING, FETCH_POST } from '../../src/constants/actionTypes'

export default (state = { isLoading: true, posts: [] }, action) => {
    switch (action.type) {
        case FETCH_POST:
            return { ...state, post: action.payload }
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currrentPage: action.payload.currrentPage,
                numberOfPages: action.payload.numberOfPages
            }
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload }
        case CREATE:
            return [...state, [...state.posts, action.payload]]
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) }
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }
        default:
            return state
    }
}