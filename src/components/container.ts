const container = function (cl?: string) {
	const div = document.createElement('div')
	if (cl !== undefined) div.classList.add('tags-container')
	return div
}

export default container
