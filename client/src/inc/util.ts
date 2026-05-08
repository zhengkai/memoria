import Long from "long";

export const formatDateTime = (ts: number) => {

	const date = new Date(ts);

	const f = new Intl.DateTimeFormat('en-CA', {  // en-CA 天然是 YYYY-MM-DD
		year: 'numeric', month: '2-digit', day: '2-digit',
		hour: '2-digit', minute: '2-digit', second: '2-digit',
		hour12: false,
	});
	const p = Object.fromEntries(f.formatToParts(date).map(x => [x.type, x.value]));
	return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

export const escapeHtml = (str: string | null | undefined) => {
	if (!str) {
		return '';
	}
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}
