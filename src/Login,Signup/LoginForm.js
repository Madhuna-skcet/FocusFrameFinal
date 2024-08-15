import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './LoginForm.css';
import glassesImage from '../assets/blueglass.jpg';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import { auth } from "../Firebase"; // Ensure you are importing auth correctly
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setError('Please fill in both fields.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in Successfully");
      toast.success("User logged in Successfully", {
        position: "top-center",
      });
      setTimeout(() => {
        navigate('/');
      }, 2000); // 2-second delay
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  const handleGuestLogin = () => {
    navigate('/');
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <ToastContainer />
      <motion.div
        className="login-image"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <img src={glassesImage} alt="Glasses and cactus" />
      </motion.div>
      <motion.div
        className="login-form"
        initial={{ y: '-100vh' }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 50 }}
      >
        <h2>FocusFrame</h2>
        <h3>Login to your account</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <motion.input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
          <label htmlFor="password">Password</label>
          <motion.input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.05 }}
          />
          {error && <p className="error">{error}</p>}
          <motion.button
            type="submit"
            className="login-button"
            whileHover={{ scale: 1.05 }}
          >
            Login
          </motion.button>
          <motion.button
            type="button"
            className="guest-login"
            whileHover={{ scale: 1.05 }}
            onClick={handleGuestLogin}
          >
            Login as a Guest
          </motion.button>
        </form>
        <motion.a
          href="/signup"
          whileHover={{ scale: 1.1 }}
        >
          Create New Account
        </motion.a>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
