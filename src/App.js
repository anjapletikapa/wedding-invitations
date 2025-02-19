import React, { useState, useEffect } from "react";
import CountdownTimer from './CountdownTimer';
import useParallaxSections from "./hooks/UseParallaxSections";
import './App.css';

const App = () => {
	const [rsvps, setRsvps] = useState([]);
	const [guestName, setGuestName] = useState('');
	const [attending, setAttending] = useState(true);
	const [numberOfGuests, setNumberOfGuests] = useState(1);
	const weddingDate = new Date("2025-05-23T17:00:00+01:00");
	const [error, setError] = useState(null);

	// Fetch RSVP data from the backend
	useEffect(() => {
		fetch("http://localhost:8080/api/rsvp", {
			headers: {
				'Authorization': 'Basic' + btoa('admin:admin')
			}
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! Status: ${res.status}`);
				}

				return res.json();
			})
			.then((data) => setRsvps(data))
			.catch((err) => setError(err.message));
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const rsvpData = { guestName, attending, numberOfGuests };

		await fetch('http://localhost:8080/api/rsvp', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + btoa('admin:admin')
			},
			body: JSON.stringify(rsvpData)
		});

		alert('RSVP submitted!');
	};

	useParallaxSections();

	return (
		<div className="container">
			<div className="content-sections">
				<section className="heading-section">
					<div className="bg" style={{backgroundImage: `url(/images/1.jpg)`}}></div>
					<div>
						<h1>Marina & Igor</h1>
						<h3>23.05.2025.</h3>
					</div>
				</section>

				<section className="details-section">
					<div className="bg" style={{backgroundImage: `url(/images/2.jpg)`}}></div>
					<div className="transparent-bg">
						<h2>Detalji</h2>
						<p>Scelerisque enim mi curae erat ultricies lobortis donec velit in per cum consectetur purus a enim platea vestibulum lacinia et elit ante scelerisque vestibulum. At urna condimentum sed vulputate a duis in senectus ullamcorper lacus cubilia consectetur odio proin sociosqu a parturient nam ac blandit praesent aptent. Eros dignissim mus mauris a natoque ad suspendisse nulla a urna in tincidunt tristique enim arcu litora scelerisque eros suspendisse.</p>
					</div>
				</section>

				<section className="countdown-section">
					<div className="bg" style={{backgroundImage: `url(/images/3.jpg)`}}></div>
					<div className="transparent-bg">
						<CountdownTimer targetDate={weddingDate}/>
					</div>
				</section>

				<section className="form-section">
					<div className="bg" style={{backgroundImage: `url(/images/4.jpg)`}}></div>
					<div className="transparent-bg">
						<h2>Potvrdite svoj dolazak</h2>
						<h3>do xx.xx.2025.</h3>
						<form onSubmit={handleSubmit}>
							<input
								type="text"
								placeholder="Ime i prezime"
								value={guestName}
								onChange={(e) => setGuestName(e.target.value)}
								required
							/>
							<label>
								<input
									type="checkbox"
									checked={attending}
									onChange={(e) => setAttending(e.target.checked)}
								/>
								Attending
							</label>
							<input
								type="number"
								placeholder="Number of Guests"
								value={numberOfGuests}
								onChange={(e) => setNumberOfGuests(e.target.value)}
								min="1"
								max="10"
								required
							/>
							<button type="submit">Pošalji odgovor</button>
						</form>
					</div>
				</section>
			</div>

			<footer className="footer">
				<p>&copy; jel mi ovaj dio uopce treba</p>
			</footer>
		</div>
	);
};

export default App;
