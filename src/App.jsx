import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import shuffle from 'lodash.shuffle';
import timezones from './assets/timezone.json';
require('dotenv').config();

import './App.scss';

// Utils
import { timezoneToTime, convertTimezone, filterTimezone } from './utils';

// Components
import { Clocks } from './components/Clocks/Clocks';
import { LoadMore } from './components/LoadMore/LoadMore';
import { Search } from './components/Search/Search';

function App() {
	const CLOCK_PER_PAGE = 13;
	const [limit, setLimit] = useState(CLOCK_PER_PAGE);
	const [state, setState] = useState(null);
	const [search, setSearch] = useState('');

	function save() {
		const data = convertTimezone(shuffle(timezones));
		const limitData = timezoneToTime(data, limit);

		sessionStorage.setItem('datas', JSON.stringify(data));
		sessionStorage.setItem('limitData', JSON.stringify(limitData));

		return limitData;
	}

	function onLimitChange(limit) {
		sessionStorage.setItem('limit', limit);
		setLimit(limit);
	}

	function onSearchChange(search) {
		filterTimezone(search, limit, timezones);
	}

	// when page load and load more clicked
	useEffect(() => {
		let data = JSON.parse(sessionStorage.getItem('limitData'));
		const limitClock = Number(sessionStorage.getItem('limit')) || limit;

		if (!data || data === '[]' || limitClock !== CLOCK_PER_PAGE) {
			data = save();
		}

		setState(timezoneToTime(data));
		setLimit(limitClock);
	}, [limit]);

	// call each seconds
	useEffect(() => {
		setInterval(() => {
			setState((state) => timezoneToTime(state));

			return function () {
				clearInterval(timer);
			};
		}, 1000);
	}, []);

	return (
		<>
			<Search onChange={onSearchChange} />
			{state && <Clocks datas={state} />}
			<LoadMore onClick={onLimitChange} limit={limit} step={CLOCK_PER_PAGE} />
		</>
	);
}

render(<App />, document.querySelector('#app'));

/**
 * TODOS
 *
 * Mettre en place la recherche de timezone
 * Use pixabay API from images (use this only when clicked on a clock)
 * Use flag api (with cities code)
 */
