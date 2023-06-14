import createTags, { ITag } from './tags'
import createText, { IPill } from './text'
import filterPills from './filter'
import ICreator from '../utils/creator'
import { IDatum } from '../utils/datum'
import { IEntity } from '../data/entity'
import render from './render'

export interface IReflection<T extends IEntity> extends IDatum<T> {
	tags: ICreator<ITag>
	pills: ICreator<IPill>
	render: typeof render
}

export class Reflection<T extends IEntity> implements IReflection<T> {
	node: Element | null
	data: T[]
	readonly tags: ICreator<ITag>
	readonly pills: ICreator<IPill>
	render: <T extends IEntity>(
		this: IReflection<T>,
		fn?: ((tags: ICreator<ITag>, text: ICreator<IPill>) => void) | undefined
	) => void
	constructor(
		datum: IDatum<T>,
		text: string,
		render: <T extends IEntity>(
			this: IReflection<T>,
			fn?: ((tags: ICreator<ITag>, text: ICreator<IPill>) => void) | undefined
		) => void
	) {
		this.node = datum.node
		this.data = datum.data
		this.tags = createTags.bind(this)()
		this.pills = createText.bind(this)(text)
		filterPills.bind(this)()
		this.render = render
	}
}

const reflection = function <T extends IEntity>(this: IDatum<T>, text: string) {
	return new Reflection(this, text, render)
}

export default reflection
