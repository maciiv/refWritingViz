import { IEntity } from '../data/entity'
import reflection, { Reflection } from '../reflection'
import { IDatum } from './datum'

export interface IVisualisations<T extends IEntity> extends IDatum<T> {
	reflection: typeof reflection
}

class Visualisations<T extends IEntity> implements IVisualisations<T> {
	node: Element | null
	data: T[]
	reflection: <T extends IEntity>(
		this: IDatum<T>,
		text: string
	) => Reflection<T>
	constructor(
		datum: IDatum<T>,
		reflection: <T extends IEntity>(
			this: IDatum<T>,
			text: string
		) => Reflection<T>
	) {
		this.node = datum.node
		this.data = datum.data
		this.reflection = reflection
	}
}

const viz = function <T extends IEntity>(this: IDatum<T>): IVisualisations<T> {
	return new Visualisations(this, reflection)
}

export default viz
