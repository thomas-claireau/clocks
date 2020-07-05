import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Clock } from './Clock';
import './Clocks.scss';

export function Clocks({ datas }) {
	return (
		<div className="clocks">
			{datas.map((data) => {
				return (
					<Link
						to={`/clock/${data.name.toLowerCase().replace(' ', '')}`}
						key={data.id}
						className={`clock ${data.name.toLowerCase()}`}
					>
						<Clock data={data} />
					</Link>
				);
			})}
		</div>
	);
}
