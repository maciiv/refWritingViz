import { Reflection } from '.'
import { IComprehendEntity } from '../data/comprehend'

const createPill = function (this: Reflection, entity: IComprehendEntity) {
	const pill = document.createElement('span')
	const colour = this.colourScale(entity.Type)
	pill.classList.add('pill')
	pill.style.borderColor = colour
	pill.innerHTML = entity.Text
	return pill
}

export default createPill
