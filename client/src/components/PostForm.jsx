import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import requestApi from '../request/request.js';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [publishAt, setPublishAt] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      requestApi.getPostById(id)
        .then(response => {
          const { title, content, publish_at } = response.data;
          setTitle(title);
          setContent(content);
          setPublishAt(new Date(publish_at).toISOString().slice(0, 16)); // Định dạng cho input datetime-local
        })
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const post = { title, content, publish_at: publishAt };

    if (id) {
      requestApi.updatePost(id, post)
        .then(() => navigate('/'))
        .catch(error => console.error('Error updating post:', error));
    } else {
      requestApi.createPost(post)
        .then(() => navigate('/'))
        .catch(error => console.error('Error creating post:', error));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {id ? 'Edit Post' : 'Create Post'}
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Publish At</label>
          <input
            type="datetime-local"
            value={publishAt}
            onChange={(e) => setPublishAt(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring focus:ring-blue-300"
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {id ? 'Update' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
