import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';

const router = createBrowserRouter([
  {
    path: '/user/login',
    element: <LoginForm />,
  },
  {
    path: '/posts',
    element: <Posts />,
  },
  {
    path: '/posts/:id',
    element: <PostDetail />,
  },
  {
    path: '*',
    element: <LoginForm />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;