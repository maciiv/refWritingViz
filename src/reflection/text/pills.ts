import { IEntity } from '../../data/entity'
import { IReflection } from '..'

export type IcreatePill = {
	(entity: IEntity): HTMLSpanElement
}

const createPill: IcreatePill = function <T>(
	this: IReflection<T>,
	entity: IEntity
) {
	const pill = document.createElement('span')
	pill.classList.add('pill')
	pill.style.borderColor = this.colourScale(entity.Type)
	pill.innerHTML = entity.Text
	return pill
}

export default createPill
