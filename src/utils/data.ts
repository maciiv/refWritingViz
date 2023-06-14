import { IEntity } from '../data/entity'
import { IDatum } from './datum'
import { ISelector } from './selector'
import viz, { IVisualisations } from './visualisations'

export interface IData<T extends IEntity> extends IDatum<T> {
	viz: typeof viz
}

export class Data<T extends IEntity> implements IData<T> {
	node: Element | null
	data: T[]
	viz: <T extends IEntity>(this: IDatum<T>) => IVisualisations<T>
	constructor(
		selector: ISelector,
		data: T[],
		viz: <T extends IEntity>(this: IDatum<T>) => IVisualisations<T>
	) {
		this.node = selector.node
		this.data = data
		this.viz = viz
	}
}

const data = function <T extends IEntity>(this: ISelector, data: T[]) {
	return new Data(this, data, viz)
}

export default data
