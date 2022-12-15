import * as types from "./types";
import * as api from "../api/index"

export const fetchPosts = (post) => async (dispatch) => {
    try{
        const {data} = await api.fetchPosts();
        dispatch({
            type: types.FETCH_POSTS,
            payload:data
        })
    }catch(error){
        console.log(error)
    }
}

export const createPost = (post) => async (dispatch) => {
    try{
        const {data} = await api.createPost(post);
        dispatch({
            type: types.CREATE_POST,
            paylod:data 
        })

    }catch(error){
        console.log(error)
    }
}

export const updatePost = (_id, updatedPost) => async (dispatch) => {
    console.log(_id,"actions update id")
    try{
        const {data} = await api.updatePost(_id, updatedPost);
        dispatch({
            type: types.UPDATE_POST,
            paylod:data 
        })

    }catch(error){
        console.log(error)
    }
}

export const fetchSinglePost = (_id) => async (dispatch) => {
    try{
        const {data} = await api.fetchSinglePost(_id);
        dispatch({
            type: types.FETCH_SINGLE_POST,
            payload:data
        })
    }catch(error){ 
        console.log(error)
    }
}

export const deletePost = (_id) => async (dispatch) => {
    try{
        const {data} = await api.deletePost(_id);
        dispatch({
            type: types.DELETE_POST,
            paylod:data._id 
        })

    }catch(error){
        console.log(error)
    }
}