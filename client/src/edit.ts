import tpl from './tpl/edit.html?raw'

import { pb } from './pb';

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

		const o = pb.Demo.fromObject({});
		console.log('debug', o.name, o.name.length);
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

		form.querySelector('textarea')!.value = data;
		form.querySelector<HTMLInputElement>('input[value="asciidoc"]')!.checked = true;
	}

	submit(form: HTMLFormElement) {
		console.log('debug', form);
	}
}
