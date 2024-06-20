import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, updatePost, deletePost } from '../services/post';
import { getCommentsByPost, createComment, deleteComment } from '../services/comment';


const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [published, setPublished] = useState(false);
  const [newComment, setNewComment] = useState('');
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

  const handleAddComment = async (event) => {
    event.preventDefault();

    const commentData = {
      content: newComment,
      post: id,
      author: 'admin',
    };

    try {
      await createComment(token, commentData);
      setNewComment('');

      const updatedComments = await getCommentsByPost(token, id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error adding comment:', error);
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
    <div className='m-2 p-8'>
      <h1 className='text-4xl mb-5'>Manage Post</h1>
      <a className='text-sky-500' href='/posts'>Return to posts</a>
      <h3 className='mt-5 text-2xl'>Current Title:</h3>
      <h3 className='text-xl mt-2'>{post.title}</h3>
      <h3 className='mt-5 text-2xl'>Current Content:</h3>
      <p className='mt-2'>{post.content}</p>
      <p>Published: {post.published ? 'Yes' : 'No'}</p>

      {token ? (
        <div className='mt-5'>
          <h2 className='text-3xl mb-2'>Edit Post</h2>
          <form className='flex flex-col items-start gap-4' onSubmit={handleUpdatePost}>
            <label className='text-2xl' htmlFor="title">Update Title:</label>
            <input
              className='border border-black rounded'
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label className='text-2xl' htmlFor="content">Update Content:</label>
            <textarea
              className='border border-black rounded w-9/12 h-48 resize-none p-1'
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <div>
              <label htmlFor="published">Published:</label>
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
              />
            </div>
            
            <div className='flex gap-5'>
              <button className='border border-black rounded p-1' type="submit">Update Post</button>
              <button className='border border-black rounded p-1' onClick={handleDeletePost}>Delete Post</button>
            </div>
            
          </form>

          

          <h3 className='mt-10 text-2xl'>Add Comment</h3>
          <form className='flex flex-col items-start gap-4 ' onSubmit={handleAddComment}>
            <label htmlFor="newComment">Comment:</label>
            <textarea
              className='border border-black rounded w-9/12 h-24 resize-none p-1'
              id="newComment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button className='border border-black rounded p-1' type="submit">Add Comment</button>
          </form>

          <h3 className='mt-10 text-3xl'>Manage Comments</h3>
          {comments.length > 0 ? (
            <ul>
              {comments.map(comment => (
                <li  className='mt-4 flex flex-col items-start gap-2' key={comment._id}>
                  <p className='text-xl'>{comment.content}</p>
                  <p>By: {comment.author}</p>
                  <p>At: {new Date(comment.createdAt).toLocaleString()}</p>
                  <button className='border border-black rounded p-1' onClick={() => handleDeleteComment(comment._id)}>Delete Comment</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No comments</p>
          )}
        </div>
      ) : (
       <>
       <p>
          You are not logged in. <Link to="/login">Log in</Link> to view more details.
        </p>
        {comments.length > 0 ? (
          <ul>
            {comments.map(comment => (
              <li key={comment._id}>
                <p>{comment.content}</p>
                <p>By: {comment.author}</p>
                <p>At: {new Date(comment.createdAt).toLocaleString()}</p>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments</p>
        )}
        
        </>
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