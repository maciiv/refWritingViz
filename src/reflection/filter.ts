import { IReflection } from './creator'
import { getText } from './text'

export type IfilterText = {
	<T>(this: IReflection<T>): void
}

const filterText: IfilterText = function <T>(this: IReflection<T>) {
	this.tags?.nodes.forEach((tag) => {
		const span = tag.node.querySelector('span')
		const input = tag.node.querySelector('input')
		span?.addEventListener('click', () => {
			span.classList.toggle('off')
			getText
				.bind(this)()
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => pill.node.classList.toggle('off'))
		})
		input?.addEventListener('input', (e) => {
			const target = e.target as HTMLInputElement
			tag.node.style.borderColor = target.value
			getText
				.bind(this)()
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => (pill.node.style.borderColor = target.value))
		})
	})
}

export default filterText
