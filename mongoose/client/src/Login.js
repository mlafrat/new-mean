import React, { useState } from "react";
import axios from "axios"; // Import Axios for making HTTP requests

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginMessage, setLoginMessage] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault(); // Prevent form submission

        try {
            const response = await axios.post("http://localhost:3001/login", { username, password });
            if (response.status === 200) {
                setLoginMessage(response.data.message);
                // Successful login: perform actions like redirecting the user
            }
        } catch (error) {
            if (error.response) {
                setLoginMessage(error.response.data.message);
            } else {
                setLoginMessage("An error occurred");
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                /><br/><br/>

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                /><br/><br/>

                <button type="submit">Login</button>
            </form>
            <p>{loginMessage}</p>
        </div>
    );
}

export default Login;
