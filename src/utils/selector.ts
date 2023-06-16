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

const selector: Iselector = function (selector: string) {
	return new Selector(document.querySelector(selector), data)
}

export default selector
