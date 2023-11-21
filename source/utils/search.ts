import Document from '../structures/Document'

export const SearchByNumericIdentifier = (list: Document<any>[], target: number) => {
    let left = 0
    let right = list.length - 1

    while (left <= right) {
        const current = Math.floor((left + right) / 2)

        if (target === list[current]._id) return current

        if (target < Number(list[current]._id)) right = current - 1
        else left = current + 1
    }

    return -1
}