import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ClockDetail.scss';
import momentTimezone from 'moment-timezone';
import { limitDatas, cleanData, getTime } from '../../utils';

import { Clock } from './Clock';
import { App } from '../../App';

function ClockDetail(props) {
	const params = useParams();
	const id = params['id'];
	const [state, setState] = useState();
	const [time, setTime] = useState();
	const [notFound, setNotFound] = useState(true);

	let datas = momentTimezone.tz.names();
	datas = limitDatas(cleanData(datas));

	useEffect(() => {
		let data;
		datas.forEach((item) => {
			if (item.id == id) {
				data = item;
			}
		});

		if (data) {
			setState(data);
			setNotFound(false);
		} else {
			console.log('passe');
		}
	}, []);

	useEffect(() => {
		if (state) {
			const timer = setInterval(() => {
				setTime(getTime([state]));
			}, 1000);

			return function () {
				clearInterval(timer);
			};
		}
	}, [state]);

	return notFound ? (
		<App />
	) : (
		<div className="clock-detail">
			<div className="header">
				<Link to="/" className="go-back">
					Go back
				</Link>
				{time && <div className="name">{time[0]['name']}</div>}
			</div>
			<div className="clock">{time && <Clock data={time} />}</div>
		</div>
	);
}

export default ClockDetail;
