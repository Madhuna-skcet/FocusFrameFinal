import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignupForm.css';
import signupImage from '../assets/blueglass.jpg';
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { auth, db } from "../Firebase";
import { ref, set } from "firebase/database"; // Import Realtime Database functions
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => { 
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user);

            if (user) {
                // Use Realtime Database to store user data
                await set(ref(db, 'Users/' + user.uid), {
                    email: user.email,
                    userName: username,
                    passWord: password,
                });
                console.log("User Registered Successfully!!");
                toast.success("User Registered Successfully!!", {
                    position: "top-center",
                });
                setTimeout(() => {
                    navigate('/login');
                }, 2000); // 2-second delay
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message, {
                position: "bottom-center",
            });
        }
    }; 

    return (
        <div className="signup-container">
            <ToastContainer />
            <div className="signup-image">
                <img src={signupImage} alt="Signup" />
            </div>
            <div className="signup-form">
                <h1 className="logo">FocusFrame</h1>
                <h3>Sign up</h3>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {error && <p className="error">{error}</p>}
                    <button className='a' type="submit">Create Account</button>
                </form>
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>
    );
};

export default SignupPage;
