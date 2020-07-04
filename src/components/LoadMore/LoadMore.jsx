import React from 'react';
import './LoadMore.scss';

export function LoadMore({ onClick, limit, step }) {
	function handleClick() {
		onClick(limit + step);
	}

	return (
		<button className="load-more" onClick={handleClick}>
			Load More
		</button>
	);
}
