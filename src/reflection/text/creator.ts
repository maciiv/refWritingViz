import { IReflection } from '..'
import { IEntity } from '../../data/entity'
import createPill from './pills'
import Creator from '../../utils/creator'

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
	this: IReflection<T>,
	data: T[],
	text: string
) {
	const pills = [] as IPill[]

	data.forEach((entity, i, entities) => {
		const textSpan = document.createElement('span')
		let pill: HTMLSpanElement

		switch (i) {
			case 0:
				textSpan.innerHTML = text.substring(0, entity.BeginOffset)
				this.textContainer.appendChild(textSpan)
				pill = this.textContainer.appendChild(createPill.bind(this)(entity))
				break

			case pills.length - 1:
				textSpan.innerHTML = text.substring(entity.EndOffset)
				pill = this.textContainer.appendChild(createPill.bind(this)(entity))
				this.textContainer.appendChild(textSpan)
				break

			default:
				textSpan.innerHTML = text.substring(
					entities[i - 1].EndOffset,
					entity.BeginOffset
				)
				this.textContainer.appendChild(textSpan)
				pill = this.textContainer.appendChild(createPill.bind(this)(entity))
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

	if (this.text === undefined) {
		this.text = new Creator(pills, this.textContainer)
	} else {
		this.text.nodes.concat(pills)
	}
}

export default createText
