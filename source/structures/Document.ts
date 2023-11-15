class Document<T> {
    _id: number
    content?: T | unknown

    constructor(id: number, data: T | unknown) {
        this._id = id
        this.content = data
    }
}

export default Document