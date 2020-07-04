import React from 'react';
import './Clock.scss';

export function Clock({ data }) {
	return (
		<div className={`clock ${data.name}`}>
			{data.time} - {data.name}
		</div>
	);
}
