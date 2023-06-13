export interface IGroupBy<T> {
	key: string
	value: Array<T>
}

export function groupBy<T>(arr: Array<T>, criteria: string): IGroupBy<T>[] {
	const newObj = arr.reduce(function (acc: IGroupBy<T>[], currentValue: any) {
		if (!acc.map((d) => d.key).includes(currentValue[criteria])) {
			acc.push({ key: currentValue[criteria], value: [] })
		}
		acc.find((d) => d.key == currentValue[criteria])?.value.push(currentValue)
		return acc
	}, [])
	return newObj
}
