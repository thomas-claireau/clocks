import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import datas from './assets/timezone.json';

function offsetToTime(offset) {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() + offset));

	return date.toLocaleTimeString('fr-FR');
}

function timezoneToTime() {
	const res = [];

	datas.forEach((data, index) => {
		res.push({
			id: index,
			utc: data.utc,
			time: offsetToTime(data.offset),
		});
	});

	return res;
}

function Clock({ data }) {
	return <div className="clock">{data.time}</div>;
}

function App() {
	// const times = timezoneToTime();
	const [times, setTimes] = useState(timezoneToTime());

	useEffect(() => {
		setInterval(() => {
			const timer = setTimes(timezoneToTime());

			return function () {
				clearInterval(timer);
			};
		}, 1000);
	}, []);

	return (
		<>
			<div className="search"></div>
			<div className="clocks">
				{times.map((time) => {
					return <Clock key={time.id} data={time} />;
				})}
			</div>
		</>
	);
}

render(<App />, document.querySelector('#app'));
