import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate,Link } from 'react-router-dom';


export default function NavBar() {
    const navigate = useNavigate();

    const handleLogOut = () => {
        window.localStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between align-items-center">
            <Link className="navbar-brand" to="/">
                RossAi
            </Link>
            <div className="d-flex align-items-center">
                <Button onClick={handleLogOut} variant="text" style={{ color: 'white', marginRight: '10px' }}>
                    Logout
                </Button>
                {/* Add more buttons or components as needed */}
            </div>
        </nav>
    );
}
