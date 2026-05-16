import tpl from './list.html?raw'
import { api, pb, util } from '../../inc';
// import { tplItemList } from '../common/item-row';
import { nav } from '../common/nav';

export class FileList {

	data: pb.File[] = [];
	cursor = 0;

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		nav('file');

		this.root = root;

		this.getData();
	}

	async getData() {
		const re = await api.fileList(0);
		if (re?.list?.length) {
			this.data = re.list.map(o => pb.File.create(o));
			this.cursor = re.cursor;
		}
		console.log(this.data, this.cursor);

		this.genHTML();
	}

	genHTML() {
		const r = this.root;
		r.innerHTML = tpl;

		const box = r.querySelector('.file-list')!;

		for (const o of this.data) {
			console.log(o);
			const item = document.createElement('div');

			let link = '';
			if (o.mime.startsWith('image/')) {
				link = `<a href="/file/${o.id}" target="_blank">link</a>`;
			}

			item.innerHTML = `<div>
	<div class="name">#${o.id} ${o.name}</div>
	<div class="size">${util.formatBytes(o.size)}</div>
	<div class="time">${util.formatDateTime(o.tsCreate)}</div>
	<div class="link">${link}</div>
</div>`;
			box.appendChild(item);
		}

		// tplItemList(this.data, r.querySelector('div.file-list'));
	}
}
