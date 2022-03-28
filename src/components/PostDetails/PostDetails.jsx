import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import { Paper, Typography, CircularProgress, Divider } from '@material-ui/core'
import useStyles from './styles'
import { getPost } from '../../actions/posts'
const PostDetails = () => {
    const { post, posts, isLoading } = useSelector((state) => state.posts)
    const dispatch = useDispatch()
    const historr = useNavigate()
    const classes = useStyles()
    const { id } = useParams();

    useEffect(() => {
        dispatch(getPost(id))
    }, [id]);

    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }
    return (
        <div>
            <h2>{post.title}</h2>
        </div>
    )
}

export default PostDetails
