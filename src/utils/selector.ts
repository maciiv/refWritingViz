import { IEntity } from '../data/entity'
import data, { Data } from './data'

export interface ISelector {
	node: Element | null
	data: typeof data
}

export class Selector implements ISelector {
	node: Element | null
	data: <T extends IEntity>(this: ISelector, data: T[]) => Data<T>
	constructor(
		node: Element | null,
		data: <T extends IEntity>(this: ISelector, data: T[]) => Data<T>
	) {
		this.node = node
		this.data = data
	}
}

const selector = function (selector: string) {
	return new Selector(document.querySelector(selector), data)
}

export default selector

// selector('test')
// 	.data([
// 		{
// 			BeginOffset: 0,
// 			EndOffset: 9,
// 			Score: 0.9891447286422282,
// 			Text: 'As a data',
// 			Type: 'RR',
// 		},
// 	])
// 	.viz()
// 	.reflection('test')
// 	.render((d) => d)
