export interface IComprehend {
	Entities: IComprehendEntity[]
	File: string
	Reflection: string
}

export interface IComprehendEntity {
	BeginOffset: number
	EndOffset: number
	Score: number
	Text: string
	Type: string
}
