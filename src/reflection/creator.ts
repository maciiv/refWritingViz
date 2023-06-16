import * as d3 from 'd3'
import { tagsContainer, tagFunctions, ITag } from './tags'
import { textContainer, textFunctions, IPill } from './text'
import ICreator from '../utils/creator'
import { IDatum } from '../utils/datum'
import render, { Irender } from './render'
import { IreflectionCbFn } from '.'

export interface IReflection<T> extends IDatum<T> {
	tagsContainer: HTMLDivElement
	textContainer: HTMLDivElement
	tags: ICreator<ITag> | undefined
	text: ICreator<IPill>[]
	colourScale: d3.ScaleOrdinal<string, string, never>
	render: Irender
}

class Reflection<T> implements IReflection<T> {
	node: Element | null
	data: T[]
	readonly tagsContainer: HTMLDivElement
	readonly textContainer: HTMLDivElement
	readonly tags: ICreator<ITag> | undefined
	readonly text = [] as ICreator<IPill>[]
	readonly colourScale: d3.ScaleOrdinal<string, string, never>
	render: <T>(this: IReflection<T>) => void
	constructor(datum: IDatum<T>, render: Irender, fn: IreflectionCbFn) {
		this.node = datum.node
		this.data = datum.data
		this.tagsContainer = tagsContainer()
		this.textContainer = textContainer()
		this.colourScale = d3.scaleOrdinal(d3.schemeCategory10)
		this.render = render
		fn(datum.data, tagFunctions.bind(this), textFunctions.bind(this))
	}
}

export type Ireflection = {
	<T>(this: IDatum<T>, fn: IreflectionCbFn): Reflection<T>
}

const reflection: Ireflection = function <T>(
	this: IDatum<T>,
	fn: IreflectionCbFn
) {
	return new Reflection(this, render, fn)
}

export default reflection
