import { IEntity } from '../data/entity'
import reflection, { Reflection } from '../reflection'
import { ITagFunctions } from '../reflection/tags'
import { IDatum } from './datum'

export interface IVisualisations<T> extends IDatum<T> {
	reflection: typeof reflection
}

class Visualisations<T> implements IVisualisations<T> {
	node: Element | null
	data: T[]
	reflection: <T>(
		this: IDatum<T>,
		fn: (
			data: T[],
			tags: <T extends IEntity>(this: Reflection<T>) => ITagFunctions
		) => void
	) => Reflection<T>
	constructor(
		datum: IDatum<T>,
		reflection: <T>(
			this: IDatum<T>,
			fn: (
				data: T[],
				tags: <T extends IEntity>(this: Reflection<T>) => ITagFunctions
			) => void
		) => Reflection<T>
	) {
		this.node = datum.node
		this.data = datum.data
		this.reflection = reflection
	}
}

const viz = function <T>(this: IDatum<T>): IVisualisations<T> {
	return new Visualisations(this, reflection)
}

export default viz
