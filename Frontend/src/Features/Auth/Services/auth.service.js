import axios from 'axios';

const api = axios.create({
    baseURL: "https://buildstackk.onrender.com/api/v1/user",
    withCredentials: true
});

export const register = async (userData) => {
    const formData = new FormData();
    formData.append('userName', userData.userName);
    formData.append('email', userData.email);
    formData.append('password', userData.password);
    formData.append('gender', userData.gender);
    formData.append('bio', userData.bio || '');

    if (userData.avatar) {
        formData.append('avatar', userData.avatar);
    }

    const response = await api.post('/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};

export const login = async (userData) => {
    const response = await api.post('/login', userData);
    return response.data;
};

export const logoutUser = async () => {
    const response = await api.post('/logout');
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/getProfile');
    return response.data;
};

export const updateProfile = async (userData) => {
    const formData = new FormData();
    if (userData.userName) formData.append('userName', userData.userName);
    if (userData.email) formData.append('email', userData.email);
    if (userData.bio) formData.append('bio', userData.bio);
    if (userData.avatar) formData.append('avatar', userData.avatar);

    const response = await api.post('/updateProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
};