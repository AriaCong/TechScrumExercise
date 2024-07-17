import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { config } from 'process';

function UserSettingPage() {
    const[data,setData] = useState<any>();
    // Need to learn this useEffect
    useEffect (() => {
        const loading = async () => {
            const result = await axios.get('http://localhost:8000/api/v1/user/me', {headers: {authorization: `Bearer ${localStorage.getItem('token')}`}}); 
        setData(result.data);
    };
        loading();
    }, []);
    
    return (
        <div>
            <h1>User Page {data?.email}</h1>
        </div>
    );
}
export default UserSettingPage;