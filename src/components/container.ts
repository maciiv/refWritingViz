const container = function (cl?: string) {
	const div = document.createElement('div')
	if (cl !== undefined) div.classList.add(cl)
	return div
}

export default container
