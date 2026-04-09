import tpl from './search.html?raw'
import { pb } from '../../pb';
import { api } from '../../api';

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

	async submit(form: HTMLFormElement) {

		const fd = new FormData(form);

		const o = pb.ItemSearch.fromObject({
			og: pb.ItemSearch.Cmd.HAVE,
			title: pb.ItemSearch.Cmd.HAVE,
		});
		console.log('debug', o, fd.get('og'));

		for (const [key, value] of new FormData(form)) {
			console.log('debug form', key, value);
		}

		const re = await api.itemSearch(o);
		console.log('debug re', re);
	}
}
