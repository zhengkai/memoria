import { pb } from '../../inc';

export const showError = (form: HTMLFormElement, e: pb.Error | null) => {
	const div = form.querySelector<HTMLDivElement>('div.alert');
	if (!div) {
		return;
	}
	if (!e?.code) {
		div.textContent = '';
		div.style.display = 'none';
		return;
	}
	div.innerText = `Error ${e.code}: ${e.message}`;
	div.style.display = 'block';
}
