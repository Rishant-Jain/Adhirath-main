import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import kidImg from '../assets/kid.png';
import awardGif from '../assets/award.gif';
import supportGif from '../assets/support.gif';
import schoolGif from '../assets/school-board.gif';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    
    const googleScript = document.createElement("script");
    googleScript.src = "https://accounts.google.com/gsi/client";
    googleScript.async = true;
    googleScript.defer = true;
    document.body.appendChild(googleScript);

    googleScript.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID", 
        callback: (response) => {
          console.log("Google Token:", response.credential);
          
        },
      });
      window.google.accounts.id.renderButton(
        document.getElementById("google-button"),
        { theme: "outline", size: "large" }
      );
    };

    
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: "YOUR_FACEBOOK_APP_ID", 
        cookie: true,
        xfbml: true,
        version: "v19.0",
      });
    };
    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
    fbScript.async = true;
    document.body.appendChild(fbScript);
  }, []);

  const handleFacebookLogin = () => {
    window.FB.login((response) => {
      if (response.authResponse) {
        window.FB.api('/me', { fields: 'name,email' }, function (userData) {
          console.log("Facebook user:", userData);
          
        });
      } else {
        console.log("Facebook login failed");
      }
    }, { scope: 'email' });
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill all fields!');
      return;
    }
    setError('');
    console.log('Signup Success', formData);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-gray-100">
      {/* Floating GIFs */}
      <motion.img
        src={schoolGif}
        alt="School"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-20 h-20 object-cover absolute left-40 top-1/2 transform -translate-y-1/2"
      />

      <motion.img
        src={supportGif}
        alt="support"
        initial={{ x: -300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-20 h-20 object-cover absolute right-40 top-1/4 transform -translate-y-1/2"
      />

      <motion.img
        src={kidImg}
        alt="Kid"
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="w-64 h-64 absolute right-10 top-1/2 transform -translate-y-1/2"
      />

      {/* Signup Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-lg w-80 mt-10 z-10"
      >
        <h1 className="text-2xl mb-6 text-center">Signup Page</h1>

        <div className="flex justify-center mb-4">
          <motion.img
            whileHover={{ rotate: 360 }}
            transition={{ duration: 1 }}
            src={awardGif}
            alt="Award"
            className="w-20 h-20"
          />
        </div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
            placeholder="Enter Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
            placeholder="Enter Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded focus:border-green-500 focus:outline-none"
            placeholder="Enter Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 w-full py-2 text-white rounded hover:bg-green-700 transition-all duration-300"
        >
          Signup
        </button>

        {/* Social Logins */}
        <div className="my-4">
          <div id="google-button" className="flex justify-center mb-2"></div>
          <button
            type="button"
            onClick={handleFacebookLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Login with Facebook
          </button>
        </div>

        <div className="text-center mt-4">
          <p>Already have an account?</p>
          <button
            onClick={handleLoginClick}
            className="text-green-500 underline mt-2 hover:text-green-700"
          >
            Login
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default SignupPage;
