import React from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import  Navbar from '../HomeComponents/Navbar';

const LoginPage = () => {
    const navigate = useNavigate();
    
    const handleUserLogin = () => {
        navigate('/login'); 
    };
    const handleSellerLogin = () => {
        navigate('/sl');
    };
  
    return (
        <div className="login-page-container">
        <Navbar/>
            <div className="login-card-long">
                <div className="button-group">
                    <button className="auth-button" onClick={handleUserLogin}>
                        User Login
                    </button>
                    <button className="auth-button" onClick={handleSellerLogin} >
                        Seller Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
