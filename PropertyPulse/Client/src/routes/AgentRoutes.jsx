import React, { useContext } from 'react';
import useUserRole from '../hooks/useUserRole';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const AgentRoutes = ({children}) => {
    const { user, loading } = useContext(AuthContext);
    const [role, isAgentLoading] = useUserRole();

    if (loading || isAgentLoading) {
        return <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
    }

    if (user && role === 'agent') {   
        return children
    }

    return (
        <Navigate to="/login" replace />
    )
};

export default AgentRoutes;