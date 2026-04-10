import tpl from './edit.html?raw'
import { api, pb } from '../../inc';
import { nav } from '../common/nav';

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
			nav('new');
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

		this.formMeta(pb.ItemMeta.create(it.meta!), form);

		this.formContent(pb.Revision.create(it.content!), form);

		if (it.og) {
			this.formOg(pb.OpenGraph.create(it.og), form);
		}
	}

	formMeta(meta: pb.ItemMeta, form: HTMLFormElement) {

		form.querySelector<HTMLInputElement>(
			'input[name=title]'
		)!.value = meta.title;

		form.querySelector<HTMLInputElement>(
			'input[name=original]'
		)!.checked = meta.original;

		form.querySelector<HTMLInputElement>(
			'input[name=trivial]'
		)!.checked = meta.trivial;

		form.querySelector<HTMLInputElement>(
			'input[name=hide]'
		)!.checked = meta.tsHide > 0;
	}

	formContent(content: pb.Revision, form: HTMLFormElement) {
		form.querySelector<HTMLInputElement>(
			`input[name="format"][value="${content.format}"]`
		)!.checked = true;

		form.querySelector<HTMLTextAreaElement>(
			'textarea[name=content]'
		)!.value = content.raw;
	}

	formOg(og: pb.OpenGraph, form: HTMLFormElement) {
		form.querySelector<HTMLInputElement>(
			`input[name="og-image"]`
		)!.value = '' + og.image;

		form.querySelector<HTMLInputElement>(
			`input[name="og-description"]`
		)!.value = og.description;

		form.querySelector<HTMLInputElement>(
			`input[name="og-tag"]`
		)!.value = og.tag.join(',');
	}

	valTsCreate(fd: FormData) {
		const dt = '' + fd.get('time-create');
		if (!(dt?.length > 18)) {
			return 0;
		}

		let ts = new Date(dt).getTime() || 0;
		if (ts < 946656000000 || ts > (Date.now() + 10 * 86400 * 1000)) {
			ts = 0;
		}
		return ts;
	}

	valOpenGraph(fd: FormData) {
		let tag = ('' + fd.get('og-tag')).split(',').map(s => Number(s.trim())).filter(n => n > 0);
		const og = pb.OpenGraph.fromObject({
			image: fd.get('og-image') || 0,
			description: '' + fd.get('og-description'),
			tag,
		});
		return og;
	}

	async submit(form: HTMLFormElement) {

		const fd = new FormData(form);

		const o = pb.ItemEdit.fromObject({
			ID: this.item.ID,
			title: fd.get('title'),
			content: pb.Revision.fromObject({
				format: Number(fd.get('format')),
				raw: fd.get('content'),
			}),
			root: fd.get('root') || 0,
			tsCreate: this.valTsCreate(fd),
			original: !!fd.get('original'),
			trivial: !!fd.get('trivial'),
			og: this.valOpenGraph(fd),
			hide: !!fd.get('hide'),
		});

		const re = await api.itemSet(o);
		console.log('debug re', re);
	}
}
