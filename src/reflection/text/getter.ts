import { IPill } from '.'
import { IReflection } from '..'

export type IgetText = {
	<T>(this: IReflection<T>): IPill[]
}

const getText = function <T>(this: IReflection<T>) {
	return this.text.map((d) => d.nodes).flat()
}

export default getText
