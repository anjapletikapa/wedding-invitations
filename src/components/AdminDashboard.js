import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const AdminDashboard = () => {
	const [rsvps, setRsvps] = useState([]);
	const [attendingCount, setAttendingCount] = useState(0);
	const [notAttendingCount, setNotAttendingCount] = useState(0);
	const navigate = useNavigate();
	const API_BASE_URL = `${window.location.origin}/api/rsvp`;

	useEffect(() => {
		fetch(`${API_BASE_URL}`)
			.then((res) => res.json())
			.then((data) => {
				setRsvps(data);

				let attending = 0;
				let notAttending = 0;

				data.forEach((rsvp) => {
					if (rsvp.attending) {
						attending += 1 + (rsvp.guestList?.length || 0);
					} else {
						notAttending++;
					}
				});

				setAttendingCount(attending);
				setNotAttendingCount(notAttending);
			})
			.catch((error) => console.error("Error fetching RSVPs:", error));
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("isAdmin");
		navigate("/");
	};

	return (
		<div className="rsvpList">
			<h2>Lista</h2>
			<ol>
				{rsvps.map((rsvp) => (
					<React.Fragment key={rsvp.id}>
						<li>
							{rsvp.guestName} - {rsvp.attending ? "✅ Dolazi" : "❌ Ne dolazi"}
						</li>
						{rsvp.attending &&
							rsvp.guestList.map((guest) => (
								<li key={guest.id}>
									<span style={{marginLeft: "20px"}}>{guest.name}</span> {guest.isChild ? <span style={{marginLeft: "10px"}}>👶 dijete 👶</span> : ""}
								</li>
							))
						}
					</React.Fragment>
				))}
			</ol>
			<br/>
			<hr/>
			<br/>
			<p>Dolazi: {attendingCount}</p>
			<p>Ne dolazi: {notAttendingCount}</p>
			<br/>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
};

export default AdminDashboard;
