import { IcreateTags, getTags, createTags, IgetTags } from '.'
import { IReflection } from '..'

export type ITagFunctions = {
	createTags: IcreateTags
	getTags: IgetTags
}

export type ItagFunctions = {
	<T>(this: IReflection<T>): ITagFunctions
}

const tagFunctions: ItagFunctions = function <T>(this: IReflection<T>) {
	return {
		createTags: createTags.bind(this),
		getTags: getTags.bind(this),
	} as ITagFunctions
}

export default tagFunctions
