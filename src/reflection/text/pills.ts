import * as d3 from 'd3'
import { IEntity } from '../../data/entity'

const createPill = function (entity: IEntity) {
	const pill = document.createElement('span')
	const colourScale = d3.scaleOrdinal(d3.schemeCategory10)
	const colour = colourScale(entity.Type)
	pill.classList.add('pill')
	pill.style.borderColor = colour
	pill.innerHTML = entity.Text
	return pill
}

export default createPill
