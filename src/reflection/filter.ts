import { Reflection } from '.'

const filterPills = function (this: Reflection) {
	this.tags.forEach((tag) => {
		const span = tag.node.querySelector('span')
		const input = tag.node.querySelector('input')
		span?.addEventListener('click', () => {
			span.classList.toggle('off')
			this.pills
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => pill.node.classList.toggle('off'))
		})
		input?.addEventListener('input', (e) => {
			const target = e.target as HTMLInputElement
			tag.node.style.borderColor = target.value
			this.pills
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => (pill.node.style.borderColor = target.value))
		})
	})
}

export default filterPills
