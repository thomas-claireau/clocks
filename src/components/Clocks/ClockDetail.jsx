import React from 'react';
import { useParams } from 'react-router';
import './ClockDetail.scss';

function ClockDetail() {
	const params = useParams();
	return <div style={{ color: 'white' }}>{params['id']}</div>;
}

export default ClockDetail;
