import { Reflection } from '.'

export interface ITag {
	node: HTMLSpanElement
	type: string
	colour: string
}

class Tag implements ITag {
	node: HTMLSpanElement
	type: string
	colour: string
	constructor(node: HTMLSpanElement, type: string, colour: string) {
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
		const tagHtml = document.createElement('span')
		const colour = this.colourScale(type)
		tagHtml.classList.add('tag')
		tagHtml.style.backgroundColor = colour
		tagHtml.style.borderColor = colour
		tagHtml.innerHTML = type
		const tag = div.appendChild(tagHtml)
		tags.push(new Tag(tag, type, colour))
	})
	this.reflection.appendChild(div)

	return tags
}

export default createTags
