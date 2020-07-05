import React, { useState } from 'react';
import './Search.scss';
import SVG from 'react-inlinesvg';

export function Search({ onChange }) {
	const [state, setState] = useState('');

	function handleChange(e) {
		setState(e.target.value);
		onChange(e.target.value);
	}

	return (
		<div className="search">
			<SVG src={require('./earth.svg')} />
			<input
				type="text"
				value={state}
				onChange={handleChange}
				placeholder="Search place..."
			/>
		</div>
	);
}
