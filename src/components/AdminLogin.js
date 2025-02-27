import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const correctPassword = "wedding2025";

	const handleLogin = (e) => {
		e.preventDefault();

		if (password === correctPassword) { // Change this to a secure password
			localStorage.setItem("isAdmin", "true");
			navigate("/admin");
		} else {
			alert("Incorrect password!");
		}
	};

	return (
		<div>
			<h2>Admin Login</h2>
			<form onSubmit={handleLogin}>
				<input type="password" placeholder="Enter Admin Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default AdminLogin;
