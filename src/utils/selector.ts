import data, { Idata } from './data'

export interface ISelector {
	node: Element | null
	data: Idata
}

export class Selector implements ISelector {
	node: Element | null
	data: Idata
	constructor(node: Element | null, data: Idata) {
		this.node = node
		this.data = data
	}
}

export type Iselector = {
	(selector: string): Selector
}

const selector: Iselector = function (selector: string | Element) {
	return new Selector(
		typeof selector === 'string' ? document.querySelector(selector) : selector,
		data
	)
}

export default selector
