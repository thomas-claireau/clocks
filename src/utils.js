import cityTimeZones from 'city-timezones';

function offsetToTime(offset) {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() + offset));

	return date;
}

export function timezoneToTime(data, limit = false) {
	data = [...data];

	// console.log(data);

	data.forEach((item, key) => {
		item.time = offsetToTime(item.offset);
	});

	return data;
}

export function convertTimezone(datas) {
	const res = [];
	const names = [];

	console.log('passe');

	datas.forEach((data) => {
		data.utc.forEach((item) => {
			item = convertUtc(item);

			if (item) {
				if (!names.includes(item.name)) {
					names.push(item.name);

					res.push({
						id: item.name.toLowerCase(),
						name: item.name,
						offset: data.offset,
						time: null,
					});
				}
			}
		});
	});

	return res;
}

export function filterTimezone(search, datas) {
	search = search.toLowerCase();

	return datas.filter((item) => item.id.includes(search));
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

function convertUtc(utc) {
	if (!utc.includes('/') || utc.includes('Etc')) return;

	const name = utc.split('/')[1];

	if (!name) return;

	const code = setCountryCode(name);

	if (!code || !Array.isArray(code) || code.length == 0) return;

	return { name, code };
}

function setCountryCode(utc) {
	return cityTimeZones.lookupViaCity(utc);
}
