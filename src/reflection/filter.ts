import { Reflection } from '.'
import { IEntity } from '../data/entity'

const filterPills = function <T extends IEntity>(this: Reflection<T>) {
	this.tags?.nodes.forEach((tag) => {
		const span = tag.node.querySelector('span')
		const input = tag.node.querySelector('input')
		span?.addEventListener('click', () => {
			span.classList.toggle('off')
			this.text?.nodes
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => pill.node.classList.toggle('off'))
		})
		input?.addEventListener('input', (e) => {
			const target = e.target as HTMLInputElement
			tag.node.style.borderColor = target.value
			this.text?.nodes
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => (pill.node.style.borderColor = target.value))
		})
	})
}

export default filterPills
