import React, { useState, useEffect } from "react";
import CountdownTimer from './CountdownTimer';
import './App.css';

const App = () => {
	const [rsvps, setRsvps] = useState([]);
	const [guestName, setGuestName] = useState('');
	const [attending, setAttending] = useState(true);
	const [numberOfGuests, setNumberOfGuests] = useState(0);
	const weddingDate = new Date("2025-05-23T17:00:00+01:00");
	const [additionalGuests, setAdditionalGuests] = useState([]);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch("http://localhost:8080/api/rsvp", {
			headers: {
				'Authorization': 'Basic ' + btoa('admin:admin'),
				'Content-Type': 'application/json'
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

		const rsvpData = {
			guestName,
			attending,
			guestList: additionalGuests
		};

		console.log("Submitting RSVP data: ", JSON.stringify(rsvpData, null, 2));

		try {
			const response = await fetch('http://localhost:8080/api/rsvp', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + btoa('admin:admin')
				},
				body: JSON.stringify(rsvpData)
			});

			if (!response.ok) {
				throw new Error(`HTTP error!
				Status: ${response.status}
				Message: ${response.statusMessage}`);
			}

			alert('Odgovor je uspješno poslan');
		} catch (error) {
			console.error("Error submitting RSVP:", error);
		}
	};

	const handleGuestNumberChange = (e) => {
		const newGuestCount = parseInt(e.target.value) || 0;
		setNumberOfGuests(newGuestCount);

		if (newGuestCount > 0) {
			setAdditionalGuests((prevGuests) => {
				let updateGuests = [...prevGuests];

				while (updateGuests.length < newGuestCount) {
					updateGuests.push({name: "", isChild: false});
				}

				return updateGuests.slice(0, newGuestCount);
			});
		} else {
			setAdditionalGuests([]);
		}
	};

	const handleAdditionalGuestInput = (index, value) => {
		setAdditionalGuests((prevGuests) => {
			const updateGuests = [...prevGuests];
			updateGuests[index].name = value;
			return updateGuests;
		});
	};

	const handleIsChildChange = (index, checked) => {
		setAdditionalGuests((prevGuests) => {
			const updateGuests = [...prevGuests];
			updateGuests[index].isChild = checked;
			return updateGuests;
		});
	};

	return (
		<div className="container">
			<div className="content-sections">
				<section className="heading-section parallax-container" style={{backgroundImage: `url(/images/1.jpg)`}}>
					<div className="bg"></div>
					<div>
						<h1>Marina & Igor</h1>
						<h3>23.05.2025.</h3>
					</div>
				</section>

				<section className="details-section parallax-container" style={{backgroundImage: `url(/images/2.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<h2>Detalji</h2>
						<p>Scelerisque enim mi curae erat ultricies lobortis donec velit in per cum consectetur purus a enim platea vestibulum lacinia et elit ante scelerisque vestibulum. At urna condimentum sed vulputate a duis in senectus ullamcorper lacus cubilia consectetur odio proin sociosqu a parturient nam ac blandit praesent aptent. Eros dignissim mus mauris a natoque ad suspendisse nulla a urna in tincidunt tristique enim arcu litora scelerisque eros suspendisse.</p>
					</div>
				</section>

				<section className="countdown-section parallax-container" style={{backgroundImage: `url(/images/3.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<CountdownTimer targetDate={weddingDate}/>
					</div>
				</section>

				<section className="form-section parallax-container" style={{backgroundImage: `url(/images/4.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<h2>Potvrdite svoj dolazak</h2>
						<h3>do xx.xx.2025.</h3>
						<form onSubmit={handleSubmit}>
							<div className="form-container">
								<div className="form-basic-info">
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
										<span className="checkmark"></span>
										Dolazim
									</label>
								</div>

								{attending && (
									<div className="form-attendance-info">
										<label>
											Koliko gostiju vodite sa sobom?
											<input
												type="number"
												placeholder="Upišite broj"
												value={numberOfGuests}
												onChange={handleGuestNumberChange}
												onKeyDown={(e) => e.preventDefault()}
												min="0"
												max="10"
												required
											/>
										</label>
									</div>
								)}

								{attending && numberOfGuests > 0 && (
									<div className="form-additional-guests">
										{additionalGuests.map((guest, index) => (
											<div key={index} className="guest-info">
												<span>{`${index + 1}.`}</span>
												<input
													type="text"
													placeholder="Ime i prezime"
													value={guest.name || ""}
													onChange={(e) => handleAdditionalGuestInput(index, e.target.value)}
													required
												/>
												<label>
													<input
														type="checkbox"
														checked={guest.isChild || false}
														onChange={(e) => handleIsChildChange(index, e.target.checked)}
													/>
													<span className="checkmark"></span>
													Dijete
												</label>
											</div>
										))}
									</div>
								)}

								<button type="submit">Pošalji odgovor</button>
							</div>
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
