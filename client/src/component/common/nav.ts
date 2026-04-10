// 左侧导航条

export const nav = (key: string) => {
	const nav = document.querySelector('body > aside > nav')!;
	nav.querySelectorAll('a').forEach((a) => {
		const id = a.dataset.id;
		if (id === key) {
			a.classList.add('active');
		} else {
			a.classList.remove('active');
		}
	});
}
