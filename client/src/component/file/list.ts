import tpl from './list.html?raw'
import { api, pb, util } from '../../inc';
// import { tplItemList } from '../common/item-row';
import { nav } from '../common/nav';

export class FileList {

	data: pb.File[] = [];
	cursor = 0;

	root: HTMLElement;

	constructor(_: URL, root: HTMLElement) {

		nav('file');

		this.root = root;

		this.initHTML();
		this.getData();
	}

	async getData() {
		const re = await api.fileList(0);
		if (re?.list?.length) {
			this.data = re.list.map(o => pb.File.create(o));
			this.cursor = re.cursor;
		}
		// console.log('getData()', this.data, this.cursor);
		this.genHTML();
	}

	initHTML() {
		this.root.innerHTML = tpl;

		const f = this.root.querySelector('input[type=file]')! as HTMLInputElement;
		f.onchange = (e) => {
			e.preventDefault();
			this.upload(f);

			// const input = f.querySelector('input')!;
			// const name = input.value.trim();
		};
	}

	async upload(input: HTMLInputElement) {

		this.root.classList.add('uploading');
		this.msg('uploading', '正在上传…');

		const file = input.files![0];

		const formData = new FormData();
		formData.append('file', file);

		const res = await fetch('/api/upload', {
			method: "POST",
			body: formData,
		});
		input.value = '';
		const re = pb.UploadRsp.fromObject(await res.json());
		this.afterUpload(re);
	}

	afterUpload(re: pb.UploadRsp) {
		this.root.classList.remove('uploading');
		if (re.id) {
			this.msg('success', `上传成功，文件ID：${re.id}`);
			this.getData();
			return
		}
		let msg = `上传失败，未知错误`;
		if (re.msg?.length) {
			msg = `上传失败：${re.msg}`;
		}
		this.msg('alert', msg);
	}

	msg(state: string, msg: string) {
		const box = this.root.querySelector('.upload-box > .msg') as HTMLDivElement;
		if (!box) {
			return;
		}
		box.dataset.state = state;
		box.textContent = msg;
	}

	genHTML() {

		const box = this.root.querySelector('.file-list')!;
		box.innerHTML = '';

		for (const o of this.data) {
			const item = document.createElement('div');

			let link = '';
			if (o.mime.startsWith('image/')) {
				link = `<a href="/file/${o.id}" target="_blank">link</a>`;
			}

			item.innerHTML = `<div>
			<div class="name">#${o.id} ${o.name}</div>
			<div class="size">${util.formatBytes(o.size)}</div>
			<div class="time">${util.formatDateTime(o.tsCreate)}</div>
			<div class="link">${link}</div>
			</div>`;
			box.appendChild(item);
		}

		// tplItemList(this.data, r.querySelector('div.file-list'));
	}
}
