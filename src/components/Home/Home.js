import React, { useState, useEffect } from 'react';
import { Container, Typography, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom'
import chipInput from 'material-ui-chip-input'
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from '../../styles';
import { useDispatch } from 'react-redux';
import Paginate from '../pagination';
import { getPosts, getPostBySearch } from '../../actions/posts'
import ChipInput from 'material-ui-chip-input';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

export default function Home() {
    const [currentId, setCurrentId] = useState(null)
    const classes = useStyles();
    const dispatch = useDispatch()
    const query = useQuery();
    const history = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    // useEffect(() => {
    //     dispatch(getPosts())
    // }, [currentId, dispatch])

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost()
        }
    }

    const handleAdd = (tag) => {
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDel) => {
        setTags(tags.filter((tag) => tag != tagToDel))
    }
    const searchPost = (e) => {
        console.log('tags', tags);
        if (search.trim() || tags) {
            dispatch(getPostBySearch({ search, tags: tags.join(',') }))
            history(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
        } else {
            history('/posts')
        }
    }
    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid container justifyContent="space-between" align-items="stretch" spacing={3} className={classes.gridContainer}>
                    <Grid item xs={12} sm={6} md={9}>
                        <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} >
                        <AppBar style={{ padding: '15px' }} className={classes.appBarSearch} position="static" color="inherit" >
                            <TextField
                                name="search"
                                variant="outlined"
                                label="Search Memories"
                                fullWidth
                                value={search}
                                onKeyPress={handleKeyPress}
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                            <ChipInput
                                style={{ margin: '10px 0px' }}
                                value={tags}
                                onAdd={handleAdd}
                                onDelete={handleDelete}
                                label="Search Tags"
                                variant="outlined"
                            />
                            <Button onClick={searchPost} variant="contained" className={classes.searchButton} color="primary">Search</Button>
                        </AppBar>
                        <Form currentId={currentId} setCurrentId={setCurrentId} />
                        {(!searchQuery && !tags.length) && (
                            <Paper className={classes.paper} elevation={6}>
                                <Paginate page={page} />
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    )
}
