import { IComprehend } from '../data/comprehend'
import * as d3 from 'd3'
import createTags, { ITag } from './tags'
import createText, { IPill } from './text'
import filterPills from './filter'

export interface IReflection {
	analysis: IComprehend
	tags: ITag[]
	pills: IPill[]
	render(): HTMLDivElement
}

export class Reflection implements IReflection {
	protected reflection: HTMLDivElement
	protected colourScale: d3.ScaleOrdinal<string, string, never>
	analysis: IComprehend
	tags: ITag[]
	pills: IPill[]
	constructor(analysis: IComprehend) {
		this.analysis = analysis
		this.reflection = document.createElement('div')
		this.reflection.classList.add('reflection-container')
		this.colourScale = d3.scaleOrdinal(d3.schemeCategory10)
		this.tags = createTags.bind(this)()
		this.pills = createText.bind(this)()
		filterPills.bind(this)()
	}

	render() {
		return this.reflection
	}
}

const reflection = function (analysis: IComprehend) {
	return new Reflection(analysis)
}

export default reflection
