import { pb, util } from '../../inc';

export const tplItemList = (li: pb.IItem[], div: HTMLDivElement | null) => {
	if (!div) {
		return;
	}
	div.textContent = '';
	for (const it of li) {
		div.appendChild(tplItemRow(it));
	}
};

export const tplItemRow = (it: pb.IItem): HTMLDivElement => {
	const d = document.createElement('div');
	const datetime = util.formatDateTime(it.meta!.tsCreate!);
	const url = `?action=edit&id=${it.id}`;
	d.innerHTML = `<div>
		<div><a href="${url}" target="_blank">${it.id}</a></div>
		<div class="content">${it.content!.raw}</div>
		<div>${datetime}</div>
	</div>`;
	return d;
};
