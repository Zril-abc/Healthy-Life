import api from './client';

export const getActivities = () => api.get('/activities').then((res) => res.data);
export const addActivity = (data) => api.post('/activities', data).then((res) => res.data);
export const deleteActivity = (id) => api.delete(`/activities/${id}`).then((res) => res.data);
