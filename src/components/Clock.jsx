import React from 'react';

export function Clock({ data }) {
	return (
		<div className={`clock ${data.name}`}>
			{data.time} - {data.name}
		</div>
	);
}
