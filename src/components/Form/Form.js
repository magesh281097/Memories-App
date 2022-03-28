import React, { useState, useEffect } from 'react'
import useStyles from './styles';
import FileBase from 'react-file-base64'
import { TextField, Paper, Typography, Button, Container } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';


const Form = ({ currentId, setCurrentId }) => {

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const classes = useStyles();
    const dispatch = useDispatch()
    const loggedUser = JSON.parse(localStorage.getItem('profile'))
    useEffect(() => {
        if (post) setPostData(post)
        // console.log('changes', currentId)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: loggedUser?.result?.name }))
        } else {
            dispatch(createPost({ ...postData, name: loggedUser?.result?.name }))
        }
        clear();
    }

    const clear = () => {
        setCurrentId(null)

        setPostData({ title: '', message: '', tags: '', selectedFile: '' })
    }

    if (!loggedUser?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please sign in to create a post
                </Typography>
            </Paper>
        )
    }
    // console.log('logged',loggedUser)
    return (
        <div>
            <Paper className={classes.paper}>
                <form autoComplete="off" noValidate className={`${classes.root} ${classes.form} `} onSubmit={handleSubmit}>
                    <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                    {/* <TextField name="creator" variant="outlined" label="creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} /> */}
                    <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                    <TextField name="message" variant="outlined" label="message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
                    <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
                    <div className={classes.fileInput}>
                        <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                    </div>
                    <Button className={classes.buttonSubmit} variant="contained" type="Submit" fullWidth size="large" color="primary">Submit</Button>
                    <Button variant="contained" fullWidth size="small" color="secondary" onClick={clear}>Clear</Button>
                </form>
            </Paper>
        </div>
    )
}

export default Form
