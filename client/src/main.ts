import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.scss'
import { Edit } from './component/edit/edit'
import { List } from './component/list/list'
import { Search } from './component/search/search'
import { FileList } from './component/file/list'

(() => {

	const el = document.querySelector('body > main > section') as HTMLElement;

	const url = new URL(window.location.href)
	switch (url.searchParams.get('action')) {
		case 'edit':
			new Edit(url, el);
			break;
		case 'list':
			new List(url, el);
			break;
		case 'search':
			new Search(url, el);
			break;
		case 'file':
			new FileList(url, el);
			break;
		default:
			new Search(url, el);
			break;
	}

	if (window.location.host !== 'memoria.anna.9farm.com') {
		const h = document.querySelector('body > main> header') as HTMLElement;
		if (h) {
			h.style.backgroundColor = 'rgba(200, 150, 100, 0.5)';
		}
	}
})()
