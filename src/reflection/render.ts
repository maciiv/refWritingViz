import { IReflection, filterText } from '.'

export type Irender = {
	<T>(this: IReflection<T>): void
}

const render: Irender = function <T>(this: IReflection<T>) {
	const reflection = document.createElement('div')
	reflection.classList.add('reflection-container')
	reflection.appendChild(this.tagsContainer)
	reflection.appendChild(this.textContainer)
	filterText.bind(this)()
	this.node?.appendChild(reflection)
}

export default render
