import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests

const SignIn = ({ setIsLoggedIn, setIsUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn"); // Check if the user is logged in
    if (loggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        // Validate if username and password are provided
        if (!username || !password) {
            setMessage('Please enter username and password.');
            return;
        }

        // Check if the user is an Admin
        if (username === "admin" && password === "admin") {
            setIsLoggedIn(true);
            setMessage('Admin Sign-in successful!');
            localStorage.setItem('userId', "admin");
            localStorage.setItem('role', "admin");
            localStorage.setItem('isLoggedIn', 'true');
            navigate('/admin');
            window.location.reload();
            return;
        }

        let response;
        let verifyResponse;

        // Try user endpoint first
        try {
            response = await axios.get(`http://localhost:8081/api/user/${username}`);
            console.log("User found:", response.data);
            if (response) {
                // Check if the user is found, then verify password
                try {
                    verifyResponse = await axios.post(
                        `http://localhost:8081/api/user/verify?username=${response.data.username}&password=${password}`
                    );

                    if (verifyResponse.data === "Password is correct") {
                        setIsLoggedIn(true);
                        setMessage('Sign-in successful!');
                        localStorage.setItem('userId', response.data.username);
                        localStorage.setItem('role', response.data.role); 
                        localStorage.setItem('isLoggedIn', 'true');
                        navigate('/');
                        window.location.reload();

                        return;
                    } else {
                        setMessage('Invalid password.');
                    }
                } catch (verifyError) {
                    console.error("Error during password verification:", verifyError);
                    setMessage('Error verifying password.');
                }
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log("User not found, trying customer endpoint...");
            } else {
                console.error("Error during user verification:", error);
                setMessage('Error during user verification.');
            }

            // If user not found, try customer endpoint
            try {
                response = await axios.get(`http://localhost:8081/api/customer/${username}`);
                if (response) {
                    try {
                        verifyResponse = await axios.post(
                            `http://localhost:8081/api/customer/verify?username=${response.data.username}&password=${password}`
                        );

                        if (verifyResponse.data === "Password is correct") {
                            setIsLoggedIn(true);
                            setMessage('Sign-in successful!');
                            localStorage.setItem('userId', response.data.username);
                            localStorage.setItem('role', response.data.role); 
                            localStorage.setItem('isLoggedIn', 'true');
                            navigate('/');
                            window.location.reload();

                            return;
                        } else {
                            setMessage('Invalid password for customer.');
                        }
                    } catch (verifyError) {
                        console.error("Error during customer password verification:", verifyError);
                        setMessage('Error verifying customer password.');
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.log("Customer not found, trying staff endpoint...");
                } else {
                    console.error("Error during customer verification:", error);
                    setMessage('Error during customer verification.');
                }

                // If customer not found, try staff endpoint
                try {
                    response = await axios.get(`http://localhost:8081/api/staff/user/${username}`);
                    if (response) {
                        try {
                            verifyResponse = await axios.post(
                                `http://localhost:8081/api/staff/verify?username=${response.data.username}&password=${password}`
                            );

                            if (verifyResponse.data === "Password is correct") {
                                setIsLoggedIn(true);
                                setMessage('Sign-in successful!');
                                localStorage.setItem('userId', response.data.username);
                                localStorage.setItem('role', response.data.role); 
                                localStorage.setItem('isLoggedIn', 'true');
                                navigate('/staff');
                                window.location.reload();

                                return;
                            } else {
                                setMessage('Invalid password for staff.');
                            }
                        } catch (verifyError) {
                            console.error("Error during staff password verification:", verifyError);
                            setMessage('Error verifying staff password.');
                        }
                    }
                } catch (error) {
                    console.error("Error during staff verification:", error);
                    setMessage('Error during staff verification.');
                }
            }
        }

        // If no successful login
        setMessage('Invalid username or password.');

    } catch (error) {
        console.error("Login error:", error);
        setMessage('Server error occurred during verification.');
    }
};
  return (
    
    <div className="container mx-auto p-4">
      <br/>
        
        <br/>
      <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 transition duration-300"
        >
          Sign In
        </button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/forgot-password" className="text-blue-500 hover:text-blue-700 block">
          Forgot Password?
        </Link>
        <Link to="/create-account" className="text-blue-500 hover:text-blue-700 block mt-2">
          Create an Account
        </Link>
      </div>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      <br/>
        
        <br/><br/>
        
        <br/><br/>
        
        <br/>
    </div>
  );
};

export default SignIn;
