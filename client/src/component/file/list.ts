import tpl from './list.html?raw'
import { api, pb } from '../../inc';
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

		// tplItemList(this.data, r.querySelector('div.file-list'));
	}
}
