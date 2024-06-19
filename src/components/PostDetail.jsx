import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error('Failed to fetch post');
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      navigate('/posts');
    } else {
      console.error('Failed to delete post');
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(post),
    });

    if (response.ok) {
      navigate('/posts');
    } else {
      console.error('Failed to update post');
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Post</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          required
        />
        <label htmlFor="published">Published:</label>
        <input
          type="checkbox"
          id="published"
          checked={post.published}
          onChange={(e) => setPost({ ...post, published: e.target.checked })}
        />
        <button type="submit">Update</button>
        <button type="button" onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
};

export default PostDetail;