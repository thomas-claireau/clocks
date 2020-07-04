import cityTimeZones from 'city-timezones';

function offsetToTime(offset) {
	let date = new Date();
	date = new Date(date.setHours(date.getHours() + offset));

	return date;
}

export function timezoneToTime(data) {
	data = [...data];

	data.forEach((item, key) => {
		item.time = offsetToTime(item.offset);
	});

	return data;
}

export function convertTimezone(limit, datas) {
	const res = [];
	const names = [];
	let i = 0;

	datas.forEach((data) => {
		data.utc.forEach((item) => {
			if (i < limit) {
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

						i++;
					}
				}
			}
		});
	});

	return res;
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
