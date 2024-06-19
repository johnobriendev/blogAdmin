import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPosts, createPost } from '../services/post';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchPosts = async () => {
      
  //     const response = await fetch(`${import.meta.env.VITE_API_URL}/posts`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setPosts(data);
  //     } else {
  //       console.error('Failed to fetch posts');
  //     }
  //   };

  //   fetchPosts();
  // }, []);
  
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
    };

    try {
      await createPost(token, newPost);

      setTitle('');
      setContent('');

      const data = await response.json();
      setPosts(data);

    } catch (error) {
      console.error('Error creating post:', error);
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
    </div>
  );
};

export default Posts;