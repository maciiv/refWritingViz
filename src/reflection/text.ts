import { Reflection } from '.'
import createPill from './pills'

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

const createText = function (this: Reflection) {
	const div = document.createElement('div')
	div.classList.add('text-container')
	const pills = [] as IPill[]

	this.analysis.Entities.forEach((entity, i, entities) => {
		const textSpan = document.createElement('span')
		let pill: HTMLSpanElement

		switch (i) {
			case 0:
				textSpan.innerHTML = this.analysis.Reflection.substring(
					0,
					entity.BeginOffset
				)
				div.appendChild(textSpan)
				pill = div.appendChild(createPill.bind(this)(entity))
				break

			case pills.length - 1:
				textSpan.innerHTML = this.analysis.Reflection.substring(
					entity.EndOffset
				)
				pill = div.appendChild(createPill.bind(this)(entity))
				div.appendChild(textSpan)
				break

			default:
				textSpan.innerHTML = this.analysis.Reflection.substring(
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
				this.colourScale(entity.Type),
				entity.BeginOffset,
				entity.EndOffset
			)
		)
	})

	this.reflection.appendChild(div)
	return pills
}

export default createText
