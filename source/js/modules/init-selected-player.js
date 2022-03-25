
const initSelectedPlayer = () => {
	const avatars = document.querySelectorAll('.screen04__pic');
	if (avatars.length) {
		avatars.forEach((avatar) => {
			avatar.addEventListener('click', () => {
				document.querySelector('.screen__strips').classList.add('is-scaled3D');
				document.querySelector('.screen04__pic--left').classList.add('is-hidden');
				document.querySelector('.screen04__pic--right').classList.add('is-hidden');
			});
		});
	}
};

export {initSelectedPlayer};
