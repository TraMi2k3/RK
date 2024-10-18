import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import requestApi from '../request/request.js';

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    requestApi.getPostById(id)
      .then(response => setPost(response.data))
      .catch(error => console.error('Error fetching post:', error));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500 mb-4">
        Published at: {new Date(post.publish_at).toLocaleString()}
      </p>
      <Link
        to={`/posts/edit/${post.id}`}
        className="inline-block text-blue-500 hover:underline transition duration-200"
      >
        Edit
      </Link>
    </div>
  );
};

export default PostDetail;
