import React from "react";

const DateTimeDisplay = ({ value, type, isClose }) => {
	return (
		<div className={isClose ? 'countdown close' : 'countdown'}>
			<p>{value}</p>
			<span>{type}</span>
		</div>
	);
};

export default DateTimeDisplay;