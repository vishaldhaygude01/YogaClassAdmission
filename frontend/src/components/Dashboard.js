
import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import axios from 'axios';

function Dashboard() {
    const [data, setData] = useState([]);

    useEffect(() => {

        axios.get('/api/batch', {
            headers: { Authorization: `Bearer ${AuthService.getCurrentUser().accessToken}` }
        })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLogout = () => {
        AuthService.logout();
        // Redirect to login page after logout
        window.location.href = '/login';
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>

            <h3>Batch-wise Entries:</h3>
            <ul>
                {data.map((entry) => (
                    <li key={entry.id}>{/* Display batch-wise entry data here */}</li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
