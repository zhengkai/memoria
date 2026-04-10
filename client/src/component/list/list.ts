import tpl from './list.html?raw'
import { api, pb } from '../../inc';
import { tplItemList } from '../common/item-row';
import { nav } from '../common/nav';

export class List {

	data: pb.IItem[] = [];

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		nav('recent');

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
