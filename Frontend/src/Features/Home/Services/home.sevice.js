import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1/post',
    withCredentials: true
})


export const addPost = async (postData) => {
    const formData = new FormData()
    formData.append("caption", postData.caption);
    formData.append("visibility", postData.visibility);
    formData.append("tags", postData.tags)
    formData.append("media", postData.media)
    const response = await api.post("/createProject", formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data
}


export const getAllPosts=async()=>{
    const response=await api.get("/getProjects");
    return response.data
}

export const getUserPosts=async(id)=>{
    const response=await api.get(`/projects/${id}/projects`)
    return response.data
}

export const getAProject=async(postId)=>{
    const response=await api.get(`/projects/${postId}`)
    return response.data
}


export const likeAProject=async(id)=>{
    const response=await api.post(`/like/project/${id}`)
    return response.data
}