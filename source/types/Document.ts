export interface Data<T> {
    _id: number | string
    content: T | unknown
    timestamp: string
}

const Schema = {
    _id: 'string,number',
    content: 'unknown',
    timestamp: 'string?',
}

export { Schema }
