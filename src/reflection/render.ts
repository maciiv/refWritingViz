import { IReflection } from '.'
import { IEntity } from '../data/entity'
import ICreator from '../utils/creator'
import { ITag } from './tags'
import { IPill } from './text'

const render = function <T extends IEntity>(
	this: IReflection<T>,
	fn?: (tags: ICreator<ITag>, text: ICreator<IPill>) => void
) {
	const reflection = document.createElement('div')
	reflection.classList.add('reflection-container')
	reflection.appendChild(this.tags.parent)
	reflection.appendChild(this.pills.parent)
	this.node?.appendChild(reflection)
	if (fn !== undefined) fn(this.tags, this.pills)
}

export default render
