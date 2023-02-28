import React from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@/home/components/HomePage/HomePage';

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/home',
    element: <HomePage />,
    errorElement: <p>This route was not found</p>,
  },
  {
    path: '/profile',
    element: <p>Profile page, authenticate first</p>,
  },
];

export { protectedRoutes };
