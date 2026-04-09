import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.scss'
import { Edit } from './edit'
import { List } from './list'
import { Search } from './component/search/search'

import protobuf from "protobufjs";
import Long from "long";

protobuf.util.Long = Long;
protobuf.configure();

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
		default:
			new Edit(url, el);
			break;
	}
})()
