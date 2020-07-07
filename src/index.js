import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

import ClockDetail from './components/Clocks/ClockDetail';

export function getTime(datas) {
	return datas.filter((data) => {
		moment.tz.setDefault(data.id);
		data.time = moment(momentTimezone().tz(data.momentId));

		return data;
	});
}

function getNameOfTimezone(timezone) {
	const arrayName = timezone.split('/');

	return arrayName[arrayName.length - 1].replace('_', ' ');
}

export function filterTimezone(search, datas) {
	search = search.toLowerCase();

	return datas.filter((item) => item.toLowerCase().includes(search));
}

export function limitDatas(datas, limit = false) {
	if (!limit) limit = datas.length;

	return datas
		.filter((item, index) => index < limit)
		.map((item) => {
			const name = getNameOfTimezone(item);

			return {
				id: name.toLowerCase(),
				momentId: item,
				name: name,
				time: null,
			};
		});
}

export function cleanData(datas) {
	return datas.filter((item) => item.includes('/') && !item.includes('Etc'));
}

export function getPublicPath() {
	if (process.env.NODE_ENV === 'development') return '/';

	return '/clocks-react/';
}

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<Switch>
				<Route
					path={`${getPublicPath()}clock/:id`}
					render={(props) => <ClockDetail {...props} />}
				/>
				<Route exact path={getPublicPath()} component={App} />
				<Route path="*">
					<Redirect to={getPublicPath()} />
				</Route>
			</Switch>
		</Router>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
