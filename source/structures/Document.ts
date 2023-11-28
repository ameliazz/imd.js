class Document<T> {
    _id: number | string
    content?: T | unknown
    timestamp: string

    constructor(id: number | string, data: T, timestamp?: string) {
        this._id = id
        this.content = data
        this.timestamp = timestamp || new Date().toISOString()
    }
}

export default Document
