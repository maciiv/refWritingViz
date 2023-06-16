export default interface ICreator<T> {
	nodes: T[]
	parent: HTMLElement
}

export default class Creator<T> implements ICreator<T> {
	nodes: T[]
	parent: HTMLElement
	constructor(nodes: T[], parent: HTMLElement) {
		this.nodes = nodes
		this.parent = parent
	}
}
