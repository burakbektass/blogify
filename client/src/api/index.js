import axios from "axios";

const apiEndPoint ="http://localhost:5000/posts/";

export const fetchPosts = async () => await axios.get(apiEndPoint);

export const createPost = async (post) => await axios.post(apiEndPoint,post);

export const updatePost = async (_id, updatedPost) => await axios.patch(`${apiEndPoint}${_id}`, updatedPost);

export const fetchSinglePost = async (_id) => await axios.get(`${apiEndPoint}${_id}`)

export const deletePost = async (_id) => await axios.delete(`${apiEndPoint}${_id}`);