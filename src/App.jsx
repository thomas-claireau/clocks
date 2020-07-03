import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import datas from './assets/timezone.json';
import countries from './assets/countries.json';
import cityTimeZones from 'city-timezones';

function offsetToTime(offset) {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() + offset));

	return date.toLocaleTimeString('fr-FR');
}

function timezoneToTime(data) {
	data.forEach((item) => {
		item.time = offsetToTime(item.offset);
	});

	return data;
}

function convertTimezone() {
	const res = [];

	datas.forEach((data, index) => {
		const utc = convertUtc(data.utc);

		if (Array.isArray(utc) && utc.length > 0) {
			res.push({
				id: index,
				utc,
				offset: data.offset,
			});
		}
	});

	return res;
}

function convertUtc(utc) {
	utc = utc
		.filter((item) => item.includes('/') && !item.includes('Etc'))
		.filter((item) => {
			const name = item.split('/')[1];
			const code = setCountryCode(name);

			if (Array.isArray(code) && code.length > 0) {
				return item;
			}
		})
		.map((item) => {
			const name = item.split('/')[1];
			const code = setCountryCode(name);

			if (Array.isArray(code) && code.length > 0) {
				return { name, code };
			}
		});

	return utc;
}

function setCountryCode(utc) {
	return cityTimeZones.lookupViaCity(utc);
}

function Clock({ data }) {
	return <div className="clock">{data.time}</div>;
}

function App() {
	const [clocks, setClocks] = useState(convertTimezone());
	const [times, setTimes] = useState(timezoneToTime(clocks));

	useEffect(() => {
		setInterval(() => {
			const timer = setTimes(timezoneToTime(clocks));

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
