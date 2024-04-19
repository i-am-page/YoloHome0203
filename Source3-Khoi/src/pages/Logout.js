
import {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate = useNavigate();
    sessionStorage.clear();
    useEffect(() => {navigate('/login', { replace: true }); localStorage.removeItem("user")},[])
    
    return(
        <div></div>
    )
}