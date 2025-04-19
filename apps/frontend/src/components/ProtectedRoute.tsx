// components/ProtectedRoute.tsx
//@ts-nocheck
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/Context.tsx';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { role } = useAuth();

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
