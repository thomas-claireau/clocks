import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import shuffle from 'lodash.shuffle';
import momentTimezone from 'moment-timezone';

require('dotenv').config();

import './App.scss';

// Utils
import { limitDatas, getTime, filterTimezone, cleanData } from './utils';

// Components
import { Clocks } from './components/Clocks/Clocks';
import { LoadMore } from './components/LoadMore/LoadMore';
import { Search } from './components/Search/Search';

function App() {
	const CLOCK_PER_PAGE = 13;
	const [limit, setLimit] = useState(null);
	const [state, setState] = useState(null);
	const [reduceState, setReduceState] = useState(null);
	const [time, setTime] = useState(null);
	const [search, setSearch] = useState(null);

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
			if (!search) {
				setReduceState(limitDatas(state, limit));
			} else {
				const datas = filterTimezone(search, state);
				setReduceState(limitDatas(datas, limit));
			}
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
		<div style={{ color: 'white' }}>
			<Search onChange={onSearchChange} />
			{time && <Clocks datas={time} />}
			{time && time.length == limit && (
				<LoadMore onClick={onLimitChange} limit={limit} step={CLOCK_PER_PAGE} />
			)}
		</div>
	);
}

render(<App />, document.querySelector('#app'));

/**
 * TODOS
 *
 * Mettre en place la recherche de timezone
 * Use pixabay API from images (use this only when clicked on a clock)
 * Use flag api (with cities code) -> border-image
 */
