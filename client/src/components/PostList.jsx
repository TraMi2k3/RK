import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import requestApi from '../request/request.js';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    requestApi.getAllPost() // API backend
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handleDelete = async(id) => {
    try {
      await requestApi.deletePost(id);
      const response = await requestApi.getAllPost();
      setPosts(response.data); 
    } catch(error) {
      console.log(error);
    } 
  }
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Post List</h1>
      <Link
        to="/posts/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
      >
        Create New Post
      </Link>
      <ul className="space-y-4">
        {posts.map(post => (
          <li key={post.id} className="border-b pb-4">
            <Link to={`/posts/${post._id}`}>
              <h2 className="text-xl font-semibold text-blue-600 hover:underline">{post.title}</h2>
            </Link>
            <p className="text-gray-700">{post.content.substring(0, 100)}...</p>
            <p className="text-sm text-gray-500 mb-2">
              Published at: {new Date(post.publish_at).toLocaleString()}
            </p>
            <div className='flex gap-3'>
              <Link
                to={`/posts/edit/${post.id}`}
                className="text-blue-500 hover:underline transition duration-200"
              >
                Edit
              </Link>
              <button
                onClick={()=>handleDelete(post._id)}
                className="text-red-500 hover:text-red-600 transition duration-200"
              >Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
