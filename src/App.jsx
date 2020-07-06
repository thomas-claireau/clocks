import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	withRouter,
	useParams,
} from 'react-router-dom';

import shuffle from 'lodash.shuffle';
import momentTimezone from 'moment-timezone';

// Utils
import { limitDatas, getTime, filterTimezone, cleanData } from './utils';

// Components
import { Clocks } from './components/Clocks/Clocks';
import { LoadMore } from './components/LoadMore/LoadMore';
import { Search } from './components/Search/Search';
import ClockDetail from './components/Clocks/ClockDetail';

import './App.scss';

export function App() {
	const CLOCK_PER_PAGE = 13;
	const [limit, setLimit] = useState();
	const [state, setState] = useState();
	const [reduceState, setReduceState] = useState();
	const [time, setTime] = useState();
	const [search, setSearch] = useState();

	// only on load
	useEffect(() => {
		let datas = shuffle(momentTimezone.tz.names()); // get timezones
		datas = cleanData(datas); // clean useless timezones

		setState(datas);
		setLimit(CLOCK_PER_PAGE);
	}, []);

	// on load and on limit changed
	useEffect(() => {
		if (state && limit) {
			let datas = state;

			if (search) {
				datas = filterTimezone(search, state);
			}

			setReduceState(limitDatas(datas, limit));
		}
	}, [limit, search]);

	// then, get times of reduce state infos when reducteState is OK and every seconds
	useEffect(() => {
		if (reduceState) {
			const timer = setInterval(() => {
				setTime(getTime(reduceState));
			}, 1000);

			return function () {
				clearInterval(timer);
			};
		}
	}, [reduceState]);

	function onLimitChange(limit) {
		setLimit(limit);
	}

	function onSearchChange(search) {
		setSearch(search);
	}

	return (
		<div id="home">
			<Search onChange={onSearchChange} />
			{time && <Clocks datas={time} />}
			{time && time.length == limit && (
				<LoadMore onClick={onLimitChange} limit={limit} step={CLOCK_PER_PAGE} />
			)}
		</div>
	);
}

render(
	<Router>
		<Switch>
			<Route path="/clock/:id" render={(props) => <ClockDetail {...props} />} />
			<Route exact path="/" component={App} />
			<Route path="*">
				<Redirect to="/" />
			</Route>
		</Switch>
	</Router>,
	document.getElementById('app')
);
