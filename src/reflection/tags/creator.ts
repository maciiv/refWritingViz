import inputColour from '../../components/inputColour'
import inputGroup from '../../components/inputGroup'
import { IEntity } from '../../data/entity'
import Creator from '../../utils/creator'
import { IReflection } from '..'

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

export type IcreateTags = {
	<T, E extends IEntity>(this: IReflection<T>, data: E[]): void
}

const createTags: IcreateTags = function <T, E extends IEntity>(
	this: IReflection<T>,
	data: E[]
) {
	const types = Array.from(new Set(data.map((c) => c.Type)))

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
		const tag = this.tagsContainer.appendChild(container)
		tags.push(new Tag(tag, type, colour))
	})

	if (this.tags === undefined) {
		this.tags = new Creator(tags, this.tagsContainer)
	} else {
		this.tags.nodes.concat(tags)
	}
}

export default createTags
