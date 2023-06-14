import { IEntity } from '../data/entity'

export interface IDatum<T extends IEntity> {
	node: Element | null
	data: T[]
}
