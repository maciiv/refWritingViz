import { Reflection } from '..'
import { IEntity } from '../../data/entity'
import createTags from './creator'
import getTags from './getter'

export interface ITagFunctions {
	createTags: typeof createTags
	getTags: typeof getTags
}

const tagFunctions = function <T extends IEntity>(this: Reflection<T>) {
	return {
		createTags: createTags,
		getTags: getTags,
	} as ITagFunctions
}

export default tagFunctions
