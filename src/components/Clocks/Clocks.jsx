import React from 'react';
import { Clock } from './Clock';
import './Clocks.scss';

export function Clocks({ datas }) {
	return (
		<div className="clocks">
			{datas.map((data) => {
				return <Clock key={data.name} data={data} />;
			})}
		</div>
	);
}
