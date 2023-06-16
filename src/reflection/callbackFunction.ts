import { ItagFunctions } from './tags'
import { ItextFunctions } from './text/functions'

export type IreflectionCbFn = {
	<T>(data: T[], tags: ItagFunctions, text: ItextFunctions): void
}
