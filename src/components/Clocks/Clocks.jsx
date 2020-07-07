import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from './Clock';
import './Clocks.scss';

import { getPublicPath } from '../../index';

export function Clocks({ datas }) {
	return (
		<div className="clocks">
			{datas.map((data) => {
				return (
					<Link
						to={`${getPublicPath()}clock/${data.name.toLowerCase().replace(' ', '')}`}
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
