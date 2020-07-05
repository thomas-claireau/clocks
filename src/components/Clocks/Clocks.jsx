import React from 'react';
import { Clock } from './Clock';
import './Clocks.scss';

export function Clocks({ datas }) {
	console.log(datas);
	return (
		<div className="clocks">
			{datas.map((data) => {
				return <Clock key={data.id} data={data} />;
			})}
		</div>
	);
}
