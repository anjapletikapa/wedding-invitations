import React from "react";

const DateTimeDisplay = ({ value, type, isClose }) => {
	return (
		<div className={isClose ? 'countdown close' : 'countdown'}>
			<span className="countdown-value">{value}</span>
			<span className="countdown-type">{type}</span>
		</div>
	);
};

export default DateTimeDisplay;