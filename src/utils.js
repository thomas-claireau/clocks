import cityTimeZones from 'city-timezones';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

export function getTime(datas) {
	return datas.filter((data) => {
		moment.tz.setDefault(data.id);
		data.time = moment(momentTimezone().tz(data.id));

		return data;
	});
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
	return datas
		.filter((item, index) => index < limit)
		.map((item) => {
			const name = getNameOfTimezone(item);

			return {
				id: item,
				name: name,
				time: null,
			};
		});
}

export function cleanData(datas) {
	return datas.filter((item) => item.includes('/') && !item.includes('Etc'));
}
