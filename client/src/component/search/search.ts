import tpl from './search.html?raw'
import { pb } from '../../pb';
import { api } from '../../api';
import { tplItemList } from '../common/item-row';

export class Search {

	data: pb.Item[] = [];

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		root.innerHTML = tpl;
		this.root = root;

		this.genHTML();

		// this.getData();
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

		const form = this.root.querySelector<HTMLFormElement>('form')!;
		console.log(form);

		form.addEventListener("submit", (event: SubmitEvent) => {
			event.preventDefault();
			this.submit(form);
		});
	}

	buildData(fd: FormData) {
		const d: { [k: string]: any } = {};
		for (const key of ['og', 'title', 'original', 'trivial']) {
			const v = fd.get(key);
			let r = pb.ItemSearch.Cmd.NONE;
			switch (v) {
				case '1':
					r = pb.ItemSearch.Cmd.HAVE;
					break;
				case '2':
					r = pb.ItemSearch.Cmd.NOT_HAVE;
					break;
			}
			d[key] = r;

		}
		return d;
	}

	async submit(form: HTMLFormElement) {

		const fd = new FormData(form);
		const d = this.buildData(fd);
		d['keyword'] = fd.get('keyword')?.toString() || '';

		for (const [key, value] of new FormData(form)) {
			console.log('debug form', key, value);
		}

		const re = await api.itemSearch(pb.ItemSearch.fromObject(d));
		if (!re?.list?.length) {
			return;
		}

		tplItemList(re.list, this.root.querySelector('div.item-list'));
	}
}
