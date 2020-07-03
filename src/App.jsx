import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import timezones from './assets/timezone.json';
import shuffle from 'lodash.shuffle';
require('dotenv').config();

// Utils
import { timezoneToTime, convertTimezone } from './utils';

// Components
import { Clock } from './components/Clock';
import { LoadMore } from './components/LoadMore';
import { Search } from './components/Search';

function App() {
	const CLOCK_PER_PAGE = 8;
	const [state, setState] = useState(shuffle(timezones));
	const [limit, setLimit] = useState(CLOCK_PER_PAGE);
	const [times, setTimes] = useState(timezoneToTime(convertTimezone(limit, state)));

	// console.log(times);

	// useEffect(() => {
	// 	setInterval(() => {
	// 		const timer = setTimes(timezoneToTime(convertTimezone(limit, state)));

	// 		return function () {
	// 			clearInterval(timer);
	// 		};
	// 	}, 1000);
	// }, []);

	function onLimitChange(limit) {
		setLimit(limit);
		setState(state);
		setTimes(timezoneToTime(convertTimezone(limit, state)));
	}

	return (
		<>
			<Search />
			<div className="clocks">
				{times.map((time) => {
					return <Clock key={time.name} data={time} />;
				})}
			</div>
			<LoadMore onClick={onLimitChange} limit={limit} cpp={CLOCK_PER_PAGE} />
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
