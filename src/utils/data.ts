import { IDatum } from './datum'
import { ISelector } from './selector'
import viz, { Iviz } from './visualisations'

export interface IData<T> extends IDatum<T> {
	viz: Iviz
}

export class Data<T> implements IData<T> {
	node: Element | null
	data: T[]
	viz: Iviz
	constructor(selector: ISelector, data: T[], viz: Iviz) {
		this.node = selector.node
		this.data = data
		this.viz = viz
	}
}

export type Idata = {
	<T>(this: ISelector, data: T[]): Data<T>
}

const data: Idata = function <T>(this: ISelector, data: T[]) {
	return new Data(this, data, viz)
}

export default data
