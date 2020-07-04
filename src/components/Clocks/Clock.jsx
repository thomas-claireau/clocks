import React from 'react';
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
	const calc = hours * 30 + minutes * 2;
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
	function getNeedle() {
		return (
			<>
				<Second data={data.time.getSeconds()} />
				<Minute data={data.time.getMinutes()} />
				<Hour hours={data.time.getHours()} minutes={data.time.getMinutes()} />
				<div className="infos">
					<div className="name">{data.name}</div>
					<div className="time">{data.time.toLocaleTimeString()}</div>
				</div>
			</>
		);
	}

	return <div className={`clock ${data.name.toLowerCase()}`}>{getNeedle()}</div>;
}
