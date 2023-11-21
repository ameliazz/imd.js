class Document<T> {
    _id: number | string
    content?: T | unknown
    timestamp: string = new Date().toISOString()

    constructor(id: number | string, data: T) {
        this._id = id
        this.content = data
    }
}

export default Document