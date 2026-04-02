import { useDispatch } from "react-redux";
import {
  setLoading,
  setError,
  setPosts,
  addPostToState,
  setUserPosts,
  setSinglePost,
  updatePosts,
} from "../Slices/home.slice";

import {
  addPost,
  getAllPosts,
  getUserPosts,
  getAProject,
  likeAProject,
} from "../Services/home.sevice";

export const usePost = () => {
  const dispatch = useDispatch();

  // 🔹 Create Post
  const handleCreatePost = async (postData) => {
    try {
      dispatch(setLoading(true));
      const res = await addPost(postData);
      dispatch(addPostToState(res.post));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Get All Posts
  const handleGetPosts = async () => {
    try {
      dispatch(setLoading(true));
      const res = await getAllPosts();
      dispatch(setPosts(res.posts));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Get User Posts
  const handleGetUserPosts = async (id) => {
    try {
      dispatch(setLoading(true));
      const res = await getUserPosts(id);
      dispatch(setUserPosts(res.posts));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Get Single Post
  const handleGetSinglePost = async (postId) => {
    try {
      dispatch(setLoading(true));
      const res = await getAProject(postId);
      dispatch(setSinglePost(res.post));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔹 Like Post
  const handleLikePost = async (id) => {
    try {
      const res = await likeAProject(id);
      dispatch(updatePosts(res.Like));
    } catch (error) {
      dispatch(setError(error.response?.data || error.message));
    }
  };

  return {
    handleCreatePost,
    handleGetPosts,
    handleGetUserPosts,
    handleGetSinglePost,
    handleLikePost,
  };
};
