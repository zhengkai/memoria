import tpl from './tpl/list.html?raw'
import { pb } from './pb';
import { api } from './api';
import { tplItemList } from './component/common/item-row';

export class List {

	data: pb.IItem[] = [];

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		this.root = root;

		this.getData();
	}

	async getData() {
		const re = await api.itemListRecent();
		if (re?.list?.length) {
			this.data = re.list;
		}

		this.genHTML();
	}

	genHTML() {
		const r = this.root;
		r.innerHTML = tpl;

		tplItemList(this.data, r.querySelector('div.item-list'));
	}
}
