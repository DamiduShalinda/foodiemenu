import React from 'react'
import { useAuth } from './Auth';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    children: React.ReactNode;
}


const ProtectedRouteUser:React.FC<ProtectedRouteProps> = ({children}) => {

    const {isAuth} = useAuth();

    if (isAuth) {
        return <>{children}</>
      } else {
        
        return <Navigate to="/" replace/>
      }
}

export default ProtectedRouteUser