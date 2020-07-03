import React from 'react';

export function LoadMore({ onClick, limit, cpp }) {
	function handleClick() {
		onClick(limit + cpp);
	}

	return <button onClick={handleClick}>Load More</button>;
}
