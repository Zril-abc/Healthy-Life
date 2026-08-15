import api from './axios';

export const getFavorites = () => api.get('/favorites').then((res) => res.data);
export const addFavorite = (contentId) => api.post(`/favorites/${contentId}`).then((res) => res.data);
export const removeFavorite = (contentId) => api.delete(`/favorites/${contentId}`).then((res) => res.data);
