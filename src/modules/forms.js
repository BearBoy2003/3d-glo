const forms = () => {
	const normalizeValue = value => value
		.replace(/ +/g, ' ')
		.replace(/-+/g, '-')
		.replace(/^[ -]+|[ -]+$/g, '')

	const formatName = value => normalizeValue(value)
		.toLowerCase()
		.replace(/(^|[ -])[a-zа-яё]/gi, letter => letter.toUpperCase())

	const applyValidation = (selector, pattern, transform = value => value) => {
		document.querySelectorAll(selector).forEach(input => {
			input.addEventListener('input', () => {
				input.value = input.value.replace(pattern, '')
			})

			input.addEventListener('blur', () => {
				input.value = transform(input.value.replace(pattern, ''))
			})
		})
	}

	applyValidation('input[name="user_name"]', /[^a-zа-яё -]/gi, formatName)
	applyValidation('[name="user_message"]', /[^а-яё -]/gi, normalizeValue)
	applyValidation('.form-email', /[^a-z0-9@\-_.!~*']/gi, normalizeValue)
	applyValidation('.form-phone', /[^\d()-]/g, normalizeValue)
}

export default forms
