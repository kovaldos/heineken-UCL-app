// Дополнительная валидация возраста пользователя на стартовом экране -- Начало --
const iniAdditionalFormValid = () => {
	const ageForm = document.querySelector('.age-control-form');
	function serializeForm(formNode) {
		const data = new FormData(formNode)
		const yearOfBirth = Array.from(data.entries());
		console.log(yearOfBirth);
		return yearOfBirth;
	 }
	 
	 
	 
	 
	 


	ageForm.addEventListener('submit', () => {
		
		serializeForm(ageForm); 
		

	});
};
export { iniAdditionalFormValid };
// Дополнительная валидация возраста пользователя на стартовом экране -- Конец --

