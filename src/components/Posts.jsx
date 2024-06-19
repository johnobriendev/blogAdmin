import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getPosts, createPost } from '../services/post';
import { logout } from '../services/auth';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const decodedToken = jwtDecode(token);
  const userId = decodedToken.id;
  
  //Fetch posts from data base
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts(token);
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [token]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPost = {
      title,
      content,
      author: userId, 
    };

    try {
      const createdPost = await createPost(token, newPost);

      setTitle('');
      setContent('');

      setPosts((prevPosts) => [...prevPosts, createdPost]);

      // const data = await response.json();
      // setPosts(data);

    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect or perform other actions after logout if needed
      navigate('user/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Handle logout failure as needed
    }
  };

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <button type="submit">Create Post</button>
      </form>
     
      <h2>Posts</h2>
      
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Posts;