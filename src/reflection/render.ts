import { IReflection } from '.'

const render = function <T>(this: IReflection<T>) {
	const reflection = document.createElement('div')
	reflection.classList.add('reflection-container')
	if (this.tags !== undefined) reflection.appendChild(this.tags.parent)
	if (this.text !== undefined) reflection.appendChild(this.text.parent)
	this.node?.appendChild(reflection)
}

export default render
