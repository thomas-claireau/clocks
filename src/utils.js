import cityTimeZones from 'city-timezones';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

export function getTime(datas) {
	const res = [];

	datas.forEach((data) => {
		moment.tz.setDefault(data);
		const time = moment(momentTimezone().tz(data));

		res.push({
			id: data.toLowerCase(),
			name: getNameOfTimezone(data),
			time: time,
		});
	});

	return res;
}

function getNameOfTimezone(timezone) {
	const arrayName = timezone.split('/');

	return arrayName[arrayName.length - 1].replace('_', ' ');
}

export function filterTimezone(search, datas) {
	search = search.toLowerCase();

	return datas.filter((item) => item.toLowerCase().includes(search));
}

export function limitDatas(datas, limit) {
	if (datas.length > limit) {
		return datas.filter((item, index) => {
			if (index <= limit) return index;
		});
	} else {
		return datas;
	}
}

export function cleanData(datas) {
	return datas.filter((item) => item.includes('/') && !item.includes('Etc'));
}

function setCountryCode(utc) {
	return cityTimeZones.lookupViaCity(utc);
}
