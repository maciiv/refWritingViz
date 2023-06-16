import { ITag } from '.'
import { IReflection } from '..'

export type IgetTags = {
	<T>(this: IReflection<T>): ITag[] | undefined
}

const getTags: IgetTags = function <T>(this: IReflection<T>) {
	return this.tags?.nodes
}

export default getTags
