import React, { useState, useEffect } from 'react';
import regeneratorRuntime from 'regenerator-runtime';

export function useFetch(url) {
	const [state, setState] = useState({
		items: [],
	});

	useEffect(() => {
		const res = fetch(url);

		console.log(res);

		res.then((res) => res.json())
			.then((res) => {
				res = res.filter((item) => item.includes('/') && !item.includes());
			})
			.catch((error) => {
				setState({
					items: [],
					error: null,
				});
			});
	}, []);

	state.items.forEach((item) => {
		const res = fetch(url + '/' + item);
		console.log(res);
	});

	return [state.items, state.error];
}
