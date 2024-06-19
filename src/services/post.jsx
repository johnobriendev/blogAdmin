
const API_URL = import.meta.env.VITE_API_URL;

/////GET POSTS////////////////
// export const getPosts = async (token) => {
//   const response = await fetch(`${API_URL}/posts`, {
//     headers: {
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch posts');
//   }

//   const data = await response.json();
//   return data;
// };
export const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  const data = await response.json();
  return data;
};

///CREATE POST/////////////////
export const createPost = async (token, post) => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  const data = await response.json();
  return data;
};

export const updatePost = async (token, id, post) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Failed to update post');
  }

  const data = await response.json();
  return data;
};

export const deletePost = async (token, id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete post');
  }

  const data = await response.json();
  return data;
};


// Function to fetch a single post by ID
export const getPost = async (token, id) => {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  const data = await response.json();
  return data;
};