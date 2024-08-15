import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, set } from 'firebase/database';
import { toast, ToastContainer } from 'react-toastify';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase';
import './Seller.css';

const Seller = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;

    if (email === '' || password === '') {
      setError('Please fill in both fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Seller logged in successfully");
      toast.success("Seller logged in successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/sdashboard');
      }, 2000);
    } catch (error) {
      console.log(error.message);
      toast.error("Login failed. Please check your credentials and try again.", {
        position: "bottom-center",
      });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword } = signupData;

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await set(ref(db, 'Sellers/' + user.uid), {
        email: user.email,
        username: username,
      });

      console.log("Seller Registered Successfully!!");
      toast.success("Seller Registered Successfully!!", {
        position: "top-center",
      });
      setIsLogin(true); // Switch to login view after successful signup
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="seller-login-page">
      <ToastContainer />
      <div className="seller-login-container">
        {isLogin ? (
          <>
            <h2>Seller Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Login</button>
            </form>
            <div className="seller-login-footer">
              <p>Don't have an account? <span onClick={() => setIsLogin(false)}>Sign up here</span></p>
            </div>
          </>
        ) : (
          <>
            <h2>Seller Signup</h2>
            <form onSubmit={handleSignupSubmit}>
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                value={signupData.username}
                onChange={handleSignupChange}
                required
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                value={signupData.email}
                onChange={handleSignupChange}
                required
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                value={signupData.password}
                onChange={handleSignupChange}
                required
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                required
              />
              {error && <p className="error">{error}</p>}
              <button type="submit">Sign Up</button>
            </form>
            <div className="seller-login-footer">
              <p>Already have an account? <span onClick={() => setIsLogin(true)}>Login here</span></p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Seller;
