import React, { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const axiosSecure = axios.create({
    baseURL: 'https://real-estate-flax-psi.vercel.app',
});

const useUserRole = () => {
    const { user} = useContext(AuthContext);


    const {data,isLoading:isAdminLoading}=useQuery({
        queryKey: 'userRole',
        queryFn: async () => {
            const response = await axiosSecure.get(`/user-role/${user?.email}`, { withCredentials: true });
            return response.data.role;
        },
        enabled: !!user,
    })
    return [data, isAdminLoading];
};

export default useUserRole;