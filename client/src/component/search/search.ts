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
		console.log('query', fd, d, fd.get('keyword'));
		return pb.ItemSearch.fromObject(d);
	}

	async submit(form: HTMLFormElement) {

		const fd = this.buildData(new FormData(form));
		form.querySelector('fieldset')!.disabled = true;
		const re = await api.itemSearch(fd);
		form.querySelector('fieldset')!.disabled = false;

		this.resultDetail(re?.list?.length || 0, re?.effected || 0);

		console.log('re', re);

		const div = this.root.querySelector<HTMLDivElement>('div.item-list');
		if (!re?.list?.length) {
			tplItemList([], div);
			return;
		}
		tplItemList(re.list, div);
	}

	resultDetail(cnt: number, effected: number) {
		let text = `查询完成：处理 ${effected} 条，返回 ${cnt} 条`;
		if (!effected) {
			text = `异常：未能检索数据`;

		}
		document.querySelector('.result-detail')!.textContent = text;
	}
}
