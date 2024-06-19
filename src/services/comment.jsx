const API_URL = import.meta.env.VITE_API_URL;

export const getCommentsByPost = async (token, postId) => {
  const response = await fetch(`${API_URL}/comments/post/${postId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }

  const data = await response.json();
  return data;
};

export const deleteComment = async (token, commentId) => {
  const response = await fetch(`${API_URL}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }

  const data = await response.json();
  return data;
};