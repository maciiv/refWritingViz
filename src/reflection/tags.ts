import { Reflection } from '.'
import inputColour from '../utils/inputColour'
import inputGroup from '../utils/inputGroup'

export interface ITag {
	node: HTMLDivElement
	type: string
	colour: string
}

class Tag implements ITag {
	node: HTMLDivElement
	type: string
	colour: string
	constructor(node: HTMLDivElement, type: string, colour: string) {
		this.node = node
		this.type = type
		this.colour = colour
	}
}

const createTags = function (this: Reflection) {
	const types = Array.from(new Set(this.analysis.Entities.map((c) => c.Type)))

	const div = document.createElement('div')
	div.classList.add('tags-container')

	const tags = [] as Tag[]
	types.forEach((type) => {
		const container = inputGroup()
		const inputColor = inputColour()
		const tagHtml = document.createElement('span')
		const colour = this.colourScale(type)
		tagHtml.classList.add('tag')
		inputColor.value = colour
		container.style.borderColor = colour
		tagHtml.innerHTML = type
		container.appendChild(inputColor)
		container.appendChild(tagHtml)
		const tag = div.appendChild(container)
		tags.push(new Tag(tag, type, colour))
	})
	this.reflection.appendChild(div)

	return tags
}

export default createTags
