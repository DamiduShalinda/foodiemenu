import React from 'react'
import { useAuth } from './Auth';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    children: React.ReactNode;
}


const ProtectedRoute:React.FC<ProtectedRouteProps> = ({children}) => {

    const {user} = useAuth();

    if (user?.email === 'shalindadamidu1@gmail.com' || user?.email === 'udayangaayesh.rj@gmail.com') {
        return <>{children}</>
      } else {
        
        return <Navigate to="/" replace/>
      }
}

export default ProtectedRoute