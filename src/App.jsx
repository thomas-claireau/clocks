import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import timezones from './assets/timezone.json';
import shuffle from 'lodash.shuffle';
require('dotenv').config();

// Utils
import { timezoneToTime, convertTimezone } from './utils';

// Components
import { Clocks } from './components/Clocks/Clocks';
import { LoadMore } from './components/LoadMore/LoadMore';
import { Search } from './components/Search/Search';

function App() {
	const CLOCK_PER_PAGE = 8;
	const [limit, setLimit] = useState(CLOCK_PER_PAGE);
	const [state, setState] = useState(null);

	function save(limit) {
		const data = convertTimezone(limit, timezones);

		sessionStorage.setItem('datas', JSON.stringify(data));

		return data;
	}

	function onLimitChange(limit) {
		sessionStorage.setItem('limit', limit);
		setLimit(limit);
	}

	// when load more clicked
	useEffect(() => {
		let data = JSON.parse(sessionStorage.getItem('datas'));
		const limitClock = Number(sessionStorage.getItem('limit')) || limit;

		if (!data || data === '[]' || limitClock !== 8) {
			data = save(limitClock);
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
			<Search />
			{state && <Clocks datas={state} />}
			<LoadMore onClick={onLimitChange} limit={limit} step={CLOCK_PER_PAGE} />
		</>
	);
}

render(<App />, document.querySelector('#app'));

/**
 * TODOS
 *
 * Use pixabay API from images (use this only when clicked on a clock)
 * Use flag api (with cities code)
 * USe load more feature (load only 8 clocks per 8 clocks)
 */
