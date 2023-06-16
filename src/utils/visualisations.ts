import { reflection, Ireflection } from '../reflection'
import { IDatum } from './datum'

export interface IVisualisations<T> extends IDatum<T> {
	reflection: Ireflection
}

class Visualisations<T> implements IVisualisations<T> {
	node: Element | null
	data: T[]
	reflection: Ireflection
	constructor(datum: IDatum<T>, reflection: Ireflection) {
		this.node = datum.node
		this.data = datum.data
		this.reflection = reflection
	}
}

export type Iviz = {
	<T>(this: IDatum<T>): IVisualisations<T>
}

const viz: Iviz = function <T>(this: IDatum<T>): IVisualisations<T> {
	return new Visualisations(this, reflection)
}

export default viz
