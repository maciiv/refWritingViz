import { Reflection } from '.'

const filterPills = function (this: Reflection) {
	this.tags.forEach((tag) => {
		tag.node.addEventListener('click', () => {
			tag.node.classList.toggle('off')
			this.pills
				.filter((pill) => pill.type === tag.type)
				.forEach((pill) => pill.node.classList.toggle('off'))
		})
	})
}

export default filterPills
