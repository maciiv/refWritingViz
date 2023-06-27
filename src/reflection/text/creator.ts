import { IReflection } from '..'
import { IEntity } from '../../data/entity'
import createPill from './pills'
import Creator from '../../utils/creator'
import container from '../../components/container'

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

export type IcreateText = {
	<T, E extends IEntity>(this: IReflection<T>, data: E[], text: string): void
}

const createText: IcreateText = function <T, E extends IEntity>(
	this: IReflection<T>,
	data: E[],
	text: string,
	title?: string | undefined
) {
	const div = container('reflection-container')
	if (title !== undefined) {
		const h3 = document.createElement('h3')
		h3.innerHTML = title
		div.appendChild(h3)
	}
	const pills = [] as IPill[]

	data.forEach((entity, i, entities) => {
		const textSpan = document.createElement('span')
		let pill: HTMLSpanElement

		switch (i) {
			case 0:
				textSpan.innerHTML = text.substring(0, entity.BeginOffset)
				div.appendChild(textSpan)
				pill = div.appendChild(createPill.bind(this)(entity))
				break

			case entities.length - 1:
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

	this.textContainer.appendChild(div)
	this.text.push(new Creator(pills, div))
}

export default createText
