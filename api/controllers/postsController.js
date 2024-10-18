import Post from '../models/Post.js';

const getAllPosts = async(req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPostById = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.json(post);
      } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createPost = async(req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        publish_at: req.body.publish_at || Date.now(),
      });
    
      try {
        const newPost = await post.save();
        res.status(201).json(newPost);
      } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const updatedPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
    
        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        post.publish_at = req.body.publish_at || post.publish_at;
    
        const updatedPost = await post.save();
        res.json(updatedPost);
      } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });
        
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export { getAllPosts, getPostById, createPost, updatedPost, deletePost };