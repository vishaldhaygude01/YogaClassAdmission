import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthService from './services/AuthService';

const PrivateRoute = ({ element: Element, ...rest }) => (
    <Route
        {...rest}
        element={AuthService.getCurrentUser() ? <Element /> : <Navigate to="/login" />}
    />
);

export default PrivateRoute;
