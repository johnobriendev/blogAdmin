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
  let userId = '';

  if(token){
  const decodedToken = jwtDecode(token);
  userId = decodedToken.id;
  }

  //Fetch posts from data base
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
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
      navigate('/user/login');
    } catch (error) {
      console.error('Failed to logout:', error);
      // Handle logout failure as needed
    }
  };


  return (
    <div className='m-2 p-8'>
      {token ? (
        <div className='mb-5'>
          <h2 className='text-3xl mb-5'>Create New Post</h2>
          <form className='flex flex-col items-start gap-4' onSubmit={handleSubmit}>
            <label className='text-xl' htmlFor="title">Title:</label>
            <input
              className='border border-black rounded w-full'
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className='text-xl' htmlFor="content">Content:</label>
            <textarea
              className='border border-black rounded w-full h-48 resize-none'
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button className='border border-black rounded p-1'  type="submit">Create Post</button>
          </form>
        </div>
      ) : (
        <p className='mb-5'>
          You are not logged in. <Link className='text-sky-500' to="/login">Log in</Link> to create or manage posts.
        </p>
      )}

      <h2 className='text-3xl mb-3'>Posts</h2>
      
      <ul>
        {posts.map(post => (
          <li key={post._id} className='text-sky-500 cursor-pointer'>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      
      { token ? (
       <>
        <button 
        className='border border-black rounded p-1 mt-3' 
        onClick={handleLogout}>
          Logout
        </button>
      </> 
       
      ) : ('') }
    </div>
  );
  // return (
  //   <div>
  //     <h2>Create New Post</h2>
  //     <form onSubmit={handleSubmit}>
  //       <label htmlFor="title">Title:</label>
  //       <input
  //         type="text"
  //         id="title"
  //         value={title}
  //         onChange={(e) => setTitle(e.target.value)}
  //         required
  //       />

  //       <label htmlFor="content">Content:</label>
  //       <textarea
  //         id="content"
  //         value={content}
  //         onChange={(e) => setContent(e.target.value)}
  //         required
  //       />

  //       <button type="submit">Create Post</button>
  //     </form>
     
  //     <h2>Posts</h2>
      
  //     <ul>
  //       {posts.map(post => (
  //         <li key={post._id}>
  //           <Link to={`/posts/${post._id}`}>{post.title}</Link>
  //         </li>
  //       ))}
  //     </ul>

  //     <button onClick={handleLogout}>Logout</button>
  //   </div>
  // );
};

export default Posts;