import api from './axios';

export const getAllContent = (params) => api.get('/content', { params }).then((res) => res.data);
export const getContentById = (id) => api.get(`/content/${id}`).then((res) => res.data);
