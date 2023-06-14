export default interface ICreator<T> {
	nodes: T[]
	parent: HTMLElement
	remove: typeof remove
}

export default class Creator<T> implements ICreator<T> {
	nodes: T[]
	parent: HTMLElement
	remove: <T>(this: ICreator<T>) => void
	constructor(nodes: T[], parent: HTMLElement) {
		this.nodes = nodes
		this.parent = parent
		this.remove = remove
	}
}

const remove = function <T>(this: ICreator<T>) {
	this.parent.remove()
}
