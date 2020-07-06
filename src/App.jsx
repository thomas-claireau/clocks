import React, { useState, useEffect } from 'react';

import shuffle from 'lodash.shuffle';
import momentTimezone from 'moment-timezone';

// Utils
import { limitDatas, getTime, filterTimezone, cleanData } from './index';

// Components
import { Clocks } from './components/Clocks/Clocks';
import { LoadMore } from './components/LoadMore/LoadMore';
import { Search } from './components/Search/Search';

import './App.scss';

function App() {
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
	}, [state, limit, search]);

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
			{time && time.length === limit && (
				<LoadMore onClick={onLimitChange} limit={limit} step={CLOCK_PER_PAGE} />
			)}
		</div>
	);
}

export default App;
