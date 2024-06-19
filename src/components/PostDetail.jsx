import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPost, updatePost, deletePost } from '../services/post';
import { getCommentsByPost, deleteComment } from '../services/comment';


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPost(token, id);
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setPublished(data.published);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    const fetchComments = async () => {
      try {
        const data = await getCommentsByPost(token, id);
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchPost();
    fetchComments();
  }, [id, token]);

  const handleUpdatePost = async (event) => {
    event.preventDefault();

    const updatedPost = {
      title,
      content,
      published,
    };

    try {
      await updatePost(token, id, updatedPost);
      // Optionally, refresh the post data
      const updatedData = await getPost(token, id);
      setPost(updatedData);
      navigate('/posts');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await deletePost(token, id);
      navigate('/posts');
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(token, commentId);
      setComments(comments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h2>Manage Post</h2>
      <a href='/posts'>Return to posts</a>
      <h3>{post.title}</h3>
      <form onSubmit={handleUpdatePost}>
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

        <label htmlFor="published">Published:</label>
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={(e) => setPublished(e.target.checked)}
        />

        <button type="submit">Update Post</button>
      </form>

      <button onClick={handleDeletePost}>Delete Post</button>

      <h3>Manage Comments</h3>
      {comments.length > 0 ? (
        <ul>
          {comments.map(comment => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <p>By: {comment.author}</p>
              <p>At: {new Date(comment.createdAt).toLocaleString()}</p>
              <button onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments</p>
      )}
    </div>
  );
};

export default PostDetail;

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchPost = async () => {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setPost(data);
//       } else {
//         console.error('Failed to fetch post');
//       }
//     };

//     fetchPost();
//   }, [id]);

//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (response.ok) {
//       navigate('/posts');
//     } else {
//       console.error('Failed to delete post');
//     }
//   };

//   const handleUpdate = async () => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`${import.meta.env.VITE_API_URL}/posts/${id}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(post),
//     });

//     if (response.ok) {
//       navigate('/posts');
//     } else {
//       console.error('Failed to update post');
//     }
//   };

//   if (!post) return <div>Loading...</div>;

//   return (
//     <div>
//       <h2>Edit Post</h2>
//       <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={post.title}
//           onChange={(e) => setPost({ ...post, title: e.target.value })}
//           required
//         />
//         <label htmlFor="content">Content:</label>
//         <textarea
//           id="content"
//           value={post.content}
//           onChange={(e) => setPost({ ...post, content: e.target.value })}
//           required
//         />
//         <label htmlFor="published">Published:</label>
//         <input
//           type="checkbox"
//           id="published"
//           checked={post.published}
//           onChange={(e) => setPost({ ...post, published: e.target.checked })}
//         />
//         <button type="submit">Update</button>
//         <button type="button" onClick={handleDelete}>Delete</button>
//       </form>
//     </div>
//   );
// };

// export default PostDetail;