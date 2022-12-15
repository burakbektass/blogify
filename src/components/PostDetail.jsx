import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles'
import { Typography, Paper, Divider, Button, Chip } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePost, deletePost } from "../actions/post";
import EditPostForm from './EditPostForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(3),
        marginBottom: theme.spacing(8)
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: theme.spacing(3)
    },
    img: {
        width: "100%",
        borderRadius: 5,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(4)
    },
    chip: {
        marginTop: theme.spacing(1)
    },

}))

const PostDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams()
    const classes = useStyles()
    const currentPost = useSelector(state => state?.posts?.currentPost)
    const [editMode, setEditMode] = useState(false);

    const openEditMode = () => {
        setEditMode(true)
    };
    const closeEditMode = () => {
        setEditMode(false)
    };
    useEffect(() => {
        dispatch(fetchSinglePost(id));
    }, [dispatch])

    const convertRelativeTime = date => {
        return moment(date).fromNow();
    }
    const removePost = () => {
        dispatch(deletePost(currentPost._id));
        navigate("/")

    }
    return (
        <Paper className={classes.paper} elevation={0}>
            {editMode ? (<EditPostForm post={currentPost} closeEditMode={closeEditMode} />) : (<div>
                <div>
                    <div className={classes.header}>
                        <Typography variant="h5" gutterBottom>
                            {currentPost?.title}
                        </Typography>
                        <div>
                            <Button color='primary' variant='outlined' startIcon={<EditIcon />} onClick={openEditMode}>Düzenle</Button>{" "}
                            <Button color='secondary' variant='outlined' startIcon={<DeleteIcon />} onClick={removePost} >Sil</Button>
                        </div>
                    </div>
                </div>
                <Divider />
                <Typography variant="overline" gutterBottom>
                    {currentPost?.subtitle}
                </Typography>
                <Typography variant='caption' component="p">
                    {convertRelativeTime(currentPost?.createdAt)} by Burak
                </Typography>
                <Chip label={` # ${currentPost?.tag}`} variant="outlined" className={classes.chip} />
                <div className={classes.content}>
                    <img src={currentPost?.image} alt="Post" className={classes.img} />
                    <Typography variant="body1" gutterBottom>
                        {currentPost?.content}
                    </Typography>
                </div>
            </div>)}
        </Paper>
    )
}

export default PostDetail;