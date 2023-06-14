import { Reflection } from '.'
import createPill from './pills'
import Creator from '../utils/creator'
import { IEntity } from '../data/entity'

export interface IPill {
	node: HTMLSpanElement
	type: string
	colour: string
	begin: number
	end: number
}

class Pill implements IPill {
	node: HTMLSpanElement
	type: string
	colour: string
	begin: number
	end: number
	constructor(
		node: HTMLSpanElement,
		type: string,
		colour: string,
		begin: number,
		end: number
	) {
		this.node = node
		this.type = type
		this.colour = colour
		this.begin = begin
		this.end = end
	}
}

const createText = function <T extends IEntity>(
	this: Reflection<T>,
	text: string
) {
	const div = document.createElement('div')
	div.classList.add('text-container')
	const pills = [] as IPill[]

	this.data.forEach((entity, i, entities) => {
		const textSpan = document.createElement('span')
		let pill: HTMLSpanElement

		switch (i) {
			case 0:
				textSpan.innerHTML = text.substring(0, entity.BeginOffset)
				div.appendChild(textSpan)
				pill = div.appendChild(createPill.bind(this)(entity))
				break

			case pills.length - 1:
				textSpan.innerHTML = text.substring(entity.EndOffset)
				pill = div.appendChild(createPill.bind(this)(entity))
				div.appendChild(textSpan)
				break

			default:
				textSpan.innerHTML = text.substring(
					entities[i - 1].EndOffset,
					entity.BeginOffset
				)
				div.appendChild(textSpan)
				pill = div.appendChild(createPill.bind(this)(entity))
				break
		}

		pills.push(
			new Pill(
				pill,
				entity.Type,
				pill.style.borderColor,
				entity.BeginOffset,
				entity.EndOffset
			)
		)
	})

	return new Creator(pills, div)
}

export const removeText = function <T extends IEntity>(this: Reflection<T>) {
	this.pills.parent.remove()
}

export default createText
