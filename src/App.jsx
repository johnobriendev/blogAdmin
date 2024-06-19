import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Posts from './components/Posts';
// import PostDetailPage from './PostDetailPage';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  // {
  //   path: '/posts/:id',
  //   element: <PostDetailPage />,
  // },
  {
    path: '*',
    element: <LoginForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;