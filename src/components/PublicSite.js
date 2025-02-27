import React, {useState, useEffect, useRef} from "react";
import CountdownTimer from '../CountdownTimer';
import '../App.css';

const PublicSite = () => {
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
				<section className="heading-section parallax-container" style={{backgroundImage: `url(/images/img1_cut.jpg)`}}>
					<div className="bg"></div>
					<div>
						<h1>Marina & Igor</h1>
						<h3>23.05.2025.</h3>
					</div>
				</section>

				<section className="details-section parallax-container" style={{backgroundImage: `url(/images/img2.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<h2>Detalji</h2>
						<div className="timeline">
							<div className="timeline-container t-right">
								<div className="timeline-content tcr">
									<img src="/images/ceremony_v2.svg"/>
									<div className="details-text dtr">
										<span className="normal-text">17:00</span>
										<span className="normal-text">ŽUPA BEZGREŠNOG SRCA MARIJINA</span>
										<span className="small-text">Slavonska ulica 71, Slavonski Brod</span>
									</div>
								</div>
							</div>
							<div className="timeline-container t-left">
								<div className="timeline-content tcl tcl-cocktail">
									<img src="/images/cocktails_v2.svg"/>
									<div className="details-text dtl">
										<span className="normal-text">18:30</span>
										<span className="normal-text">COCKTAIL HOUR</span>
										<span className="small-text">Svečana sala Midl events</span>
										<span className="small-text">Školska ulica, Vranovci</span>
									</div>
								</div>
							</div>
							<div className="timeline-container t-right">
								<div className="timeline-content tcr">
									<img src="/images/dinner_v2.svg"/>
									<div className="details-text dtr">
										<span className="normal-text">20:00</span>
										<span className="normal-text">VEČERA</span>
									</div>
								</div>
							</div>
							<div className="timeline-container t-left">
								<div className="timeline-content tcl">
									<img className="diff-icon" src="/images/party_v2.svg"/>
									<div className="details-text dtl">
										<span className="normal-text">21:30</span>
										<span className="normal-text">PARTY</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section className="countdown-section parallax-container" style={{backgroundImage: `url(/images/img3.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<CountdownTimer targetDate={weddingDate}/>
					</div>
				</section>

				<section className="form-section parallax-container" style={{backgroundImage: `url(/images/4.jpg)`}}>
					<div className="bg"></div>
					<div className="transparent-bg">
						<h2>Potvrdite svoj dolazak</h2>
						<h3>do 04.05.2025.</h3>
						<h4>MARINA PETROVIĆ: 099 621 3225</h4>
						<h4>IGOR MIJIĆ: 095 813 4533</h4>
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
											<select
												name="guestNum"
												onChange={handleGuestNumberChange}
											>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
											</select>
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
		</div>
	);
};

export default PublicSite;
