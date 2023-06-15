import { Reflection } from '..'
import { IEntity } from '../../data/entity'

const getTags = function <T extends IEntity>(this: Reflection<T>) {
	return this.tags?.parent.querySelectorAll('.input-group-container')
}

export default getTags
