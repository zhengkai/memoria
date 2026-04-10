import tpl from './edit.html?raw'
import { api, pb } from '../../inc';

export class Edit {

	id: number;
	root: HTMLElement;
	item = pb.Item.create();

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

		const it = await api.itemGet(this.id);
		if (!it) {
			return;
		}
		this.item = pb.Item.create(it);

		this.genHTML();
	}

	genHTML() {
		const r = this.root;

		r.innerHTML = tpl;

		const form = r.querySelector<HTMLFormElement>('form')!;

		form.addEventListener("submit", (event: SubmitEvent) => {
			event.preventDefault();
			this.submit(form);
		});

		const it = this.item;
		var sid = 'New'
		if (it.ID > 0) {
			sid = '' + it.ID;
		}
		form.querySelector<HTMLSpanElement>(
			'span.id'
		)!.innerText = sid;

		const meta = pb.ItemMeta.create(it.meta ?? undefined);

		form.querySelector<HTMLTextAreaElement>(
			'input[name=title]'
		)!.value = meta.title;

		const content = pb.Revision.create(it.content ?? undefined);

		form.querySelector<HTMLInputElement>(
			`input[name="format"][value="${content.format}"]`
		)!.checked = true;

		form.querySelector<HTMLTextAreaElement>(
			'textarea[name=content]'
		)!.value = content.raw;
	}

	async submit(form: HTMLFormElement) {

		const fd = new FormData(form);

		const o = pb.ItemEdit.fromObject({
			title: fd.get('title'),
			content: pb.Revision.fromObject({
				format: Number(fd.get('format')),
				raw: fd.get('content'),
			}),
		});
		console.log('debug', o, fd.get('format'));

		for (const [key, value] of new FormData(form)) {
			console.log('debug form', key, value);
		}

		const re = await api.itemSet(o);
		console.log('debug re', re);
	}
}
