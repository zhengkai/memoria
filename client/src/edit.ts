import tpl from './tpl/edit.html?raw'
import { pb } from './pb';
import { api } from './api';

export class Edit {

	id: number;
	root: HTMLElement;

	constructor(url: URL, root: HTMLElement) {

		this.root = root;

		this.id = Number(url.searchParams.get('id')) | 0;

		if (this.id) {
			this.getData();
		} else {
			this.genHTML();
		}
	}

	async getData() {
		this.genHTML();
	}

	genHTML(data = '') {
		const r = this.root;

		r.innerHTML = tpl;

		const form = r.querySelector<HTMLFormElement>('form')!;

		form.addEventListener("submit", (event: SubmitEvent) => {
			event.preventDefault();
			this.submit(form);
		});

		form.querySelector<HTMLTextAreaElement>('textarea[name=content]')!.value = data;

		form.querySelector<HTMLTextAreaElement>('textarea[name=content]')!.value = '' + (new Date());

		form.querySelector<HTMLInputElement>('input[value="asciidoc"]')!.checked = true;
	}

	async submit(form: HTMLFormElement) {

		const fd = new FormData(form);

		const o = pb.ItemEdit.fromObject({
			title: fd.get('content'),
		});
		console.log('debug', o);

		for (const [key, value] of new FormData(form)) {
			console.log('debug form', key, value);
		}

		const re = await api.itemEdit(o);
		console.log('debug re', re);
	}
}
