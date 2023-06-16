import { IcreateText, IgetText, createText, getText } from '.'
import { IReflection } from '..'

export type ITextFunctions = {
	createText: IcreateText
	getText: IgetText
}

export type ItextFunctions = {
	<T>(this: IReflection<T>): ITextFunctions
}

const textFunctions: ItextFunctions = function <T>(this: IReflection<T>) {
	return {
		createText: createText.bind(this),
		getText: getText.bind(this),
	} as ITextFunctions
}

export default textFunctions
