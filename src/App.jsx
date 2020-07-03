import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import datas from './assets/timezone.json';
import countries from './assets/countries.json';
import cityTimeZones from 'city-timezones';
require('dotenv').config();

function offsetToTime(offset) {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() + offset));

	return date.toLocaleTimeString('fr-FR');
}

function timezoneToTime(data) {
	data = [...data];

	data.forEach((item, key) => {
		item.time = offsetToTime(item.offset);
	});

	return data;
}

function convertTimezone() {
	const res = [];
	const names = [];

	datas.forEach((data, index) => {
		const utc = convertUtc(data.utc);

		if (Array.isArray(utc) && utc.length > 0) {
			utc.forEach((item) => {
				if (!names.includes(item.name)) {
					names.push(item.name);

					res.push({
						id: index,
						name: item,
						offset: data.offset,
						time: null,
					});
				}
			});
		}
	});

	return res;
}

function convertUtc(utc) {
	return utc
		.filter((item) => {
			if (item.includes('/') && !item.includes('Etc')) {
				const name = item.split('/')[1];
				const code = setCountryCode(name);

				if (Array.isArray(code) && code.length > 0) {
					return item;
				}
			}
		})
		.map((item) => {
			const name = item.split('/')[1];
			const code = setCountryCode(name);

			if (Array.isArray(code) && code.length > 0) {
				return { name, code };
			}
		});
}

function setCountryCode(utc) {
	return cityTimeZones.lookupViaCity(utc);
}

function Clock({ data }) {
	return <div className={`clock ${data.name.name}`}>{data.time}</div>;
}

function App() {
	const [times, setTimes] = useState(timezoneToTime(convertTimezone()));

	useEffect(() => {
		setInterval(() => {
			const timer = setTimes(timezoneToTime(times));

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
					return <Clock key={time.name.name} data={time} />;
				})}
				{/* <Clock key={times[0].id} data={times[0]} /> */}
			</div>
		</>
	);
}

render(<App />, document.querySelector('#app'));
