import reqAxios from './axios.js';

export default {
    getAllPost() {
        return reqAxios.get('/post');
    },
    getPostById(id) {
        return reqAxios.get(`/post/${id}`);
    },
    createPost(data) {
        return reqAxios.post('/post', data);
    },
    updatePost(id, data) {
        return reqAxios.put(`/post/${id}`, data);
    },
    deletePost(id) {
        return reqAxios.delete(`/post/${id}`);
    }
}