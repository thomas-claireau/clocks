import React from 'react';
import './Search.scss';
import SVG from 'react-inlinesvg';

export function Search() {
	return (
		<div className="search">
			<SVG src={require('./earth.svg')} />
			<input type="text" placeholder="Search city..." />
		</div>
	);
}
