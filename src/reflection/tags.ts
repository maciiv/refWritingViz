import * as d3 from 'd3'
import { Reflection } from '.'
import inputColour from '../components/inputColour'
import inputGroup from '../components/inputGroup'
import Creator from '../utils/creator'
import { IEntity } from '../data/entity'

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

const createTags = function <T extends IEntity>(this: Reflection<T>) {
	const types = Array.from(new Set(this.data.map((c) => c.Type)))
	const colourScale = d3.scaleOrdinal(d3.schemeCategory10)

	const div = document.createElement('div')
	div.classList.add('tags-container')

	const tags = [] as Tag[]
	types.forEach((type) => {
		const container = inputGroup()
		const inputColor = inputColour()
		const tagHtml = document.createElement('span')
		const colour = colourScale(type)
		tagHtml.classList.add('tag')
		inputColor.value = colour
		container.style.borderColor = colour
		tagHtml.innerHTML = type
		container.appendChild(inputColor)
		container.appendChild(tagHtml)
		const tag = div.appendChild(container)
		tags.push(new Tag(tag, type, colour))
	})

	return new Creator(tags, div)
}

export const removeTags = function <T extends IEntity>(this: Reflection<T>) {
	this.tags.parent.remove()
}

export default createTags
