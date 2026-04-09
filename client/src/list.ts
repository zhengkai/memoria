import tpl from './tpl/list.html?raw'
import { pb } from './pb';
import { api } from './api';
import { formatDateTime } from './util';

export class List {

	data: pb.Item[] = [];

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		root.innerHTML = tpl;
		this.root = root;

		this.getData();
	}

	async getData() {
		const re = await api.itemListRecent();
		if (re?.list) {
			this.data = re.list.map(it => pb.Item.create(it));
			console.log('list', re.list);
		}

		this.genHTML();
	}

	genHTML() {
		const r = this.root;
		r.innerHTML = tpl;

		const div = r.querySelector('div.item-list') as HTMLDivElement;
		for (const it of this.data) {
			const d = document.createElement('div');
			const ts = it.meta!.tsCreate! as unknown as Long;
			d.innerHTML = `<div>
				<div><a href="?action=edit&id=${it.ID}" target="_blank">${it.ID}</a></div>
				<div class="content">${it.content!.raw}</div>
				<div>${formatDateTime(ts)}</div>
			</div>`;

			console.log(it, d);
			div.appendChild(d);
		}
	}
}
