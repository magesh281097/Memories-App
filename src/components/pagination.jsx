import React, { useEffect } from 'react'

import { Pagination, PaginationItem } from '@material-ui/lab'
import { Link } from 'react-router-dom'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../actions/posts'

const Paginate = ({ page }) => {
    const dispatch = useDispatch();
    const { numberOfPages } = useSelector((state) => state.posts)
    const styles = useStyles()
    useEffect(() => {
        if (page) dispatch(getPosts(page))
    }, [page])
    return (
        <Pagination
            classes={{ ul: styles.ul }}
            count={numberOfPages}
            page={1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem component={Link} to={`/posts?page=${item.page}`} {...item} />
            )}
        />
    );
}

export default Paginate
