import { tagsContainer, tagFunctions, ITag, ITagFunctions } from './tags'
import { IPill } from './text'
import ICreator from '../utils/creator'
import { IDatum } from '../utils/datum'
import render from './render'
import { textContainer } from './text'
import { IEntity } from '../data/entity'

export interface IReflection<T> extends IDatum<T> {
	tagsContainer: HTMLDivElement
	textContainer: HTMLDivElement
	tags: ICreator<ITag> | undefined
	text: ICreator<IPill> | undefined
	render: typeof render
}

export class Reflection<T> implements IReflection<T> {
	node: Element | null
	data: T[]
	readonly tagsContainer: HTMLDivElement
	readonly textContainer: HTMLDivElement
	readonly tags: ICreator<ITag> | undefined
	readonly text: ICreator<IPill> | undefined
	render: <T>(this: IReflection<T>) => void
	constructor(
		datum: IDatum<T>,
		render: <T>(
			this: IReflection<T>,
			fn?: ((tags: ICreator<ITag>, text: ICreator<IPill>) => void) | undefined
		) => void,
		fn: (data: T[], tags: ITagFunctions) => void
	) {
		this.node = datum.node
		this.data = datum.data
		this.tagsContainer = tagsContainer()
		this.textContainer = textContainer()
		this.render = render
		fn(datum.data, tagFunctions.bind(this)())
	}
}

const reflection = function <T>(
	this: IDatum<T>,
	fn: (data: T[], tags: ITagFunctions) => void
) {
	return new Reflection(this, render, fn)
}

export default reflection
