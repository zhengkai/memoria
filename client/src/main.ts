import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.scss'
import { Edit } from './edit'

(() => {

	const el = document.querySelector('body > main > section') as HTMLElement;

	const url = new URL(window.location.href)
	switch (url.searchParams.get('action')) {
		case 'edit':
			new Edit(url, el);
			break;
		default:
			new Edit(url, el);
			break;
	}
})()
