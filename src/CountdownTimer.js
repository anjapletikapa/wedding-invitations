import React from 'react';
import DateTimeDisplay from "./DateTimeDisplay";
import { useCountdown } from "./hooks/useCountdown";

const ShowCounter = ({ days, hours, minutes, seconds }) => {
	return (
		<div className="show-counter">
			<DateTimeDisplay value={days} type={'Dana'} isClose={days <= 3} />
			<DateTimeDisplay value={hours} type={'Sati'} isClose={false} />
			<DateTimeDisplay value={minutes} type={'Minuta'} isClose={false} />
			<DateTimeDisplay value={seconds} type={'Sekundi'} isClose={false} />
		</div>
	)
}

const CountdownTimer = ({ targetDate }) => {
	const [days, hours, minutes, seconds] = useCountdown(targetDate);

	return (
		<ShowCounter
			days={days}
			hours={hours}
			minutes={minutes}
			seconds={seconds}
		/>
	);
};

export default CountdownTimer;