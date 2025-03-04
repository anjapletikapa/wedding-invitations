import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicSite from "./components/PublicSite";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import PrivateRoute from "./PrivateRoute";
import {ToastContainer} from "react-toastify";
import "./App.css";

const App = () => {
	return (
		<div>
			<Router>
				<Routes>
					{/* Public pages */}
					<Route path="/" element={<PublicSite />} />

					{/* Admin Login */}
					<Route path="/login" element={<AdminLogin />} />

					{/* Protected Admin Dashboard */}
					<Route path="/admin/*" element={<PrivateRoute />}>
						<Route path="" element={<AdminDashboard />} />
					</Route>
				</Routes>
			</Router>

			<ToastContainer style={{height: 0}} />
		</div>
	);
};

export default App;
