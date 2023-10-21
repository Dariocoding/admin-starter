import { useAuthStore } from '@/store';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PublicProtectedRoute = () => {
	const { authenticated } = useAuthStore();

	return authenticated ? <Navigate to={'/dashboard'} /> : <Outlet />;
};

export default PublicProtectedRoute;
