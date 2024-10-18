import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import PostDetail from './components/PostDetail';

function App() {

  return (
    <Router>
      <div className="flex flex-col h-screen items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Blog Management</h1>
        <div className="flex space-x-4 mb-3">
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Post List</Link>
          <Link to="/posts/new" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Create New Post</Link>
        </div>
        <div className='min-w-[760px]'>
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/posts/new" element={<PostForm />} />
            <Route path="/posts/edit/:id" element={<PostForm />} />
            <Route path="/posts/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
