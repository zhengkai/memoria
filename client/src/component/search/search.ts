import tpl from './search.html?raw'
import { api, pb } from '../../inc';
import { tplItemList } from '../common/item-row';
import { nav } from '../common/nav';

export class Search {

	data: pb.Item[] = [];

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		nav('search');

		root.innerHTML = tpl;
		this.root = root;

		this.initHTML();
	}

	initHTML() {
		const form = this.root.querySelector<HTMLFormElement>('form')!;
		this.submit(form);
		form.addEventListener("submit", (event: SubmitEvent) => {
			event.preventDefault();
			this.submit(form);
		});
	}

	buildData(fd: FormData) {
		const d: { [k: string]: any } = {
			keyword: fd.get('keyword')?.toString() || '',
		};
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
		return pb.ItemSearch.fromObject(d);
	}

	async submit(form: HTMLFormElement) {

		const re = await api.itemSearch(this.buildData(new FormData(form)));
		if (!re?.list?.length) {
			return;
		}

		tplItemList(re.list, this.root.querySelector('div.item-list'));
	}
}
