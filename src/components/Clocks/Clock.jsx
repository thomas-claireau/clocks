import React from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import './Clock.scss';

function Second({ data }) {
	const calc = (data / 60) * 360 + 90;
	data = { time: calc, transitionOff: calc == 90 };

	return (
		<div
			className="seconds"
			style={{
				'--rotate': data.time + 'deg',
				transition: data.transitionOff
					? 'transform 0s ease-in-out'
					: 'transform 0.3s ease-in-out',
			}}
		></div>
	);
}

function Minute({ data }) {
	const calc = (data / 60) * 360 + 90;
	data = { time: calc, transitionOff: calc == 90 };

	return (
		<div
			className="minutes"
			style={{
				'--rotate': data.time + 'deg',
				transition: data.transitionOff
					? 'transform 0s ease-in-out'
					: 'transform 0.3s ease-in-out',
			}}
		></div>
	);
}

function Hour({ hours, minutes }) {
	const calc = hours * 30 + 90 + (minutes / 360) * 30;
	const data = { time: calc, transitionOff: calc == 90 };

	return (
		<div
			className="hours"
			style={{
				'--rotate': data.time + 'deg',
				transition: data.transitionOff
					? 'transform 0s ease-in-out'
					: 'transform 0.3s ease-in-out',
			}}
		></div>
	);
}

export function Clock({ data }) {
	const time = moment(data.time);

	return (
		<>
			<Second data={time.format('ss')} />
			<Minute data={time.format('mm')} />
			<Hour hours={time.format('HH')} minutes={time.format('mm')} />
			<div className="infos">
				<div className="name">{data.name}</div>
				<div className="time">{time.format('HH:mm:ss')}</div>
			</div>
		</>
	);
}
